// import { createMutation } from './createMutationType'
import { createQueryType } from './createQueryType'
import { GraphQLSchema } from 'graphql'
import { SortDirection } from '../types/Sort'
import { TableInfo } from '../types/TableInfo'

export const createSchema = (items: TableInfo[]) => {
    return new GraphQLSchema({
        query: createQueryType(items),
        // mutation: createMutation(items),
        types: [
            SortDirection,
        ]
    })
}