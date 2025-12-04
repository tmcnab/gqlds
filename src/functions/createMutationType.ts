import { GraphQLObjectType } from 'graphql'
import {
	typeAddFields,
	typeCreate,
	typeRemove,
	typeRemoveFields,
} from './typeMutations'
import { createInsertMutation } from './createInsertMutation'
import { TableInfo } from '../types/TableInfo'

export const createMutation = (tables: TableInfo[]): GraphQLObjectType => {
	return new GraphQLObjectType({
		name: 'Mutation',
		fields: {
			...tables.reduce((value, table) => {
				value[`insert${table.name}`] = createInsertMutation(table)
				return value
			}, Object.create(null)),
			typeAddFields: typeAddFields(),
			typeCreate: typeCreate(),
			typeRemove: typeRemove(),
			typeRemoveFields: typeRemoveFields(),
		},
	})
}