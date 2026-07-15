CREATE TABLE `custom_products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`family` text DEFAULT '' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`price` integer DEFAULT 0 NOT NULL,
	`old_price` integer,
	`volume` text DEFAULT '50 ML' NOT NULL,
	`badge_label` text,
	`badge_variant` text,
	`bottle` text DEFAULT 'noir' NOT NULL,
	`label` text DEFAULT '' NOT NULL,
	`concentration` text DEFAULT '' NOT NULL,
	`longevity` text DEFAULT '' NOT NULL,
	`sillage` text DEFAULT '' NOT NULL,
	`occasion` text DEFAULT '' NOT NULL,
	`gender` text DEFAULT '' NOT NULL,
	`origin` text DEFAULT '' NOT NULL,
	`top_notes` text DEFAULT '' NOT NULL,
	`heart_notes` text DEFAULT '' NOT NULL,
	`base_notes` text DEFAULT '' NOT NULL,
	`story` text DEFAULT '' NOT NULL,
	`image_data` text DEFAULT '' NOT NULL,
	`stock` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`product_id` text NOT NULL,
	`product_name` text NOT NULL,
	`quantity` integer NOT NULL,
	`unit_price` integer NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`total_amount` integer NOT NULL,
	`shipping_address` text,
	`notes` text,
	`payment_method` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`stock` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`password_salt` text DEFAULT '' NOT NULL,
	`created_at` integer NOT NULL,
	`phone` text,
	`governorate` text,
	`city` text,
	`district` text,
	`street` text,
	`building` text,
	`role` text DEFAULT 'user' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);