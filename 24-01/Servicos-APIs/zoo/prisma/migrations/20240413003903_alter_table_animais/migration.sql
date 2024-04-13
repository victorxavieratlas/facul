-- AlterTable
ALTER TABLE `animais` ADD COLUMN `habitat` ENUM('Terra', 'Ar', 'Mar') NULL DEFAULT 'Terra';
