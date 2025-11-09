import { GraphQLNamedType, GraphQLObjectType, GraphQLScalarType, GraphQLString } from 'graphql'
import type { TableInfo } from './types/TableInfo'

export const infoToTypes = (tableInfo: TableInfo): GraphQLNamedType => {
    const fields = tableInfo.columns.reduce((value, column) => {
        value[column.name] = {
            type: sqliteTypeToGQLType(column.type)
        }
        return value
    }, {})

    return new GraphQLObjectType({
        fields,
        name: tableInfo.name,
    })
}

const sqliteTypeToGQLType = (value: string): GraphQLScalarType => {
    return GraphQLString
}