import { createDeleteMutation } from './createDeleteMutation'
import { createInsertMutation } from './createInsertMutation'
import { GraphQLObjectType } from 'graphql'
import { TableInfo } from '../types/TableInfo'
import { typeAddFields, typeCreate, typeRemove, typeRemoveFields } from './typeMutations'

export const createMutation = (tables: TableInfo[]): GraphQLObjectType => {
	return new GraphQLObjectType({
		name: 'Mutation',
		fields: {
			...tables.reduce((value, table) => {
				value[`insert${table.name}`] = createInsertMutation(table)
				value[`delete${table.name}`] = createDeleteMutation(table)
				return value
			}, Object.create(null)),
			typeAddFields: typeAddFields(),
			typeCreate: typeCreate(),
			typeRemove: typeRemove(),
			typeRemoveFields: typeRemoveFields(),
		},
	})
}