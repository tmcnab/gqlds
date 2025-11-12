import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLUnionType } from 'graphql'
import {
	GraphQLEnumType,
	GraphQLInputObjectType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
} from 'graphql'

export const Comparator = new GraphQLEnumType({
	name: 'Comparator',
	values: {
		EQ: { value: '=' },
		GT: { value: '>' },
		GTE: { value: '≥' },
		ISN: { value: 'isnull' },
		LT: { value: '<' },
		LTE: { value: '≤' },
		NEQ: { value: '≠' },
	}
})


export const FilterCriteria = new GraphQLInputObjectType({
	fields: {
		field: {
			type: new GraphQLNonNull(GraphQLString),
		},
		operator: {
			type: new GraphQLNonNull(Comparator),
		},
		value: {
			// TODO: make a union type
			type: new GraphQLNonNull(GraphQLString),
		}
	},
	name: 'FilterCriteria',
})

export const FilterCriteriaList = new GraphQLList(FilterCriteria)