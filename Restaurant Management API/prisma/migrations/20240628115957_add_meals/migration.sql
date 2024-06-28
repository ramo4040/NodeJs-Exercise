-- CreateTable
CREATE TABLE `Category` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Image` VARCHAR(191) NULL,

    UNIQUE INDEX `Category_Name_key`(`Name`),
    UNIQUE INDEX `Category_Image_key`(`Image`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meals` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `image` VARCHAR(191) NULL,
    `restaurantID` INTEGER NOT NULL,
    `categoryID` INTEGER NOT NULL,

    UNIQUE INDEX `Meals_name_key`(`name`),
    UNIQUE INDEX `Meals_image_key`(`image`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Meals` ADD CONSTRAINT `Meals_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `Category`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meals` ADD CONSTRAINT `Meals_restaurantID_fkey` FOREIGN KEY (`restaurantID`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
