import { GraphQLObjectType } from 'graphql'
import { sqlTypeToGqlType } from './sqlTypeToGQLType'
import { SqliteTable } from '../types/SqliteTable'

export const sqlTableToGqlType = (table: SqliteTable) => {
    return new GraphQLObjectType({
        name: table.name,
        fields: table.columns.reduce((fields, column) => {
            fields[column.name] = {
                type: sqlTypeToGqlType(column.type)
            }
            return fields
        }, {} as Record<string, any>),
    })
}