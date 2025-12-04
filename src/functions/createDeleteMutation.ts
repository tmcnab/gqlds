import { FilterCriteriaList } from '../types/Filter'
import { getDatabase } from './getDatabase'
import { GraphQLBoolean } from 'graphql'
import { logError } from './logError'
import { TableInfo } from '../types/TableInfo'

export const createDeleteMutation = (table: TableInfo) => {
	return {
		args: {
			filter: {
				type: FilterCriteriaList,
			},
		},
		resolve: (_, args: { filter: { field: string; operator: string; value: boolean | number | string | null }[] }) => {
			try {
				const database = getDatabase()

				if (!args.filter || args.filter.length === 0) {
					throw new Error('Delete mutation requires at least one filter criteria')
				}

				const whereClause = args.filter
					.map((part) => `${part.field} ${part.operator} ?`)
					.join(' AND ')

				const values = args.filter.map((part) => part.value)
				const deleteQuery = database.prepare(`DELETE FROM ${table.name} WHERE ${whereClause}`)
				const result = deleteQuery.run(...values)
				return result.changes > 0
			} catch (error) {
				logError(error)
				return false
			}
		},
		type: GraphQLBoolean
	}
}

