DROP DATABASE IF EXISTS cookbook_db;

CREATE DATABASE cookbook_db;
USE cookbook_db;

CREATE TABLE recipes (
    id int NOT NULL AUTO_INCREMENT,
    recipe_name VARCHAR(200) NOT NULL,
    ingredients VARCHAR(550),
    directions VARCHAR(550) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE ingredients (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    season VARCHAR(200) NULL,
    PRIMARY KEY (id)
);

INSERT INTO recipes (recipe_name, ingredients, directions)


-- TODO: '1,2,3' need to be split on the comma and conversted to an array referencing the ingredients table
VALUES 
('test', '[{"ingredients": 1, "amount": "2 cups"},{"ingredients": 2, "amount": "1/2lb"}]', 'test direction'), 
('test2', '[{"ingredients": 3, "amount": "2 cups"},{"ingredients": 1, "amount": "1/2lb"}]', 'test2 direction'),
('test3', '[{"ingredients": 2, "amount": "2 cups"},{"ingredients": 3, "amount": "1/2lb"}]', 'test3 direction');


INSERT INTO ingredients (ingredient_name, season)

VALUES 
('Salt', NULL), 
('Watermelon', NULL),
('Rice', NULL);