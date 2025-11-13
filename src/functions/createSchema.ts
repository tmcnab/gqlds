import { createQueryType } from './createQueryType'
import { GraphQLSchema } from 'graphql'
import { SortDirection } from '../types/Sort'
import { SqliteTable } from '../types/SqliteTable'

export const createSchema = (tables: SqliteTable[]) => {
    return new GraphQLSchema({
        query: createQueryType(tables),
        types: [
            SortDirection,
        ]
    })
}