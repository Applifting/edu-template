CREATE TABLE `quack` (
	`id` int AUTO_INCREMENT NOT NULL,
	`createdAt` datetime NOT NULL,
	`userId` int NOT NULL,
	`text` text NOT NULL,
	CONSTRAINT `quack_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`userName` varchar(255) NOT NULL,
	`profileImageUrl` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
