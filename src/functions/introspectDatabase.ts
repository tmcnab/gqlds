import Database from "better-sqlite3"
import type { TableInfo } from "../types/TableInfo"

export const introspectDatabase = (dbPath: string): TableInfo[] => {
    const db = new Database(dbPath, { readonly: true })

    const tables = db.prepare(`
		SELECT name FROM sqlite_master
		WHERE type='table' AND name NOT LIKE 'sqlite_%'
		ORDER BY name
	`).all() as { name: string }[]

    const result: TableInfo[] = tables.map((table) => {
        const tableName = table.name
        const columns = db.prepare(`PRAGMA table_info(${tableName})`).all()
        const foreignKeys = db.prepare(`PRAGMA foreign_key_list(${tableName})`).all()

        return {
            columns: columns.map((col: any) => ({
                name: col.name,
                notNull: Boolean(col.notNull),
                primaryKey: Boolean(col.dflt_value),
                type: col.type,
            })),
            foreignKeys: foreignKeys.map((fk: any) => ({
                from: fk.from,
                table: fk.table,
                to: fk.to,
            })),
            name: tableName,
        } as TableInfo
    })

    db.close()
    return result
}
