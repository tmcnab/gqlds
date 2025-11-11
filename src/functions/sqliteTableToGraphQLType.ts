import { GraphQLObjectType } from 'graphql'
import { mapSqliteTypeToGQLType } from './mapSqliteTypeToGQLType'
import { TableInfo } from '../types/TableInfo'

export const sqliteTableToGQLType = (tableInfo: TableInfo) => {
    return new GraphQLObjectType({
        name: tableInfo.name,
        fields: tableInfo.columns.reduce((fields, column) => {
            fields[column.name] = {
                type: mapSqliteTypeToGQLType(column.type)
            }
            return fields
        }, {} as Record<string, any>),
    })
}