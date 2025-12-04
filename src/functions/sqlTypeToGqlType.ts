import { GraphQLNonNull } from 'graphql'
import {
	GraphQLBoolean,
	GraphQLFloat,
	GraphQLInt,
	GraphQLScalarType,
	GraphQLString,
} from 'graphql'

// This maps sqlite column type strings to the corresponding GraphQL scalar type.
export const sqlTypeToGqlType = (value: string, nullable = true): GraphQLScalarType | GraphQLNonNull<GraphQLScalarType> => {
	let type: GraphQLScalarType

	if (/(BOOL|BOOLEAN)/.test(value)) {
		type = GraphQLBoolean
	} else if (/(INT|INTEGER)/.test(value)) {
		type = GraphQLInt
	} else if (/(REAL|FLOAT)/.test(value)) {
		type = GraphQLFloat
	} else {
		type = GraphQLString
	}

	return nullable ? type : new GraphQLNonNull(type)
}