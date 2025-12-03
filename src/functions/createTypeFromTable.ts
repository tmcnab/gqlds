import { GraphQLObjectType } from 'graphql'
import { sqlTypeToGqlType } from './sqlTypeToGqlType'
import { TableInfo } from '../types/TableInfo'

export function createTypeFromTable(tableInfo: TableInfo): GraphQLObjectType {
	const fields = tableInfo.columns.reduce((value, column) => {
		value[column.name] = {
			type: sqlTypeToGqlType(column.type)
		}
		return value
	}, {})
	return new GraphQLObjectType({
		fields,
		name: tableInfo.name,
	})
}