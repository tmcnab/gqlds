import { GraphQLObjectType } from 'graphql'
import {
	typeAddFields,
	typeCreate,
	typeRemove,
	typeRemoveFields,
} from './typeMutations'

export const createMutation = (): GraphQLObjectType => {
	return new GraphQLObjectType({
		name: 'Mutation',
		fields: {
			typeAddFields: typeAddFields(),
			typeCreate: typeCreate(),
			typeRemove: typeRemove(),
			typeRemoveFields: typeRemoveFields(),
		},
	})
}