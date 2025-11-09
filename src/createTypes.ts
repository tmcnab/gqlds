import { GraphQLObjectType } from 'graphql'
import { sqliteTypeToGQLType } from './sqliteTypeToGQLType'
import { TableInfo } from './types/TableInfo'

export const createTypes = (items: TableInfo[]): GraphQLObjectType[] => {
    return items.map(item => {
        const fields = item.columns.reduce((value, column) => {
            console.log(column.type, sqliteTypeToGQLType(column.type).name)
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


