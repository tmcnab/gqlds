export interface TableInfo {
	columns: {
		name: string
		nullable: boolean
		primaryKey: boolean
		type: string
	}[]
	foreignKeys: {
		from: {
			table: string
			column: string
		}
		to: {
			table: string
			column: string
		}
	}[]
	name: string
}