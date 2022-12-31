-- CreateTable
CREATE TABLE "TeamStats" (
    "StatID" INTEGER NOT NULL,
    "TeamID" INTEGER NOT NULL,
    "Season" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Team" TEXT NOT NULL,
    "Wins" INTEGER NOT NULL,
    "Losses" INTEGER NOT NULL,
    "GameID" INTEGER NOT NULL,
    "OpponentID" INTEGER NOT NULL,
    "Opponent" TEXT NOT NULL,
    "HomeOrAway" TEXT NOT NULL,
    "IsGameOver" BOOLEAN NOT NULL,
    "FieldGoalsMade" INTEGER NOT NULL,
    "FieldGoalsAttempted" INTEGER NOT NULL,
    "FieldGoalsPercentage" DECIMAL(4,1) NOT NULL,
    "EffectiveFieldGoalsPercentage" DECIMAL(4,1) NOT NULL,
    "TwoPointersMade" INTEGER NOT NULL,
    "TwoPointersAttempted" INTEGER NOT NULL,
    "TwoPointersPercentage" DECIMAL(4,1) NOT NULL,
    "ThreePointersMade" INTEGER NOT NULL,
    "ThreePointersAttempted" INTEGER NOT NULL,
    "ThreePointersPercentage" DECIMAL(4,1) NOT NULL,
    "FreeThrowsMade" INTEGER NOT NULL,
    "FreeThrowsAttempted" INTEGER NOT NULL,
    "FreeThrowsPercentage" DECIMAL(4,1) NOT NULL,
    "OffensiveRebounds" INTEGER NOT NULL,
    "DefensiveRebounds" INTEGER NOT NULL,
    "Rebounds" INTEGER NOT NULL,
    "Assists" INTEGER NOT NULL,
    "Steals" INTEGER NOT NULL,
    "BlockedShots" INTEGER NOT NULL,
    "Turnovers" INTEGER NOT NULL,
    "PersonalFouls" INTEGER NOT NULL,
    "Points" INTEGER NOT NULL,
    "TrueShootingPercentage" DECIMAL(4,1) NOT NULL,
    "FantasyPointsFanDuel" DECIMAL(4,1) NOT NULL,
    "FantasyPointsDraftKings" DECIMAL(4,1) NOT NULL,
    "FantasyPointsYahoo" DECIMAL(4,1) NOT NULL,

    CONSTRAINT "TeamStats_pkey" PRIMARY KEY ("StatID")
);

-- AddForeignKey
ALTER TABLE "TeamStats" ADD CONSTRAINT "TeamStats_TeamID_fkey" FOREIGN KEY ("TeamID") REFERENCES "Team"("TeamID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamStats" ADD CONSTRAINT "TeamStats_GameID_fkey" FOREIGN KEY ("GameID") REFERENCES "Game"("GameID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamStats" ADD CONSTRAINT "TeamStats_OpponentID_fkey" FOREIGN KEY ("OpponentID") REFERENCES "Team"("TeamID") ON DELETE RESTRICT ON UPDATE CASCADE;
