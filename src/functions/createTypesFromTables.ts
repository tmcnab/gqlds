import { createTypeFromTable } from './createTypeFromTable'
import { GraphQLObjectType } from 'graphql'
import { TableInfo } from '../types/TableInfo'

export const createTypesFromTables = (tableInfo: Set<TableInfo>): Map<string, GraphQLObjectType> => {
	const types = new Map<string, GraphQLObjectType>()

	// First pass: create types for each table
	tableInfo.forEach(table => {
		types.set(table.name, createTypeFromTable(table))
	})

	tableInfo.forEach(table => {
		table.foreignKeys.forEach(foreignKey => {
			// types.set(foreignKey.foreignTable, createTypeFromTable(foreignKey.foreignTable))
			console.info(`${foreignKey.from.table}.${foreignKey.from.column} → ${foreignKey.to.table}.${foreignKey.to.column}`)
		})
	})
	// Second pass: create types for each foreign key


	return types
}