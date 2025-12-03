import {
	GraphQLFieldConfig,
	GraphQLList,
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

	// Fix: Add foreign keys as fields, ensure required 'name' in GraphQLObjectType, and correct the type usage.

	table.foreignKeys.forEach(foreignKey => {
		fields[foreignKey.foreignTable] = {
			type: new GraphQLList(
				new GraphQLObjectType({
					name: `${table.name}_${foreignKey.foreignTable}_FK`,
					fields: {
						[foreignKey.foreignColumn]: {
							type: sqlTypeToGqlType(foreignKey.foreignColumn)
						}
					},
				})
			)
		};
	});

	return new GraphQLObjectType({
		fields,
		name: table.name,
	})
}