import { TableInfo } from '../types/TableInfo'
import { tableInfo } from './tableInfo'
import Database from 'better-sqlite3'

export const introspectDatabase = (dbPath: string): TableInfo[] => {
	const db = new Database(dbPath, { readonly: true })

	const tables = db.prepare(`
		SELECT name FROM sqlite_master
		WHERE type='table' AND name NOT LIKE 'sqlite_%'
		ORDER BY name
	`).all() as { name: string }[]

	const result: TableInfo[] = tables.map((table) => tableInfo(db, table.name))

	db.close()
	return result
}
