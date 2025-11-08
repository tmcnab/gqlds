import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

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

export const createSchema = () => {
    return new GraphQLSchema({
        query: QueryType,
    })
}