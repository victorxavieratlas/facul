-- CreateTable
CREATE TABLE `carros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(50) NOT NULL,
    `marca` VARCHAR(30) NOT NULL,
    `ano` INTEGER NOT NULL,
    `preco` DOUBLE NOT NULL,
    `cor` VARCHAR(30) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
