import { GraphQLObjectType } from 'graphql'
import { SqliteTable } from '../types/SqliteTable'

export const createMutation = (tables: SqliteTable[]): GraphQLObjectType => {
    return new GraphQLObjectType({
        fields: {
            // TODO create a union type of tableInfo types for insert
        },
        name: 'Mutation',
    })
}