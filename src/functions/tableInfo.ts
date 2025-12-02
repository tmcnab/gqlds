import { Database } from 'better-sqlite3'

export interface TableInfo {
	columns: {
		name: string
		nullable: boolean
		primaryKey: boolean
		type: string
	}[]
	foreignKeys: {
		domesticColumn: string
		foreignColumn: string
		foreignTable: string
	}[]
	name: string
}

export const tableInfo = (db: Database, name: string): TableInfo => {
	return {
		columns: [],
		foreignKeys: [],
		name,
	}
}