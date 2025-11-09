import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import type { TableInfo } from './types/TableInfo'
import { infoToTypes } from './infoToTypes'

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
    items.map(infoToTypes)
    return new GraphQLSchema({
        query: QueryType,
        types: items.map(infoToTypes),
    })
}