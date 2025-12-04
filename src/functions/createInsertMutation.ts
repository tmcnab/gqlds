import { GraphQLBoolean, GraphQLInputObjectType } from 'graphql'
import { sqlTypeToGqlType } from './sqlTypeToGqlType'
import { TableInfo } from '../types/TableInfo'
import { getDatabase } from './getDatabase'

export const createInsertMutation = (table: TableInfo) => {
	const inputTypeFields = table.columns.reduce((value, column) => {
		// TODO: exclude autoincrement columns
		value[column.name] = {
			type: sqlTypeToGqlType(column.type, column.nullable),
		}
		return value
	}, {})

	return {
		args: {
			data: {
				type: new GraphQLInputObjectType({
					name: `${table.name}InsertInput`,
					fields: inputTypeFields,
				})
			},
		},
		resolve: (_, args: { data: Record<string, boolean | number | string | null> }) => {
			try {
				const database = getDatabase()
				const keys = Object.keys(args.data).join(', ')
				const values = Object.keys(args.data).map(key => '?').join(', ')
				const insert = database.prepare(`INSERT INTO ${table.name} (${keys}) VALUES (${values})`)
				const result = insert.run(...Object.values(args.data))
				return result.changes > 0
			} catch (error) {
				console.error(error)
				throw error
			}
		},
		type: GraphQLBoolean
	}
}