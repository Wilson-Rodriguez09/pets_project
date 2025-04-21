-- CreateTable
CREATE TABLE `Users_ws` (
    `id_ws` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname_ws` VARCHAR(191) NOT NULL,
    `email_ws` VARCHAR(191) NOT NULL,
    `password_ws` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_ws_email_ws_key`(`email_ws`),
    PRIMARY KEY (`id_ws`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pets_ws` (
    `id_ws` INTEGER NOT NULL AUTO_INCREMENT,
    `photo_ws` VARCHAR(191) NOT NULL,
    `estado_ws` ENUM('disponible', 'adoptado') NOT NULL DEFAULT 'disponible',
    `raceId_ws` INTEGER NOT NULL,
    `categoryId_ws` INTEGER NOT NULL,
    `genderId_ws` INTEGER NOT NULL,
    `userId_ws` INTEGER NOT NULL,

    PRIMARY KEY (`id_ws`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Races_ws` (
    `id_ws` INTEGER NOT NULL AUTO_INCREMENT,
    `name_ws` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_ws`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories_ws` (
    `id_ws` INTEGER NOT NULL AUTO_INCREMENT,
    `name_ws` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_ws`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genders_ws` (
    `id_ws` INTEGER NOT NULL AUTO_INCREMENT,
    `name_ws` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_ws`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pets_ws` ADD CONSTRAINT `Pets_ws_raceId_ws_fkey` FOREIGN KEY (`raceId_ws`) REFERENCES `Races_ws`(`id_ws`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets_ws` ADD CONSTRAINT `Pets_ws_categoryId_ws_fkey` FOREIGN KEY (`categoryId_ws`) REFERENCES `Categories_ws`(`id_ws`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets_ws` ADD CONSTRAINT `Pets_ws_genderId_ws_fkey` FOREIGN KEY (`genderId_ws`) REFERENCES `Genders_ws`(`id_ws`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets_ws` ADD CONSTRAINT `Pets_ws_userId_ws_fkey` FOREIGN KEY (`userId_ws`) REFERENCES `Users_ws`(`id_ws`) ON DELETE RESTRICT ON UPDATE CASCADE;
