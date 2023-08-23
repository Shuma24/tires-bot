/*
  Warnings:

  - You are about to drop the column `height` on the `Tires` table. All the data in the column will be lost.
  - You are about to drop the column `radius` on the `Tires` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Tires` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Tires` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Tires` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_tiresId_fkey";

-- AlterTable
ALTER TABLE "Tires" DROP COLUMN "height",
DROP COLUMN "radius",
DROP COLUMN "width",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_tiresId_fkey" FOREIGN KEY ("tiresId") REFERENCES "Tires"("id") ON DELETE CASCADE ON UPDATE CASCADE;
