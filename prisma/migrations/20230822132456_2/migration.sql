/*
  Warnings:

  - You are about to drop the column `id_siswa` on the `jalur` table. All the data in the column will be lost.
  - Added the required column `id_jalur` to the `siswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `jalur` DROP FOREIGN KEY `Jalur_id_siswa_fkey`;

-- AlterTable
ALTER TABLE `jalur` DROP COLUMN `id_siswa`;

-- AlterTable
ALTER TABLE `siswa` ADD COLUMN `id_jalur` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_id_jalur_fkey` FOREIGN KEY (`id_jalur`) REFERENCES `Jalur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
