-- CreateTable
CREATE TABLE `Aluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(40) NOT NULL,
    `turma` VARCHAR(40) NOT NULL,
    `obs` VARCHAR(255) NULL,
    `nomeResp` VARCHAR(40) NOT NULL,
    `numWhatsResp` VARCHAR(30) NOT NULL,
    `numCompras` INTEGER NOT NULL DEFAULT 0,
    `totalCompras` INTEGER NOT NULL DEFAULT 0,
    `numDepositos` INTEGER NOT NULL DEFAULT 0,
    `totalDepositos` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gasto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` VARCHAR(12) NOT NULL,
    `lanche` VARCHAR(40) NOT NULL,
    `alunoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deposito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` VARCHAR(12) NOT NULL,
    `tipo` VARCHAR(12) NOT NULL,
    `valor` DECIMAL(9, 2) NULL,
    `alunoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Gasto` ADD CONSTRAINT `Gasto_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deposito` ADD CONSTRAINT `Deposito_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
