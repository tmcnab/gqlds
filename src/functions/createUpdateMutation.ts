import { FilterCriteriaList } from '../types/Filter'
import { getDatabase } from './getDatabase'
import { GraphQLBoolean, GraphQLInputObjectType } from 'graphql'
import { logError } from './logError'
import { TableInfo } from '../types/TableInfo'
import { sqlTypeToGqlType } from './sqlTypeToGqlType'

export const createUpdateMutation = (table: TableInfo) => {
	const inputTypeFields = table.columns.reduce((value, column) => {
		// TODO: exclude autoincrement columns
		value[column.name] = {
			type: sqlTypeToGqlType(column.type),
		}
		return value
	}, {})

	const inputType = new GraphQLInputObjectType({
		name: `${table.name}UpdateInput`,
		fields: inputTypeFields,
	})

	return {
		args: {
			filter: {
				type: FilterCriteriaList,
			},
			data: {
				type: inputType,
			},
		},
		resolve: (_, args: { filter: { field: string; operator: string; value: boolean | number | string | null }[] }) => {
			try {
				const database = getDatabase()

				if (!args.filter || args.filter.length === 0) {
					throw new Error('mutation requires at least one filter criteria')
				}

				const whereClause = args.filter
					.map((part) => `${part.field} ${part.operator} ?`)
					.join(' AND ')

				const setClause = Object.keys(args.data).map((key) => `${key} = ?`).join(', ')

				const values = args.filter.map((part) => part.value)
				const statement = database.prepare(`UPDATE ${table.name} SET ${setClause} WHERE ${whereClause}`)
				const result = statement.run(...values)
				return result.changes > 0
			} catch (error) {
				logError(error)
				return false
			}
		},
		type: GraphQLBoolean
	}
}

