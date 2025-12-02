import { Database } from 'better-sqlite3'
import { TableInfo } from '../types/TableInfo'

export const tableInfo = (db: Database, name: string): TableInfo => {
	const columns = db.prepare(`PRAGMA table_info(${name})`).all()
	const foreignKeys = db.prepare(`PRAGMA foreign_key_list(${name})`).all()

	return {
		columns: columns.map((col: any) => ({
			name: col.name,
			nullable: !col.notNull,
			primaryKey: Boolean(col.pk),
			type: col.type,
		})),
		foreignKeys: foreignKeys.map((fk: any) => ({
			domesticColumn: fk.from,
			foreignColumn: fk.to,
			foreignTable: fk.table,
		})),
		name,
	}
}