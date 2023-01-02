-- CreateTable
CREATE TABLE "SeasonAverages" (
    "PlayerID" INTEGER NOT NULL,
    "FantasyPoints" DECIMAL(4,1) NOT NULL,
    "Minutes" INTEGER NOT NULL,
    "FieldGoalsMade" DECIMAL(4,1) NOT NULL,
    "FieldGoalsAttempted" DECIMAL(4,1) NOT NULL,
    "FieldGoalsPercentage" DECIMAL(4,1) NOT NULL,
    "TwoPointersMade" DECIMAL(4,1) NOT NULL,
    "TwoPointersAttempted" DECIMAL(4,1) NOT NULL,
    "TwoPointersPercentage" DECIMAL(4,1) NOT NULL,
    "ThreePointersMade" DECIMAL(4,1) NOT NULL,
    "ThreePointersAttempted" DECIMAL(4,1) NOT NULL,
    "ThreePointersPercentage" DECIMAL(4,1) NOT NULL,
    "FreeThrowsMade" DECIMAL(4,1) NOT NULL,
    "FreeThrowsAttempted" DECIMAL(4,1) NOT NULL,
    "FreeThrowsPercentage" DECIMAL(4,1) NOT NULL,
    "OffensiveRebounds" DECIMAL(4,1) NOT NULL,
    "DefensiveRebounds" DECIMAL(4,1) NOT NULL,
    "Rebounds" DECIMAL(4,1) NOT NULL,
    "Assists" DECIMAL(4,1) NOT NULL,
    "Steals" DECIMAL(4,1) NOT NULL,
    "BlockedShots" DECIMAL(4,1) NOT NULL,
    "Turnovers" DECIMAL(4,1) NOT NULL,
    "PersonalFouls" DECIMAL(4,1) NOT NULL,
    "Points" DECIMAL(4,1) NOT NULL,
    "FantasyPointsFanDuel" DECIMAL(4,1) NOT NULL,
    "FantasyPointsDraftKings" DECIMAL(4,1) NOT NULL,
    "FantasyPointsYahoo" DECIMAL(4,1) NOT NULL,
    "PlusMinus" DECIMAL(4,1) NOT NULL,

    CONSTRAINT "SeasonAverages_pkey" PRIMARY KEY ("PlayerID")
);

-- CreateTable
CREATE TABLE "LastFiveGameAverages" (
    "PlayerID" INTEGER NOT NULL,
    "FantasyPoints" DECIMAL(4,1) NOT NULL,
    "Minutes" INTEGER NOT NULL,
    "FieldGoalsMade" DECIMAL(4,1) NOT NULL,
    "FieldGoalsAttempted" DECIMAL(4,1) NOT NULL,
    "FieldGoalsPercentage" DECIMAL(4,1) NOT NULL,
    "TwoPointersMade" DECIMAL(4,1) NOT NULL,
    "TwoPointersAttempted" DECIMAL(4,1) NOT NULL,
    "TwoPointersPercentage" DECIMAL(4,1) NOT NULL,
    "ThreePointersMade" DECIMAL(4,1) NOT NULL,
    "ThreePointersAttempted" DECIMAL(4,1) NOT NULL,
    "ThreePointersPercentage" DECIMAL(4,1) NOT NULL,
    "FreeThrowsMade" DECIMAL(4,1) NOT NULL,
    "FreeThrowsAttempted" DECIMAL(4,1) NOT NULL,
    "FreeThrowsPercentage" DECIMAL(4,1) NOT NULL,
    "OffensiveRebounds" DECIMAL(4,1) NOT NULL,
    "DefensiveRebounds" DECIMAL(4,1) NOT NULL,
    "Rebounds" DECIMAL(4,1) NOT NULL,
    "Assists" DECIMAL(4,1) NOT NULL,
    "Steals" DECIMAL(4,1) NOT NULL,
    "BlockedShots" DECIMAL(4,1) NOT NULL,
    "Turnovers" DECIMAL(4,1) NOT NULL,
    "PersonalFouls" DECIMAL(4,1) NOT NULL,
    "Points" DECIMAL(4,1) NOT NULL,
    "FantasyPointsFanDuel" DECIMAL(4,1) NOT NULL,
    "FantasyPointsDraftKings" DECIMAL(4,1) NOT NULL,
    "FantasyPointsYahoo" DECIMAL(4,1) NOT NULL,
    "PlusMinus" DECIMAL(4,1) NOT NULL,

    CONSTRAINT "LastFiveGameAverages_pkey" PRIMARY KEY ("PlayerID")
);

-- AddForeignKey
ALTER TABLE "SeasonAverages" ADD CONSTRAINT "SeasonAverages_PlayerID_fkey" FOREIGN KEY ("PlayerID") REFERENCES "Player"("PlayerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LastFiveGameAverages" ADD CONSTRAINT "LastFiveGameAverages_PlayerID_fkey" FOREIGN KEY ("PlayerID") REFERENCES "Player"("PlayerID") ON DELETE RESTRICT ON UPDATE CASCADE;
