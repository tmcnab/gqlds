import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import type { TableInfo } from './types/TableInfo.js'

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        datetime: {
            type: GraphQLString,
            resolve: () => {
                return new Date().toISOString()
            }
        }
    }
})

export const createSchema = (items: TableInfo[]) => {
    return new GraphQLSchema({
        query: QueryType,
    })
}