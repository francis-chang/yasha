-- CreateTable
CREATE TABLE "Team" (
    "TeamID" INTEGER NOT NULL,
    "Key" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "stadium" TEXT NOT NULL,
    "Conference" TEXT NOT NULL,
    "Division" TEXT NOT NULL,
    "inner_color" TEXT NOT NULL,
    "outer_color" TEXT NOT NULL,
    "WikipediaLogoUrl" TEXT NOT NULL,
    "Wins" INTEGER NOT NULL,
    "Losses" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("TeamID")
);

-- CreateTable
CREATE TABLE "Game" (
    "GameID" INTEGER NOT NULL,
    "Season" INTEGER NOT NULL,
    "SeasonType" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "Channel" TEXT NOT NULL,
    "Day" TIMESTAMP(3) NOT NULL,
    "DateTime" TIMESTAMP(3) NOT NULL,
    "AwayTeamID" INTEGER NOT NULL,
    "HomeTeamID" INTEGER NOT NULL,
    "stadium" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "AwayTeamScore" INTEGER,
    "HomeTeamScore" INTEGER,
    "Quarter" TEXT,
    "TimeRemainingMinutes" TEXT,
    "TimeRemainingSeconds" TEXT,
    "Quarters" JSONB,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("GameID")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_AwayTeamID_fkey" FOREIGN KEY ("AwayTeamID") REFERENCES "Team"("TeamID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_HomeTeamID_fkey" FOREIGN KEY ("HomeTeamID") REFERENCES "Team"("TeamID") ON DELETE RESTRICT ON UPDATE CASCADE;
