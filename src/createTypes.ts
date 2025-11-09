import { GraphQLObjectType, GraphQLScalarType, GraphQLString } from 'graphql'
import { TableInfo } from './types/TableInfo'

export const createTypes = (items: TableInfo[]): GraphQLObjectType[] => {
    return items.map(item => {
        const fields = item.columns.reduce((value, column) => {
            value[column.name] = {
                type: sqliteTypeToGQLType(column.type)
            }
            return value
        }, {})

        return new GraphQLObjectType({
            fields,
            name: item.name,
        })
    })
}

const sqliteTypeToGQLType = (value: string): GraphQLScalarType => {
    return GraphQLString
}