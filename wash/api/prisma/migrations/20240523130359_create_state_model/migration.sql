/*
  Warnings:

  - Added the required column `stateId` to the `cities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cities` ADD COLUMN `stateId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `states` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProfileToState` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProfileToState_AB_unique`(`A`, `B`),
    INDEX `_ProfileToState_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `cities_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `states`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfileToState` ADD CONSTRAINT `_ProfileToState_A_fkey` FOREIGN KEY (`A`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfileToState` ADD CONSTRAINT `_ProfileToState_B_fkey` FOREIGN KEY (`B`) REFERENCES `states`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
