import { GraphQLObjectType } from 'graphql'
import { mapSqliteTypeToGQLType } from './mapSqliteTypeToGQLType'
import { SqliteTable } from '../types/SqliteTable'

export const createTypes = (tables: SqliteTable[]): GraphQLObjectType[] => {
    return tables.map(item => {
        const fields = item.columns.reduce((value, column) => {
            value[column.name] = {
                type: mapSqliteTypeToGQLType(column.type)
            }
            return value
        }, {})

        return new GraphQLObjectType({
            fields,
            name: item.name,
        })
    })
}