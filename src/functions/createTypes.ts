import { GraphQLObjectType } from 'graphql'
import { mapSqliteTypeToGQLType } from './mapSqliteTypeToGQLType'
import { TableInfo } from '../types/TableInfo'

export const createTypes = (items: TableInfo[]): GraphQLObjectType[] => {
    return items.map(item => {
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