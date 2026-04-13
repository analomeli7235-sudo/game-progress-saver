import { Coins, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameDatabase } from "@/data/gameDatabase";

const PlayersTable = () => {
  const players = GameDatabase.getAllPlayers();

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Coins className="w-5 h-5 text-accent" />
          Jugadores y Monedas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Jugador</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Estado</th>
                <th className="text-right py-3 px-2 text-muted-foreground font-medium">Monedas</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Último acceso</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-b border-border/30 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: player.avatarColor, color: "hsl(230, 25%, 9%)" }}
                      >
                        {player.username.charAt(0)}
                      </div>
                      <span className="font-medium">{player.username}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                      player.isOnline
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      <Circle className={`w-2 h-2 fill-current`} />
                      {player.isOnline ? "En línea" : "Desconectado"}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-accent font-semibold">{player.totalCoins.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground text-xs">
                    {new Date(player.lastLogin).toLocaleDateString("es-ES", {
                      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayersTable;
