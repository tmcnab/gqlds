import { Database } from 'better-sqlite3'
import { TableInfo } from '../types/TableInfo'

interface Column {
	name: string
	notnull: 0 | 1
	pk: 0 | 1
	type: string
}

interface ForeignKey {
	from: string
	table: string
	to: string
}


export const tableInfo = (db: Database, name: string): TableInfo => {
	const columns = db.prepare(`PRAGMA table_info(${name})`).all() as Column[]
	const foreignKeys = db.prepare(`PRAGMA foreign_key_list(${name})`).all() as ForeignKey[]

	return {
		columns: columns.map((col) => ({
			name: col.name,
			nullable: Boolean(col.notnull),
			primaryKey: Boolean(col.pk),
			type: col.type,
		})),
		foreignKeys: foreignKeys.map((fk) => ({
			domesticColumn: fk.from,
			foreignColumn: fk.to,
			foreignTable: fk.table,
		})),
		name,
	}
}