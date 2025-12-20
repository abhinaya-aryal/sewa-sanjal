/*
  Warnings:

  - You are about to drop the `_ProviderCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ProviderCategories` DROP FOREIGN KEY `_ProviderCategories_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProviderCategories` DROP FOREIGN KEY `_ProviderCategories_B_fkey`;

-- DropTable
DROP TABLE `_ProviderCategories`;

-- CreateTable
CREATE TABLE `_providerCategories` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_providerCategories_AB_unique`(`A`, `B`),
    INDEX `_providerCategories_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_providerCategories` ADD CONSTRAINT `_providerCategories_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_providerCategories` ADD CONSTRAINT `_providerCategories_B_fkey` FOREIGN KEY (`B`) REFERENCES `Provider`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
