import { createMutation } from './createMutationType'
import { createQueryType } from './createQueryType'
import { GraphQLSchema } from 'graphql'
import { SortDirection } from '../types/Sort'
import { TableInfo } from '../types/TableInfo'

export const createSchema = (tables: TableInfo[]) => {
	return new GraphQLSchema({
		query: createQueryType(tables),
		mutation: createMutation(),
		types: [
			SortDirection,
		]
	})
}