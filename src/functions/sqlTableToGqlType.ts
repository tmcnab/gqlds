import {
    GraphQLFieldConfig,
    GraphQLObjectType,
    ThunkObjMap,
} from 'graphql'
import { SqliteTable } from '../types/SqliteTable'
import { sqlTypeToGqlType } from './sqlTypeToGQLType'

export const sqlTableToGqlType = (table: SqliteTable) => {
    const fields: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = Object.create(null)

    table.columns.forEach(column => {
        fields[column.name] = {
            type: sqlTypeToGqlType(column.type)
        }
    })

    // TODO add foreign keys as fields

    return new GraphQLObjectType({
        fields,
        name: table.name,
    })
}