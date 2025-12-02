import Database from 'better-sqlite3'
import { SqliteTable } from '../types/SqliteTable'

export const introspectDatabase = (dbPath: string): SqliteTable[] => {
	const db = new Database(dbPath, { readonly: true })

	const tables = db.prepare(`
		SELECT name FROM sqlite_master
		WHERE type='table' AND name NOT LIKE 'sqlite_%'
		ORDER BY name
	`).all() as { name: string }[]

	const result: SqliteTable[] = tables.map((table) => {
		const tableName = table.name
		const columns = db.prepare(`PRAGMA table_info(${tableName})`).all()
		const foreignKeys = db.prepare(`PRAGMA foreign_key_list(${tableName})`).all()

		return {
			columns: columns.map((col: any) => ({
				name: col.name,
				nullable: !Boolean(col.notNull),
				primaryKey: Boolean(col.pk),
				type: col.type,
			})),
			foreignKeys: foreignKeys.map((fk: any) => ({
				domesticColumn: fk.from,
				foreignColumn: fk.to,
				foreignTable: fk.table,
			})),
			name: tableName,
		} as SqliteTable
	})

	db.close()
	return result
}
