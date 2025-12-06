BEGIN TRANSACTION;

CREATE TABLE Airport STRICT (
	iata TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	city TEXT NOT NULL,
	latitude REAL NOT NULL,
	longitude REAL NOT NULL,
	altitude INTEGER NOT NULL
);

INSERT INTO Airport (iata, name, city, latitude, longitude, altitude) VALUES
('ATL', 'Hartsfield-Jackson Atlanta International Airport', 'Atlanta', 33.6407, -84.4279, 1026),
('AUS', 'Austin-Bergstrom International Airport', 'Austin', 30.1945, -97.6699, 543),
('BNA', 'Nashville International Airport', 'Nashville', 36.1245, -86.6782, 601),
('BOS', 'Boston Logan International Airport', 'Boston', 42.364, -71.005, 19),
('BWI', 'Baltimore/Washington International Thurgood Marshall Airport', 'Baltimore', 39.176, -76.668, 146),
('CLT', 'Charlotte Douglas International Airport', 'Charlotte', 35.214, -80.9431, 748),
('DCA', 'Ronald Reagan Washington National Airport', 'Arlington', 38.852, -77.038, 15),
('DEN', 'Denver International Airport', 'Denver', 39.85, -104.674, 5431),
('DFW', 'Dallas/Fort Worth International Airport', 'Fort Worth', 32.8998, -97.0403, 607),
('DTW', 'Detroit Metropolitan Wayne County Airport', 'Detroit', 42.212, -83.353, 646),
('EWR', 'Newark Liberty International Airport', 'Newark', 40.6895, -74.1745, 18),
('FLL', 'Fort Lauderdale-Hollywood International Airport', 'Fort Lauderdale', 26.073, -80.153, 9),
('IAD', 'Washington Dulles International Airport', 'Dulles', 38.945, -77.456, 313),
('IAH', 'George Bush Intercontinental Airport', 'Houston', 29.984, -95.341, 97),
('JFK', 'John F. Kennedy International Airport', 'New York', 40.6413, -73.7781, 12),
('LAS', 'Harry Reid International Airport', 'Las Vegas', 36.0801, -115.152, 2181),
('LAX', 'Los Angeles International Airport', 'Los Angeles', 33.9416, -118.409, 127),
('LGA', 'LaGuardia Airport', 'New York', 40.7769, -73.874, 10),
('MCO', 'Orlando International Airport', 'Orlando', 28.4312, -81.308, 96),
('MDW', 'Chicago Midway International Airport', 'Chicago', 41.7868, -87.7522, 620),
('MIA', 'Miami International Airport', 'Miami', 25.7959, -80.287, 9),
('MSP', 'Minneapolis-Saint Paul International Airport', 'Minneapolis', 44.8848, -93.2223, 841),
('ORD', 'Chicago O''Hare International Airport', 'Chicago', 41.9742, -87.9073, 670),
('PHL', 'Philadelphia International Airport', 'Philadelphia', 39.872, -75.243, 12),
('PHX', 'Phoenix Sky Harbor International Airport', 'Phoenix', 33.4342, -112.012, 1138),
('SAN', 'San Diego International Airport', 'San Diego', 32.7338, -117.193, 15),
('SEA', 'Seattle-Tacoma International Airport', 'Seattle', 47.4502, -122.309, 450),
('SFO', 'San Francisco International Airport', 'San Francisco', 37.7749, -122.419, 14),
('SLC', 'Salt Lake City International Airport', 'Salt Lake City', 40.7899, -111.979, 4227),
('TPA', 'Tampa International Airport', 'Tampa', 27.9755, -82.5332, 28);

COMMIT;