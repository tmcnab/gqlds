import { GraphQLObjectType } from 'graphql'
import { TableInfo } from '../types/TableInfo'

export const createMutation = (tableInfo: TableInfo[]): GraphQLObjectType => {
    return new GraphQLObjectType({
        fields: {
            // TODO create a union type of tableInfo types for insert
        },
        name: 'Mutation',
    })
}