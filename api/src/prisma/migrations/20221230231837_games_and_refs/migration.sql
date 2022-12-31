-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "CrewChiefID" INTEGER,
ADD COLUMN     "RefereeID" INTEGER,
ADD COLUMN     "UmpireID" INTEGER;

-- CreateTable
CREATE TABLE "Referee" (
    "RefereeID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Number" INTEGER NOT NULL,
    "Experience" TEXT NOT NULL,

    CONSTRAINT "Referee_pkey" PRIMARY KEY ("RefereeID")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_CrewChiefID_fkey" FOREIGN KEY ("CrewChiefID") REFERENCES "Referee"("RefereeID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_UmpireID_fkey" FOREIGN KEY ("UmpireID") REFERENCES "Referee"("RefereeID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_RefereeID_fkey" FOREIGN KEY ("RefereeID") REFERENCES "Referee"("RefereeID") ON DELETE SET NULL ON UPDATE CASCADE;
