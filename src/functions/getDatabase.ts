import Database from 'better-sqlite3'

export const getDatabase = (dbPath = 'Chinook.sqlite'): Database.Database => {
	return new Database(dbPath)
}