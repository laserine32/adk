/*
  Warnings:

  - Added the required column `num` to the `Pages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pages" ADD COLUMN     "num" INTEGER NOT NULL;
