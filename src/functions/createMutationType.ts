import { createDeleteMutation } from './createDeleteMutation'
import { createInsertMutation } from './createInsertMutation'
import { createTypeDelete, createTypeInsert, createTypeUpdate } from './typeMutations'
import { createUpdateMutation } from './createUpdateMutation'
import { GraphQLObjectType } from 'graphql'
import { TableInfo } from '../types/TableInfo'

export const createMutation = (tables: TableInfo[]): GraphQLObjectType => {
	return new GraphQLObjectType({
		name: 'Mutation',
		fields: {
			...tables.reduce((value, table) => {
				value[`delete${table.name}`] = createDeleteMutation(table)
				value[`insert${table.name}`] = createInsertMutation(table)
				value[`update${table.name}`] = createUpdateMutation(table)
				return value
			}, Object.create(null)),
			deleteType: createTypeDelete(),
			insertType: createTypeInsert(),
			updateType: createTypeUpdate(),
		},
	})
}