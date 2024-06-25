-- CreateTable
CREATE TABLE `Restoran` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `adress` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `mondayOpen` VARCHAR(191) NOT NULL,
    `mondayClose` VARCHAR(191) NOT NULL,
    `tuesdayOpen` VARCHAR(191) NOT NULL,
    `tuesdayClose` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Restoran_name_key`(`name`),
    UNIQUE INDEX `Restoran_email_key`(`email`),
    UNIQUE INDEX `Restoran_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
