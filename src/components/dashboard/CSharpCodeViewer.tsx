import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const csharpFiles: { name: string; code: string }[] = [
  {
    name: "PlayerModel.cs",
    code: `using System;

namespace GameDB.Models
{
    /// <summary>
    /// Modelo que representa un jugador en la base de datos.
    /// Mapea directamente a la tabla "Players" en MySQL.
    /// </summary>
    public class Player
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public int TotalCoins { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastLogin { get; set; }
        public bool IsOnline { get; set; }
    }
}`,
  },
  {
    name: "LevelProgressModel.cs",
    code: `namespace GameDB.Models
{
    /// <summary>
    /// Representa el progreso de un jugador en un nivel específico.
    /// </summary>
    public class LevelProgress
    {
        public string Id { get; set; }
        public string PlayerId { get; set; }
        public int LevelNumber { get; set; }
        public string LevelName { get; set; }
        public int CoinsCollected { get; set; }
        public int TotalCoinsInLevel { get; set; }
        public bool IsCompleted { get; set; }
        public string BestTime { get; set; }
        public int Attempts { get; set; }
        public int Stars { get; set; } // 0 a 3
    }
}`,
  },
  {
    name: "DatabaseConnection.cs",
    code: `using MySql.Data.MySqlClient;
using UnityEngine;

namespace GameDB.Data
{
    /// <summary>
    /// Clase encargada de gestionar la conexión a MySQL.
    /// Se utiliza un patrón Singleton para reutilizar la conexión.
    /// </summary>
    public class DatabaseConnection
    {
        private static DatabaseConnection _instance;
        private MySqlConnection _connection;

        private const string ConnectionString =
            "Server=localhost;" +
            "Database=GameDB_2D;" +
            "User=admin;" +
            "Password=SecurePass123;" +
            "SslMode=none;";

        private DatabaseConnection()
        {
            _connection = new MySqlConnection(ConnectionString);
        }

        public static DatabaseConnection Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new DatabaseConnection();
                return _instance;
            }
        }

        public MySqlConnection GetConnection()
        {
            if (_connection.State != System.Data.ConnectionState.Open)
            {
                _connection.Open();
                Debug.Log("[DB] Conexión establecida con GameDB_2D");
            }
            return _connection;
        }

        public void CloseConnection()
        {
            if (_connection.State == System.Data.ConnectionState.Open)
            {
                _connection.Close();
                Debug.Log("[DB] Conexión cerrada");
            }
        }
    }
}`,
  },
  {
    name: "PlayerService.cs",
    code: `using System.Collections.Generic;
using MySql.Data.MySqlClient;
using GameDB.Models;
using GameDB.Data;
using UnityEngine;

namespace GameDB.Services
{
    /// <summary>
    /// Servicio que contiene la lógica de acceso a datos
    /// para la entidad Player. Realiza operaciones CRUD.
    /// </summary>
    public class PlayerService
    {
        /// <summary>
        /// Obtiene el total de monedas de un jugador.
        /// </summary>
        public int GetPlayerCoins(string playerId)
        {
            var conn = DatabaseConnection.Instance.GetConnection();
            string query = "SELECT TotalCoins FROM Players WHERE Id = @id";
            
            using (var cmd = new MySqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@id", playerId);
                var result = cmd.ExecuteScalar();
                return result != null ? (int)result : 0;
            }
        }

        /// <summary>
        /// Actualiza las monedas del jugador (se llama al recolectar).
        /// </summary>
        public void UpdateCoins(string playerId, int newTotal)
        {
            var conn = DatabaseConnection.Instance.GetConnection();
            string query = "UPDATE Players SET TotalCoins = @coins WHERE Id = @id";

            using (var cmd = new MySqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@coins", newTotal);
                cmd.Parameters.AddWithValue("@id", playerId);
                cmd.ExecuteNonQuery();
                Debug.Log($"[DB] Monedas actualizadas: {newTotal}");
            }
        }

        /// <summary>
        /// Guarda el progreso del nivel del jugador.
        /// Se invoca al completar o pausar un nivel.
        /// </summary>
        public void SaveLevelProgress(LevelProgress progress)
        {
            var conn = DatabaseConnection.Instance.GetConnection();
            string query = @"
                INSERT INTO LevelProgress 
                    (Id, PlayerId, LevelNumber, LevelName, 
                     CoinsCollected, TotalCoinsInLevel, 
                     IsCompleted, BestTime, Attempts, Stars)
                VALUES 
                    (@id, @pid, @lvl, @name, 
                     @coins, @total, 
                     @completed, @time, @attempts, @stars)
                ON DUPLICATE KEY UPDATE 
                    CoinsCollected = @coins,
                    IsCompleted = @completed,
                    BestTime = @time,
                    Attempts = @attempts,
                    Stars = @stars";

            using (var cmd = new MySqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@id", progress.Id);
                cmd.Parameters.AddWithValue("@pid", progress.PlayerId);
                cmd.Parameters.AddWithValue("@lvl", progress.LevelNumber);
                cmd.Parameters.AddWithValue("@name", progress.LevelName);
                cmd.Parameters.AddWithValue("@coins", progress.CoinsCollected);
                cmd.Parameters.AddWithValue("@total", progress.TotalCoinsInLevel);
                cmd.Parameters.AddWithValue("@completed", progress.IsCompleted);
                cmd.Parameters.AddWithValue("@time", progress.BestTime);
                cmd.Parameters.AddWithValue("@attempts", progress.Attempts);
                cmd.Parameters.AddWithValue("@stars", progress.Stars);
                cmd.ExecuteNonQuery();
            }
        }
    }
}`,
  },
  {
    name: "GameManager.cs",
    code: `using UnityEngine;
using GameDB.Services;
using GameDB.Data;

namespace GameDB.Controllers
{
    /// <summary>
    /// Controlador principal del juego (MonoBehaviour de Unity).
    /// Gestiona la persistencia del progreso del jugador:
    /// - Carga datos al iniciar el juego
    /// - Guarda monedas al recolectar
    /// - Persiste progreso al cerrar el juego
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        private PlayerService _playerService;
        private string _currentPlayerId = "p001";
        private int _currentCoins = 0;

        void Awake()
        {
            // Singleton para persistir entre escenas
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
                _playerService = new PlayerService();
            }
            else
            {
                Destroy(gameObject);
            }
        }

        void Start()
        {
            // Cargar monedas guardadas al iniciar
            _currentCoins = _playerService.GetPlayerCoins(_currentPlayerId);
            Debug.Log($"[Game] Monedas cargadas: {_currentCoins}");
        }

        /// <summary>
        /// Se llama desde el script de moneda al recolectar.
        /// </summary>
        public void CollectCoin(int value = 1)
        {
            _currentCoins += value;
            _playerService.UpdateCoins(_currentPlayerId, _currentCoins);
            // Actualizar UI...
        }

        void OnApplicationQuit()
        {
            // Guardar progreso final y cerrar conexión
            _playerService.UpdateCoins(_currentPlayerId, _currentCoins);
            DatabaseConnection.Instance.CloseConnection();
            Debug.Log("[Game] Progreso guardado al cerrar");
        }
    }
}`,
  },
];

const CSharpCodeViewer = () => {
  const [activeFile, setActiveFile] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(csharpFiles[activeFile].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Code className="w-5 h-5 text-[hsl(var(--info))]" />
          Código C# — Lógica de Acceso a Datos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* File tabs */}
        <div className="flex flex-wrap gap-1">
          {csharpFiles.map((file, i) => (
            <button
              key={file.name}
              onClick={() => setActiveFile(i)}
              className={`text-xs px-3 py-1.5 rounded-md font-mono transition-colors ${
                i === activeFile
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleCopy}
          >
            {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
          </Button>
          <pre className="bg-secondary/80 rounded-lg p-4 overflow-x-auto text-xs leading-relaxed">
            <code>{csharpFiles[activeFile].code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default CSharpCodeViewer;
