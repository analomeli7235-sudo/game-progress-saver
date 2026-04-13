import { Star, Trophy, Clock, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameDatabase } from "@/data/gameDatabase";
import { Progress } from "@/components/ui/progress";

const LevelProgressPanel = () => {
  const players = GameDatabase.getAllPlayers();
  const allProgress = GameDatabase.getAllLevelProgress();

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Progreso por Nivel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {players.map((player) => {
          const progress = allProgress.filter((lp) => lp.playerId === player.id);
          if (progress.length === 0) return null;

          return (
            <div key={player.id} className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold"
                  style={{ backgroundColor: player.avatarColor, color: "hsl(230,25%,9%)" }}
                >
                  {player.username.charAt(0)}
                </div>
                {player.username}
              </h4>

              <div className="grid gap-2 pl-7">
                {progress.map((lp) => {
                  const pct = Math.round((lp.coinsCollected / lp.totalCoinsInLevel) * 100);
                  return (
                    <div
                      key={lp.id}
                      className="bg-secondary/60 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium">Nivel {lp.levelNumber}</span>
                          <span className="text-xs text-muted-foreground">— {lp.levelName}</span>
                          {lp.isCompleted && (
                            <span className="text-[10px] bg-primary/15 text-primary px-1.5 py-0.5 rounded font-medium">
                              ✓ Completo
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className="h-2 flex-1" />
                          <span className="text-xs text-muted-foreground w-16 text-right">
                            {lp.coinsCollected}/{lp.totalCoinsInLevel}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < lp.stars ? "text-accent fill-accent" : "text-border"}`}
                            />
                          ))}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {lp.bestTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <RotateCcw className="w-3 h-3" /> {lp.attempts}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default LevelProgressPanel;
