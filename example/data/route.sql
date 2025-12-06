BEGIN TRANSACTION;
CREATE TABLE Route STRICT (
	name TEXT NOT NULL,
	origin TEXT NOT NULL REFERENCES Airport(iata),
	destination TEXT NOT NULL REFERENCES Airport(iata),
	distance REAL GENERATED ALWAYS AS (
		( 
			6371.0 * acos(
				cos(radians((SELECT latitude FROM Airport WHERE iata = origin))) * 
				cos(radians((SELECT latitude FROM Airport WHERE iata = destination))) *
				cos(radians((SELECT longitude FROM Airport WHERE iata = destination)) - radians((SELECT longitude FROM Airport WHERE iata = origin))) +
				sin(radians((SELECT latitude FROM Airport WHERE iata = origin))) * 
				sin(radians((SELECT latitude FROM Airport WHERE iata = destination)))
			) / 1.852 -- convert km to nautical miles
		)
	) STORED,
);
COMMIT;