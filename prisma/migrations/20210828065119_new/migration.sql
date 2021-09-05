/*
  Warnings:

  - Added the required column `teacher_id` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `teacher_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `teacher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(11) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `course` ADD FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
