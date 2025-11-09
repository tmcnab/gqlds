import Database from 'better-sqlite3';
import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType } from 'graphql'
import { TableInfo } from "./types/TableInfo"
import { createTypes } from './createTypes'

export const createQueryType = (items: TableInfo[]): GraphQLObjectType => {
    const types = createTypes(items)
    const queryType: GraphQLObjectType = new GraphQLObjectType({
        fields: items.reduce((value, table) => {
            const config: GraphQLFieldConfig<any, any, any> = {
                resolve: (source, args, context, info) => {
                    return new Database('Chinook.sqlite').prepare(`SELECT * FROM ${table.name}`).all()
                },
                type: new GraphQLList(types.find(t => t.name == table.name) as GraphQLObjectType) // TODO
            }
            value[table.name.toLocaleLowerCase()] = config
            return value
        }, {}),
        name: 'Query',
    })

    return queryType
}