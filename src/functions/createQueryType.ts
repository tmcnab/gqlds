import { createTypes } from './createTypes'
import { FilterCriteriaList } from '../types/Filter'
import {
	GraphQLFieldConfig,
	GraphQLFieldConfigArgumentMap,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
} from 'graphql'
import { SortCriteriaList } from '../types/Sort'
import { SqliteTable } from '../types/SqliteTable'
import Database from 'better-sqlite3'

export const createQueryType = (tables: SqliteTable[]): GraphQLObjectType => {
	const types = createTypes(tables)
	const queryType: GraphQLObjectType = new GraphQLObjectType({
		fields: tables.reduce((value, table) => {
			const args: GraphQLFieldConfigArgumentMap = {
				filter: { type: FilterCriteriaList },
				skip: { type: GraphQLInt },
				sort: { type: SortCriteriaList },
				take: { type: GraphQLInt },
			}

			const config: GraphQLFieldConfig<any, any, any> = {
				args,
				resolve: (source, args) => {
					let sql = `SELECT * FROM ${table.name}`

					if (args['filter']) {
						const clause = args['filter'].map(
							part => `${part.field} ${part.operator} ${part.value}`
						).join(' AND ')
						sql = `${sql} WHERE ${clause}`
					}

					if (args['sort']) {
						const criteria = args['sort'].map(item => `${item.name} ${item.direction}`).join(', ')
						sql = `${sql} ORDER BY ${criteria}`
					}

					if (args['take']) {
						sql = `${sql} LIMIT ${args['take']}`
					}

					if (args['skip']) {
						sql = `${sql} OFFSET ${args['skip']}`
					}

					return new Database('Chinook.sqlite').prepare(sql).all()
				},
				type: new GraphQLList(types.find(t => t.name == table.name) as GraphQLObjectType),
			}
			value[table.name] = config
			return value
		}, {}),
		name: 'Query',
	})

	return queryType
}