CREATE TABLE `users` (
  `account` varchar(255) PRIMARY KEY NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `manager` bool NOT NULL DEFAULT false,
  `email` varchar(255) UNIQUE,
  `name` varchar(255),
  `phone` varchar(255),
  `profile` text,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `documents` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `creator` varchar(255) NOT NULL,
  `reviewer` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT 0,
  `message` text,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `roles` (
  `document` int NOT NULL,
  `user` varchar(255) NOT NULL,
  `role` int NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`document`, `user`, `role`)
);

CREATE TABLE `images` (
  `id` varchar(255) PRIMARY KEY NOT NULL,
  `document` int NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `logs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `document` int NOT NULL,
  `type` int NOT NULL,
  `ufrom` varchar(255) NOT NULL,
  `uto` varchar(255),
  `message` text,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE roles CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE documents CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE logs CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `roles` ADD FOREIGN KEY (`document`) REFERENCES `documents` (`id`);
ALTER TABLE `roles` ADD FOREIGN KEY (`user`) REFERENCES `users` (`account`);
ALTER TABLE `images` ADD FOREIGN KEY (`document`) REFERENCES `documents` (`id`);
ALTER TABLE `logs` ADD FOREIGN KEY (`document`) REFERENCES `documents` (`id`);
ALTER TABLE `logs` ADD FOREIGN KEY (`ufrom`) REFERENCES `users` (`account`);
ALTER TABLE `logs` ADD FOREIGN KEY (`uto`) REFERENCES `users` (`account`);
ALTER TABLE `documents` ADD FOREIGN KEY (`creator`) REFERENCES `users` (`account`);
ALTER TABLE `documents` ADD FOREIGN KEY (`reviewer`) REFERENCES `users` (`account`);