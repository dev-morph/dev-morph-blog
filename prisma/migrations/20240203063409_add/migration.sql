/*
  Warnings:

  - Added the required column `filename` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Image` ADD COLUMN `filename` VARCHAR(255) NOT NULL;
