import { Coins, Users, Trophy, Gamepad2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GameDatabase } from "@/data/gameDatabase";

const StatsCards = () => {
  const stats = GameDatabase.getStats();

  const cards = [
    {
      label: "Jugadores Registrados",
      value: stats.totalPlayers,
      icon: Users,
      className: "glow-blue",
      iconColor: "text-[hsl(var(--info))]",
    },
    {
      label: "En Línea Ahora",
      value: stats.onlinePlayers,
      icon: Gamepad2,
      className: "glow-green",
      iconColor: "text-primary",
    },
    {
      label: "Total de Monedas",
      value: stats.totalCoins.toLocaleString(),
      icon: Coins,
      className: "glow-coin",
      iconColor: "text-accent",
    },
    {
      label: "Niveles Completados",
      value: stats.completedLevels,
      icon: Trophy,
      className: "glow-green",
      iconColor: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label} className={`${card.className} border-border/50`}>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-secondary">
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
