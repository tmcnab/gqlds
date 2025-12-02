import { GraphQLScalarType, Kind } from 'graphql'
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
		GTE: { value: '>=' },
		LT: { value: '<' },
		LTE: { value: '<=' },
		NEQ: { value: '<>' },
	}
})

export const FilterValue = new GraphQLScalarType({
	name: 'FilterValue',
	description: 'A scalar type that can represent String, Int, Float, Boolean or null values',
	serialize(value) {
		return value
	},
	parseValue(value) {
		return value
	},
	parseLiteral(ast) {
		switch (ast.kind) {
		case Kind.STRING:
			return ast.value
		case Kind.INT:
			return parseInt(ast.value, 10)
		case Kind.FLOAT:
			return parseFloat(ast.value)
		case Kind.BOOLEAN:
			return ast.value
		case Kind.NULL:
			return null
		default:
			throw new Error(`Unsupported kind: ${ast.kind}`)
		}
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
			type: FilterValue,
		}
	},
	name: 'FilterCriteria',
})

export const FilterCriteriaList = new GraphQLList(FilterCriteria)