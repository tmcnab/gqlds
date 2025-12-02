import Database from "better-sqlite3"
import { GraphQLBoolean, GraphQLList, GraphQLString } from "graphql"

export const typeAddFields = () => {
	return {
		args: {
			name: { type: GraphQLString },
		},
		resolve: (_: any, args: { name: string, fields: string[] }) => {
			return false
		},
		type: GraphQLBoolean
	}
}

export const typeCreate = () => {
	return {
		args: {
			name: { type: GraphQLString },
		},
		resolve: (_: any, args: { name: string }) => {
			const db = new Database('Chinook.sqlite')
			const result = db.prepare(`CREATE TABLE IF NOT EXISTS ${args.name} (rowid INTEGER PRIMARY KEY) WITHOUT ROWID`).run()
			return result.changes > 0
		},
		type: GraphQLBoolean,
	}
}

export const typeRemove = () => {
	return {
		args: {
			name: { type: GraphQLString },
		},
		resolve: (_: any, args: { name: string }) => {
			const db = new Database('Chinook.sqlite')
			const result = db.prepare(`DROP TABLE IF EXISTS ${args.name}`).run()
			db.close()
			return result.changes > 0
		},
		type: GraphQLBoolean
	}
}

export const typeRemoveFields = () => {
	return {
		args: {
			name: { type: GraphQLString },
			fields: { type: new GraphQLList(GraphQLString) },
		},
		resolve: (_: any, args: { name: string, fields: string[] }) => {
			return false
		},
		type: GraphQLBoolean
	}
}