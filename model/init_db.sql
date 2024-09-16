DROP TABLE IF EXISTS productions;
DROP TABLE IF EXISTS purchases;

CREATE TABLE `productions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255),
    `budget` INT NOT NULL
);
CREATE TABLE `purchases`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `production_id` INT NOT NULL COMMENT 'For which show or production did you make this purchase?',
    `date` DATE NOT NULL COMMENT 'When did you make this purchase?',
    `order_num` INT NOT NULL COMMENT 'What are the last four digits of the order number?',
    `vender` VARCHAR(255) NOT NULL COMMENT 'From what company or store did you buy these things?',
    `items` INT NOT NULL,
    `description` VARCHAR(255) NULL COMMENT 'What specific item(s) were purchased in this transaction?',
    `payment_type` VARCHAR(255) NOT NULL COMMENT 'How did you pay for these things?',
    `total` DECIMAL(8, 2) NOT NULL COMMENT 'What is the total cost of this ENTIRE PURCHASE as shown on the receipt?',
    `reimb_submitted` BOOLEAN NOT NULL,
    `reimb_received` BOOLEAN NOT NULL
);

-- Some initial data for productions
INSERT INTO `productions` (title, description, budget) VALUES
('Hamilton', 'A musical about the life of American Founding Father Alexander Hamilton.', 2000000),
('The Phantom of the Opera', 'A musical based on the novel about a masked figure who haunts the Paris Opera.', 1500000),
('Wicked', 'A musical based on the story of the witches of Oz.', 1800000);

-- Initial data for purchases
INSERT INTO `purchases` (production_id, date, order_num, vender, items, description, payment_type, total, reimb_submitted, reimb_received) VALUES
(1, '2024-01-10', 1234, 'Broadway Costumes', 15, 'Revolutionary War costumes', 'Credit Card', 15000.00, 1, 0),
(1, '2024-02-15', 5678, 'Costume World', 10, 'Period-specific hats', 'Credit Card', 3500.00, 1, 1),
(2, '2024-01-20', 4321, 'Theatrical Threads', 20, 'Masquerade Ball gowns', 'Bank Transfer', 22000.00, 0, 0),
(2, '2024-03-05', 8765, 'Opera Couture', 5, 'Phantom mask and cloak', 'Credit Card', 12000.00, 1, 0),
(3, '2024-02-01', 1357, 'Wicked Wears', 25, 'Witch costumes, flying monkey suits', 'PayPal', 18000.00, 1, 1),
(3, '2024-04-10', 2468, 'Oz Fabrics', 50, 'Fabrics for costumes', 'Bank Transfer', 8000.00, 0, 0);
