/*
  Warnings:

  - You are about to drop the `ProfileCity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProfileCity` DROP FOREIGN KEY `ProfileCity_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileCity` DROP FOREIGN KEY `ProfileCity_profileId_fkey`;

-- DropTable
DROP TABLE `ProfileCity`;

-- CreateTable
CREATE TABLE `ProfileLocation` (
    `profileId` INTEGER NOT NULL,
    `cityId` INTEGER NOT NULL,
    `stateId` INTEGER NOT NULL,

    PRIMARY KEY (`profileId`, `cityId`, `stateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfileLocation` ADD CONSTRAINT `ProfileLocation_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileLocation` ADD CONSTRAINT `ProfileLocation_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileLocation` ADD CONSTRAINT `ProfileLocation_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `states`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
