import { GraphQLObjectType } from 'graphql'
import { TableInfo } from '../types/TableInfo'

export const sqliteTableToGQLType = (tableInfo: TableInfo) => {
    return new GraphQLObjectType({
        name: tableInfo.name,
        fields: {},
    })
}