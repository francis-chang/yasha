/*
  Warnings:

  - You are about to drop the `TeamStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamStats" DROP CONSTRAINT "TeamStats_GameID_fkey";

-- DropForeignKey
ALTER TABLE "TeamStats" DROP CONSTRAINT "TeamStats_OpponentID_fkey";

-- DropForeignKey
ALTER TABLE "TeamStats" DROP CONSTRAINT "TeamStats_TeamID_fkey";

-- DropTable
DROP TABLE "TeamStats";

-- CreateTable
CREATE TABLE "TeamStatlines" (
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

    CONSTRAINT "TeamStatlines_pkey" PRIMARY KEY ("StatID")
);

-- CreateTable
CREATE TABLE "Player" (
    "PlayerID" INTEGER NOT NULL,
    "TeamID" INTEGER NOT NULL,
    "Jersey" INTEGER NOT NULL,
    "PositionCategory" TEXT NOT NULL,
    "Position" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Height" INTEGER NOT NULL,
    "Weight" INTEGER NOT NULL,
    "BirthDate" TEXT NOT NULL,
    "BirthCity" TEXT NOT NULL,
    "BirthState" TEXT NOT NULL,
    "BirthCountry" TEXT NOT NULL,
    "HighSchool" TEXT NOT NULL,
    "College" TEXT NOT NULL,
    "PhotoUrl" TEXT NOT NULL,
    "SportRadarPlayerID" TEXT NOT NULL,
    "RotoworldPlayerID" INTEGER NOT NULL,
    "RotoWirePlayerID" INTEGER NOT NULL,
    "FantasyAlarmPlayerID" INTEGER NOT NULL,
    "InjuryStatus" TEXT,
    "InjuryBodyPart" TEXT,
    "InjuryStartDate" TEXT,
    "InjuryNotes" TEXT,
    "FanDuelPlayerID" INTEGER NOT NULL,
    "DraftKingsPlayerID" INTEGER NOT NULL,
    "YahooPlayerID" INTEGER NOT NULL,
    "FanDuelName" TEXT NOT NULL,
    "DraftKingsName" TEXT NOT NULL,
    "YahooName" TEXT NOT NULL,
    "DepthChartPosition" TEXT NOT NULL,
    "DepthChartOrder" INTEGER NOT NULL,
    "UsaTodayPlayerID" INTEGER NOT NULL,
    "UsaTodayHeadshotUrl" TEXT NOT NULL,
    "UsaTodayHeadshotNoBackgroundUrl" TEXT NOT NULL,
    "UsaTodayHeadshotUpdated" TEXT NOT NULL,
    "UsaTodayHeadshotNoBackgroundUpdated" TEXT NOT NULL,
    "NbaDotComPlayerID" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("PlayerID")
);

-- CreateTable
CREATE TABLE "Statline" (
    "StatID" INTEGER NOT NULL,
    "TeamID" INTEGER NOT NULL,
    "PlayerID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Position" TEXT NOT NULL,
    "Started" INTEGER NOT NULL,
    "InjuryStatus" TEXT,
    "InjuryBodyPart" TEXT,
    "InjuryStartDate" TEXT,
    "InjuryNotes" TEXT,
    "GameID" INTEGER NOT NULL,
    "OpponentID" INTEGER NOT NULL,
    "HomeOrAway" TEXT NOT NULL,
    "FantasyPoints" DECIMAL(4,1) NOT NULL,
    "Minutes" INTEGER NOT NULL,
    "Seconds" INTEGER NOT NULL,
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
    "OffensiveReboundsPercentage" DECIMAL(4,1) NOT NULL,
    "DefensiveReboundsPercentage" DECIMAL(4,1) NOT NULL,
    "TotalReboundsPercentage" DECIMAL(4,1) NOT NULL,
    "Assists" INTEGER NOT NULL,
    "Steals" INTEGER NOT NULL,
    "BlockedShots" INTEGER NOT NULL,
    "Turnovers" INTEGER NOT NULL,
    "PersonalFouls" INTEGER NOT NULL,
    "Points" INTEGER NOT NULL,
    "TrueShootingPercentage" DECIMAL(4,1) NOT NULL,
    "PlayerEfficiencyRating" DECIMAL(4,1) NOT NULL,
    "AssistsPercentage" DECIMAL(4,1) NOT NULL,
    "StealsPercentage" DECIMAL(4,1) NOT NULL,
    "BlocksPercentage" DECIMAL(4,1) NOT NULL,
    "TurnOversPercentage" DECIMAL(4,1) NOT NULL,
    "UsageRatePercentage" DECIMAL(4,1) NOT NULL,
    "FantasyPointsFanDuel" DECIMAL(4,1) NOT NULL,
    "FantasyPointsDraftKings" DECIMAL(4,1) NOT NULL,
    "FantasyPointsYahoo" DECIMAL(4,1) NOT NULL,
    "PlusMinus" INTEGER NOT NULL,
    "DoubleDoubles" INTEGER NOT NULL,
    "TripleDoubles" INTEGER NOT NULL,
    "FantasyPointsFantasyDraft" DECIMAL(4,1) NOT NULL,

    CONSTRAINT "Statline_pkey" PRIMARY KEY ("StatID")
);

-- AddForeignKey
ALTER TABLE "TeamStatlines" ADD CONSTRAINT "TeamStatlines_TeamID_fkey" FOREIGN KEY ("TeamID") REFERENCES "Team"("TeamID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamStatlines" ADD CONSTRAINT "TeamStatlines_GameID_fkey" FOREIGN KEY ("GameID") REFERENCES "Game"("GameID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamStatlines" ADD CONSTRAINT "TeamStatlines_OpponentID_fkey" FOREIGN KEY ("OpponentID") REFERENCES "Team"("TeamID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_TeamID_fkey" FOREIGN KEY ("TeamID") REFERENCES "Team"("TeamID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statline" ADD CONSTRAINT "Statline_TeamID_fkey" FOREIGN KEY ("TeamID") REFERENCES "Team"("TeamID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statline" ADD CONSTRAINT "Statline_PlayerID_fkey" FOREIGN KEY ("PlayerID") REFERENCES "Player"("PlayerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statline" ADD CONSTRAINT "Statline_GameID_fkey" FOREIGN KEY ("GameID") REFERENCES "Game"("GameID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statline" ADD CONSTRAINT "Statline_OpponentID_fkey" FOREIGN KEY ("OpponentID") REFERENCES "Team"("TeamID") ON DELETE RESTRICT ON UPDATE CASCADE;
