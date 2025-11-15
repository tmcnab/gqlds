import {
	GraphQLID,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql'
import { SqliteTable } from '../types/SqliteTable'
import { GraphQLList } from 'graphql'

export const createMutation = (tables: SqliteTable[]): GraphQLObjectType => {
	return new GraphQLObjectType({
		name: 'Mutation',
		fields: {
			createType: createType(),
		},
	})
}

const createType = () => {
	return {
		args: {
			name: { type: GraphQLString },
		},
		resolve: (_: any, args: { name: string }) => {
			return `${args.name}Type`
		},
		type: GraphQLID,
	}
}