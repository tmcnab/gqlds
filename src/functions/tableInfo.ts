import { Database } from 'better-sqlite3'
import { TableInfo } from '../types/TableInfo'

export const tableInfo = (db: Database, name: string): TableInfo => {
	return {
		columns: [],
		foreignKeys: [],
		name,
	}
}