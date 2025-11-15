import { createQueryType } from './createQueryType'
import { GraphQLSchema } from 'graphql'
import { SortDirection } from '../types/Sort'
import { SqliteTable } from '../types/SqliteTable'
import { createMutation } from './createMutationType'

export const createSchema = (tables: SqliteTable[]) => {
    return new GraphQLSchema({
        query: createQueryType(tables),
        mutation: createMutation(tables),
        types: [
            SortDirection,
        ]
    })
}