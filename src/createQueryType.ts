import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { TableInfo } from "./types/TableInfo"

export const createQueryType = (items: TableInfo[]): GraphQLObjectType => {
    const queryType: GraphQLObjectType = new GraphQLObjectType({
        fields: items.reduce((value, table) => {
            const config: GraphQLFieldConfig<any, any, any> = {
                resolve: (source, args, context, info) => {
                    return []
                },
                type: new GraphQLList(GraphQLString) // TODO
            }
            value[table.name] = config
            return value
        }, {}),
        name: 'Query',
    })

    return queryType
}