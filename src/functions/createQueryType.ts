import { createTypes } from './createTypes'
import { GraphQLFieldConfig, GraphQLFieldConfigArgumentMap, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { TableInfo } from "../types/TableInfo"
import Database from 'better-sqlite3';

// https://hasura.io/docs/2.0/api-reference/graphql-api/query/

export const createQueryType = (items: TableInfo[]): GraphQLObjectType => {
	const types = createTypes(items)
	const queryType: GraphQLObjectType = new GraphQLObjectType({
		fields: items.reduce((value, table) => {
			const args: GraphQLFieldConfigArgumentMap = {
				take: { type: GraphQLInt },
				skip: { type: GraphQLInt },
			}

			const config: GraphQLFieldConfig<any, any, any> = {
				args,
				resolve: (source, args, context, info) => {
					console.log(args)
					let sql = `SELECT * FROM ${table.name}`
					if (args['take']) {
						sql = `${sql} LIMIT ${args['take']}`
					}
					if (args['skip']) {
						sql = `${sql} OFFSET ${args['skip']}`
					}

					console.log(sql)

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