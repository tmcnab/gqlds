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