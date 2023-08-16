-- CreateEnum
CREATE TYPE "TypeTires" AS ENUM ('summer', 'winter', 'allseason');

-- CreateTable
CREATE TABLE "Tires" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "radius" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "type" "TypeTires" NOT NULL DEFAULT 'summer',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Tires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "tiresId" INTEGER,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_tiresId_fkey" FOREIGN KEY ("tiresId") REFERENCES "Tires"("id") ON DELETE SET NULL ON UPDATE CASCADE;
