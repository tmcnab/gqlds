import { GraphQLObjectType } from 'graphql'
import { SqliteTable } from '../types/SqliteTable'
import {
    typeAddFields,
    typeCreate,
    typeRemove,
    typeRemoveFields,
} from './typeMutations'

export const createMutation = (tables: SqliteTable[]): GraphQLObjectType => {
    return new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            typeAddFields: typeAddFields(),
            typeCreate: typeCreate(),
            typeRemove: typeRemove(),
            typeRemoveFields: typeRemoveFields(),
        },
    })
}