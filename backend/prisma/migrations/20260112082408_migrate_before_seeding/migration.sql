-- CreateEnum
CREATE TYPE "ACTIVE_TOKEN_TYPE" AS ENUM ('REGISTER', 'RESET_PASSWORD', 'CHANGE_EMAIL', 'CONFIRM_EMAIL');

-- CreateTable
CREATE TABLE "ActiveToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" "ACTIVE_TOKEN_TYPE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveToken_token_key" ON "ActiveToken"("token");
