import { GraphQLObjectType } from 'graphql'
import { introspectDatabase } from '../functions/introspectDatabase'
import { sqlTableToGqlType } from '../functions/sqlTableToGqlType'

export class TypeCache {
	private types: Map<string, GraphQLObjectType>
	private dbName: string

	constructor({ dbName }: { dbName: string }) {
		this.dbName = dbName
		this.refresh()
	}

	get(name: string): GraphQLObjectType | null {
		return this.types.get(name) || null
	}

	has(name: string): boolean {
		return this.types.has(name)
	}

	refresh() {
		this.types = new Map<string, GraphQLObjectType>()
		introspectDatabase(this.dbName).forEach(table => {
			this.types.set(table.name, sqlTableToGqlType(table))
		})
	}
}