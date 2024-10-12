/*
  Warnings:

  - You are about to drop the column `title` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `Branches` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cutoff` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Mode` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Process` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Profile` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SPOC` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Timings` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "title",
DROP COLUMN "userId",
ADD COLUMN     "Branches" TEXT NOT NULL,
ADD COLUMN     "Cutoff" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Mode" TEXT NOT NULL,
ADD COLUMN     "Process" TEXT NOT NULL,
ADD COLUMN     "Profile" TEXT NOT NULL,
ADD COLUMN     "SPOC" TEXT NOT NULL,
ADD COLUMN     "Timings" TEXT NOT NULL,
ADD COLUMN     "company" TEXT NOT NULL;
