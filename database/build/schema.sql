DROP DATABASE IF EXISTS otr_db;

CREATE DATABASE otr_db;

USE otr_db;

CREATE TABLE country (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE location (
    id INT AUTO_INCREMENT PRIMARY KEY,
    latitude FLOAT,
    longitude FLOAT,
    description VARCHAR(255),
    address VARCHAR(255),
    country_code VARCHAR(10),
    region VARCHAR(100),
    FOREIGN KEY (country_code) REFERENCES country(code)
);

CREATE TABLE genus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE species (
    id INT AUTO_INCREMENT PRIMARY KEY,
    common_name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(100) NOT NULL,
    genus_id INT,
    height FLOAT,
    girth FLOAT,
    crown_spread FLOAT,
    extinct BOOLEAN DEFAULT FALSE,
    country_code VARCHAR(10),
    FOREIGN KEY (country_code) REFERENCES country(code),
    FOREIGN KEY (genus_id) REFERENCES genus(id)
);

CREATE TABLE plant (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT,
    species_id INT,
    type ENUM('Tree', 'Shrub', 'Herb', 'Vine', 'Climber', 'Grass', 'Fern', 'Moss', 'Algae'),
    planted_date DATE,
    alive BOOLEAN DEFAULT TRUE,
    last_watered DATE,
    height FLOAT,
    girth FLOAT,
    crown_spread FLOAT,
    germinated_date DATE,
    description VARCHAR(255),
    trunks INT,
    FOREIGN KEY (species_id) REFERENCES species(id),
    FOREIGN KEY (location_id) REFERENCES location(id)
);