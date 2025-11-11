import { createTypes } from './createTypes'
import { GraphQLFieldConfig, GraphQLFieldConfigArgumentMap, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { TableInfo } from "../types/TableInfo"
import Database from 'better-sqlite3';

// https://hasura.io/docs/2.0/api-reference/graphql-api/query/
// https://hasura.io/docs/2.0/api-reference/graphql-api/mutation/

export const createQueryType = (items: TableInfo[]): GraphQLObjectType => {
    const types = createTypes(items)
    const queryType: GraphQLObjectType = new GraphQLObjectType({
        fields: items.reduce((value, table) => {
            const args: GraphQLFieldConfigArgumentMap = {
                order: { type: GraphQLString },
                direction: { type: GraphQLString },
            }

            const config: GraphQLFieldConfig<any, any, any> = {
                args,
                resolve: (source, args, context, info) => {
                    return new Database('Chinook.sqlite').prepare(`SELECT * FROM ${table.name}`).all()
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