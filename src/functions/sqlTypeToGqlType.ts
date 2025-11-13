import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInt,
    GraphQLScalarType,
    GraphQLString,
} from 'graphql'

export const sqlTypeToGqlType = (value: string): GraphQLScalarType => {
    if (/(BOOL|BOOLEAN)/.test(value)) return GraphQLBoolean;
    if (/(INT|INTEGER)/.test(value)) return GraphQLInt;
    if (/(REAL|FLOAT)/.test(value)) return GraphQLFloat;
    return GraphQLString;
}