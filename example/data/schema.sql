-- This is a Slop Generated SQLite Schema.
PRAGMA foreign_keys = ON;
CREATE TABLE Aircraft (
	tail_number TEXT PRIMARY KEY NOT NULL,
	-- "N12345"
	model TEXT NOT NULL,
	-- "B737-800"
	seats INTEGER CHECK (seats > 0) NOT NULL,
	-- 180
	range_nm INTEGER NOT NULL,
	-- 3000
) WITHOUT ROWID;
------------------------------------------------------------------------------
-- FLIGHT (main table)
------------------------------------------------------------------------------
CREATE TABLE Flight (
	arrival_time DATETIME NOT NULL,
	departure_time DATETIME NOT NULL,
	destination TEXT NOT NULL REFERENCES Airport(iata),
	flight_id INTEGER PRIMARY KEY,
	flight_number TEXT NOT NULL,
	origin TEXT NOT NULL REFERENCES Airport(iata),
	tail_number TEXT NOT NULL REFERENCES Aircraft(tail_number),
	CHECK (arrival_time > departure_time),
	CHECK (origin <> destination)
);
------------------------------------------------------------------------------
-- FLIGHT CREW (junction table, composite PK)
------------------------------------------------------------------------------
CREATE TABLE FlightCrew (
	flight_id INTEGER NOT NULL REFERENCES Flight(flight_id) ON DELETE CASCADE,
	crew_id INTEGER NOT NULL REFERENCES Crew(crew_id),
	role TEXT NOT NULL,
	PRIMARY KEY(flight_id, crew_id)
);
------------------------------------------------------------------------------
-- TICKETS (STRICT, CHECK, foreign keys)
------------------------------------------------------------------------------
CREATE TABLE Ticket STRICT (
	ticket_id INTEGER PRIMARY KEY,
	pax_id INTEGER NOT NULL REFERENCES Passenger(pax_id),
	flight_id INTEGER NOT NULL REFERENCES Flight(flight_id),
	seat TEXT NOT NULL,
	price REAL CHECK(price >= 0),
	booked_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(flight_id, seat)
);
------------------------------------------------------------------------------
-- INDEXES FOR PERFORMANCE OPTIMIZATION
------------------------------------------------------------------------------
-- Foreign key indexes (SQLite doesn't auto-index foreign keys)
CREATE INDEX idx_flight_origin ON Flight(origin);
CREATE INDEX idx_flight_destination ON Flight(destination);
CREATE INDEX idx_flight_tail_number ON Flight(tail_number);
CREATE INDEX idx_ticket_flight_id ON Ticket(flight_id);
CREATE INDEX idx_ticket_pax_id ON Ticket(pax_id);
CREATE INDEX idx_flightcrew_flight_id ON FlightCrew(flight_id);
CREATE INDEX idx_flightcrew_crew_id ON FlightCrew(crew_id);
-- Temporal indexes for date/time queries
CREATE INDEX idx_flight_departure_time ON Flight(departure_time);
CREATE INDEX idx_flight_arrival_time ON Flight(arrival_time);
CREATE INDEX idx_ticket_booked_at ON Ticket(booked_at);
CREATE INDEX idx_crew_hire_date ON Crew(hire_date);
CREATE INDEX idx_aircraft_manufacture_date ON Aircraft(manufacture_date);
-- Composite indexes for common query patterns
-- Find flights from an airport ordered by departure time
CREATE INDEX idx_flight_origin_departure ON Flight(origin, departure_time);
-- Find flights to an airport ordered by arrival time
CREATE INDEX idx_flight_destination_arrival ON Flight(destination, arrival_time);
-- Find tickets for a passenger ordered by booking date
CREATE INDEX idx_ticket_pax_booked ON Ticket(pax_id, booked_at DESC);
-- Find all crew for a flight
CREATE INDEX idx_flightcrew_flight_role ON FlightCrew(flight_id, role);
-- Filtering indexes
CREATE INDEX idx_crew_role ON Crew(role);
CREATE INDEX idx_airport_country ON Airport(country);
CREATE INDEX idx_airport_city ON Airport(city);
-- Partial index (only index tickets for future flights)
CREATE INDEX idx_ticket_future ON Ticket(flight_id, pax_id)
WHERE booked_at >= datetime('now');
------------------------------------------------------------------------------
-- TRIGGERS
------------------------------------------------------------------------------
-- Prevent booking more seats than capacity
-- Optimized: uses index on flight_id for faster COUNT
CREATE TRIGGER limit_ticket_sales BEFORE
INSERT ON Ticket BEGIN
SELECT CASE
		WHEN (
			(
				SELECT COUNT(*)
				FROM Ticket
				WHERE flight_id = NEW.flight_id
			) >= (
				SELECT a.seats
				FROM Aircraft a
					INNER JOIN Flight f ON a.tail_number = f.tail_number
				WHERE f.flight_id = NEW.flight_id
			)
		) THEN RAISE(ABORT, 'Flight is fully booked')
	END;
END;
-- Automatically reject tickets with invalid seat format
CREATE TRIGGER validate_seat_format BEFORE
INSERT ON Ticket
	WHEN NEW.seat NOT GLOB '[A-Z][0-9][0-9]' BEGIN
SELECT RAISE(ABORT, 'Invalid seat format (Ex: A12)');
END;
------------------------------------------------------------------------------
-- VIEW: Current flights view
------------------------------------------------------------------------------
CREATE VIEW CurrentFlights AS
SELECT f.flight_id,
	f.flight_number,
	a1.city AS origin_city,
	a2.city AS destination_city,
	f.departure_time,
	f.arrival_time
FROM Flight f
	JOIN Airport a1 ON f.origin = a1.iata
	JOIN Airport a2 ON f.destination = a2.iata
WHERE f.departure_time >= datetime('now');
------------------------------------------------------------------------------
-- FULL TEXT SEARCH (FTS5) for passenger names
------------------------------------------------------------------------------
CREATE VIRTUAL TABLE PassengerSearch USING fts5(full_name, tokenize = "unicode61");
-- Auto-populate FTS table through triggers
CREATE TRIGGER passenger_search_insert
AFTER
INSERT ON Passenger BEGIN
INSERT INTO PassengerSearch (rowid, full_name)
VALUES (
		NEW.pax_id,
		NEW.first_name || ' ' || NEW.last_name
	);
END;
CREATE TRIGGER passenger_search_update
AFTER
UPDATE ON Passenger BEGIN
UPDATE PassengerSearch
SET full_name = NEW.first_name || ' ' || NEW.last_name
WHERE rowid = NEW.pax_id;
END;
CREATE TRIGGER passenger_search_delete
AFTER DELETE ON Passenger BEGIN
DELETE FROM PassengerSearch
WHERE rowid = OLD.pax_id;
END;
------------------------------------------------------------------------------
-- RECURSIVE CTE VIEW (route graph)
-- Shows all possible multi-leg connections between airports
------------------------------------------------------------------------------
CREATE VIEW RouteGraph AS WITH RECURSIVE routes(origin, destination, path) AS (
	SELECT origin,
		destination,
		origin || '→' || destination
	FROM Flight
	UNION ALL
	SELECT r.origin,
		f.destination,
		r.path || '→' || f.destination
	FROM routes r
		JOIN Flight f ON f.origin = r.destination
	WHERE instr(path, f.destination) = 0 -- prevent cycles
)
SELECT *
FROM routes;