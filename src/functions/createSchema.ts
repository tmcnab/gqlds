import { createQueryType } from './createQueryType'
import { GraphQLSchema } from 'graphql'
import { SortDirection } from '../types/SortDirection'
import { TableInfo } from '../types/TableInfo'

export const createSchema = (items: TableInfo[]) => {
	return new GraphQLSchema({
		query: createQueryType(items),
		types: [
			SortDirection,
		]
	})
}