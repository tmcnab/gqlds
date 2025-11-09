import { GraphQLObjectType, GraphQLString } from 'graphql'

export const createQueryType = (): GraphQLObjectType => {
    return new GraphQLObjectType({
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
}