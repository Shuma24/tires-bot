-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "TelegramID" INTEGER NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlackList" (
    "id" SERIAL NOT NULL,
    "TelegramID" INTEGER NOT NULL,

    CONSTRAINT "BlackList_pkey" PRIMARY KEY ("id")
);
