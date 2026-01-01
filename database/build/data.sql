USE otr_db;

DELETE FROM country;
DELETE FROM location;
DELETE FROM genus;
DELETE FROM species;
DELETE FROM plant;

INSERT INTO country (code, name) VALUES
('US', 'United States'),
('CA', 'Canada'),
('MX', 'Mexico');

INSERT INTO genus (name) VALUES
('Quercus'),
('Acer'),
('Pinus');

INSERT INTO species (common_name, scientific_name, genus_id, height, girth, crown_spread, extinct, country_code) VALUES
('White Oak', 'Quercus alba', (SELECT id FROM genus WHERE name = 'Quercus'), 30.0, 4.0, 20.0, FALSE, 'US'),
('Sugar Maple', 'Acer saccharum', (SELECT id FROM genus WHERE name = 'Acer'), 25.0, 3.5, 15.0, FALSE, 'CA'),
('Eastern White Pine', 'Pinus strobus', (SELECT id FROM genus WHERE name = 'Pinus'), 50.0, 5.0, 25.0, FALSE, 'US');

INSERT INTO location (latitude, longitude, description, address, country_code, region) VALUES
(40.7128, -74.0060, 'Central Park', 'New York, NY', 'US', 'New York'),
(43.651070, -79.347015, 'High Park', 'Toronto, ON', 'CA', 'Ontario'),
(19.432608, -99.133209, 'Chapultepec Park', 'Mexico City', 'MX', 'Mexico City');

INSERT INTO plant (location_id, species_id, type, planted_date, alive, last_watered, height, girth, crown_spread, germinated_date, description, trunks) VALUES
((SELECT id FROM location WHERE description = 'Central Park'), (SELECT id FROM species WHERE common_name = 'White Oak'), 'Tree', '2000-04-15', TRUE, '2024-06-01', 15.0, 2.0, 10.0, '2000-05-01', 'A young white oak tree in Central Park.', 1),
((SELECT id FROM location WHERE description = 'High Park'), (SELECT id FROM species WHERE common_name = 'Sugar Maple'), 'Tree', '1995-05-20', TRUE, '2024-05-30', 20.0, 3.0, 12.0, '1995-06-10', 'A mature sugar maple tree in High Park.', 1),
((SELECT id FROM location WHERE description = 'Chapultepec Park'), (SELECT id FROM species WHERE common_name = 'Eastern White Pine'), 'Tree', '2010-03-10', TRUE, '2024-06-02', 30.0, 4.0, 15.0, '2010-04-01', 'A tall eastern white pine in Chapultepec Park.', 1);