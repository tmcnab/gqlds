import { GraphQLObjectType } from 'graphql'
import { sqlTypeToGqlType } from './sqlTypeToGqlType'
import { TableInfo } from '../types/TableInfo'
import { notStrictEqual } from 'assert'

export function createTypeFromTable(tableInfo: TableInfo): GraphQLObjectType {
	notStrictEqual(tableInfo.name, 'type', 'sql-gql does not allow tables named "Type"')

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