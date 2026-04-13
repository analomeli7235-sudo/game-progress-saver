import { Database, CheckCircle, Server } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameDatabase } from "@/data/gameDatabase";

const ConnectionStatus = () => {
  return (
    <Card className="border-border/50 glow-green">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Estado de Conexión
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-4 h-4 text-primary" />
          <span className="text-primary font-medium">Conectado</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Servidor</span>
            <span className="font-mono">localhost:3306</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Base de datos</span>
            <span className="font-mono">GameDB_2D</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Motor</span>
            <span className="font-mono">MySQL 8.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Latencia</span>
            <span className="font-mono text-primary">12ms</span>
          </div>
        </div>
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Server className="w-3 h-3" />
            <code className="text-[11px] break-all">{GameDatabase.connectionString}</code>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionStatus;
