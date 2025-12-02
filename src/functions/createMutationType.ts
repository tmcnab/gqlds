import { createType } from './createType'
import { deleteType } from './deleteType'
import { GraphQLObjectType } from 'graphql'
import { SqliteTable } from '../types/SqliteTable'

export const createMutation = (tables: SqliteTable[]): GraphQLObjectType => {
    return new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createType: createType(),
            deleteType: deleteType(),
        },
    })
}