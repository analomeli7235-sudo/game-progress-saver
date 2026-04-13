import { Gamepad2 } from "lucide-react";
import StatsCards from "@/components/dashboard/StatsCards";
import PlayersTable from "@/components/dashboard/PlayersTable";
import LevelProgressPanel from "@/components/dashboard/LevelProgressPanel";
import ConnectionStatus from "@/components/dashboard/ConnectionStatus";
import CSharpCodeViewer from "@/components/dashboard/CSharpCodeViewer";

const Index = () => {
  return (
    <div className="min-h-screen pixel-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <header className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 glow-green">
            <Gamepad2 className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">GameDB Panel</h1>
            <p className="text-sm text-muted-foreground">
              Panel de administración — Videojuego 2D · Conexión a Base de Datos
            </p>
          </div>
        </header>

        {/* Stats */}
        <StatsCards />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PlayersTable />
            <LevelProgressPanel />
          </div>
          <div className="space-y-6">
            <ConnectionStatus />
            <CSharpCodeViewer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
