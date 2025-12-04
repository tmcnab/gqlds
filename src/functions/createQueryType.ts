import { createTypesFromTables } from './createTypesFromTables'
import { FilterCriteriaList } from '../types/Filter'
import { getDatabase } from './getDatabase'
import { GraphQLFieldConfig, GraphQLFieldConfigArgumentMap, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql'
import { logError } from './logError'
import { SortCriteriaList } from '../types/Sort'
import { TableInfo } from '../types/TableInfo'

export const createQueryType = (tables: TableInfo[]): GraphQLObjectType => {
	const types = createTypesFromTables(new Set(tables))

	const queryType: GraphQLObjectType = new GraphQLObjectType({
		fields: Array.from(types.values()).reduce((value, table) => {
			const args: GraphQLFieldConfigArgumentMap = {
				filter: { type: FilterCriteriaList },
				skip: { type: GraphQLInt },
				sort: { type: SortCriteriaList },
				take: { type: GraphQLInt },
			}

			const config: GraphQLFieldConfig<never, never, any> = {
				args,
				resolve: (_, args) => {
					let sql = `SELECT * FROM ${table.name}`

					if (args['filter']) {
						const clause = args['filter'].map(
							(part) => `${part.field} ${part.operator} ${part.value}`
						).join(' AND ')
						sql = `${sql} WHERE ${clause}`
					}

					if (args['sort']) {
						const criteria = args['sort'].map((item) => `${item.name} ${item.direction}`).join(', ')
						sql = `${sql} ORDER BY ${criteria}`
					}

					if (args['take']) {
						sql = `${sql} LIMIT ${args['take']}`
					}

					if (args['skip']) {
						sql = `${sql} OFFSET ${args['skip']}`
					}

					// Execute the SQL query and return the results or null if there is an error
					try {
						const database = getDatabase()
						return database.prepare(sql).all()
					} catch (error) {
						logError(error)
						return null
					}
				},
				type: new GraphQLList(types.get(table.name) as GraphQLObjectType),
			}
			value[table.name] = config
			return value
		}, {}),
		name: 'Query',
	})

	return queryType
}