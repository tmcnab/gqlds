import { createTypeFromTable } from './createTypeFromTable'
import { GraphQLObjectType } from 'graphql'
import { TableInfo } from '../types/TableInfo'

export const createTypesFromTables = (tableInfo: Set<TableInfo>): Map<string, GraphQLObjectType> => {
	const types = new Map<string, GraphQLObjectType>()

	// First pass: create types for each table
	tableInfo.forEach((table) => {
		types.set(table.name, createTypeFromTable(table))
	})

	// Second pass: create types for each foreign key
	// tableInfo.forEach(table => {
	// 	table.foreignKeys.forEach(foreignKey => {
	// 		console.info(`${foreignKey.from.table}.${foreignKey.from.column} → ${foreignKey.to.table}.${foreignKey.to.column}`)
	// 	})
	// })

	return types
}