-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `listEmoji` VARCHAR(191) NULL,
    `coin` INTEGER NOT NULL DEFAULT 0,
    `score` INTEGER NOT NULL DEFAULT 0,
    `profilePicture` INTEGER NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Friend` (
    `isFriendOfLogin` VARCHAR(191) NOT NULL,
    `hasFriendLogin` VARCHAR(191) NOT NULL,
    `addedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`isFriendOfLogin`, `hasFriendLogin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `beganAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `finishedAt` DATETIME(3) NULL,
    `selectedMode` VARCHAR(191) NOT NULL,
    `accessMode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGame` (
    `userLogin` VARCHAR(191) NOT NULL,
    `gameId` INTEGER NOT NULL,
    `score` INTEGER NULL,
    `rankInGame` INTEGER NULL,

    PRIMARY KEY (`userLogin`, `gameId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Friend` ADD CONSTRAINT `Friend_isFriendOfLogin_fkey` FOREIGN KEY (`isFriendOfLogin`) REFERENCES `User`(`login`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friend` ADD CONSTRAINT `Friend_hasFriendLogin_fkey` FOREIGN KEY (`hasFriendLogin`) REFERENCES `User`(`login`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGame` ADD CONSTRAINT `UserGame_userLogin_fkey` FOREIGN KEY (`userLogin`) REFERENCES `User`(`login`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGame` ADD CONSTRAINT `UserGame_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
