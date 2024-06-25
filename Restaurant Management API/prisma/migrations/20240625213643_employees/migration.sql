/*
  Warnings:

  - You are about to drop the `restoran` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `restoran`;

-- CreateTable
CREATE TABLE `Restaurant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `booking_email` VARCHAR(191) NOT NULL,
    `general_email` VARCHAR(191) NOT NULL,
    `technical_email` VARCHAR(191) NOT NULL,
    `adress` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `mondayOpen` VARCHAR(191) NOT NULL,
    `mondayClose` VARCHAR(191) NOT NULL,
    `tuesdayOpen` VARCHAR(191) NOT NULL,
    `tuesdayClose` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Restaurant_name_key`(`name`),
    UNIQUE INDEX `Restaurant_booking_email_key`(`booking_email`),
    UNIQUE INDEX `Restaurant_general_email_key`(`general_email`),
    UNIQUE INDEX `Restaurant_technical_email_key`(`technical_email`),
    UNIQUE INDEX `Restaurant_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `role` ENUM('CHEF', 'RESTAURANT_MANAGER', 'EMPLOYEE', 'ADMIN') NOT NULL DEFAULT 'EMPLOYEE',
    `restaurantID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employees` ADD CONSTRAINT `Employees_restaurantID_fkey` FOREIGN KEY (`restaurantID`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
