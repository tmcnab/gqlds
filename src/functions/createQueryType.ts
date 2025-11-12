import { createTypes } from './createTypes'
import {
	GraphQLFieldConfig,
	GraphQLFieldConfigArgumentMap,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
} from 'graphql'
import { FilterCriteriaList } from '../types/Filter'
import { SortCriteriaList } from '../types/Sort'
import { TableInfo } from "../types/TableInfo"
import Database from 'better-sqlite3'

// https://hasura.io/docs/2.0/api-reference/graphql-api/query/
export const createQueryType = (items: TableInfo[]): GraphQLObjectType => {
	const types = createTypes(items)
	const queryType: GraphQLObjectType = new GraphQLObjectType({
		fields: items.reduce((value, table) => {
			const args: GraphQLFieldConfigArgumentMap = {
				filter: { type: FilterCriteriaList },
				skip: { type: GraphQLInt },
				sort: { type: SortCriteriaList },
				take: { type: GraphQLInt },
			}

			const config: GraphQLFieldConfig<any, any, any> = {
				args,
				resolve: (source, args, context, info) => {
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