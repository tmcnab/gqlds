import { GraphQLObjectType } from 'graphql'
import { sqlTypeToGqlType } from './sqlTypeToGqlType'
import { SqliteTable } from '../types/SqliteTable'

export const createTypes = (tables: SqliteTable[]): GraphQLObjectType[] => {
    return tables.map(item => {
        const fields = item.columns.reduce((value, column) => {
            value[column.name] = {
                type: sqlTypeToGqlType(column.type)
            }
            return value
        }, {})

        return new GraphQLObjectType({
            fields,
            name: item.name,
        })
    })
}