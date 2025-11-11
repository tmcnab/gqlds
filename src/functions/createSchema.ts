import { createQueryType } from './createQueryType'
import { GraphQLSchema } from 'graphql'
import type { TableInfo } from '../types/TableInfo'

export const createSchema = (items: TableInfo[]) => {
    return new GraphQLSchema({
        query: createQueryType(items),
    })
}