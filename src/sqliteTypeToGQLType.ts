import { GraphQLScalarType, GraphQLBoolean, GraphQLInt, GraphQLFloat, GraphQLString } from 'graphql';

export const sqliteTypeToGQLType = (value: string): GraphQLScalarType => {
    if (/(BOOL|BOOLEAN)/.test(value)) return GraphQLBoolean;
    if (/(INT|INTEGER)/.test(value)) return GraphQLInt;
    if (/(REAL|FLOAT)/.test(value)) return GraphQLFloat;
    return GraphQLString;
};
