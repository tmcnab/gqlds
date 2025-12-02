import {
	GraphQLFieldConfig,
	GraphQLObjectType,
	ThunkObjMap,
} from 'graphql'
import { TableInfo } from '../types/TableInfo'
import { sqlTypeToGqlType } from './sqlTypeToGqlType'

export const sqlTableToGqlType = (table: TableInfo) => {
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