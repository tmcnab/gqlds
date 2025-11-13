import { GraphQLObjectType } from 'graphql'
import { mapSqliteTypeToGQLType } from './mapSqliteTypeToGQLType'
import { SqliteTable } from '../types/SqliteTable'

export const sqliteTableToGQLType = (table: SqliteTable) => {
    return new GraphQLObjectType({
        name: table.name,
        fields: table.columns.reduce((fields, column) => {
            fields[column.name] = {
                type: mapSqliteTypeToGQLType(column.type)
            }
            return fields
        }, {} as Record<string, any>),
    })
}