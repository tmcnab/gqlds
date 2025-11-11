import { GraphQLList } from 'graphql'
import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLEnumType,
} from 'graphql'

export const SortDirection = new GraphQLEnumType({
    name: 'SortDirection',
    values: {
        ASC: { value: 'ASC' },
        DESC: { value: 'DESC' },
    }
})

export const SortCriteria = new GraphQLInputObjectType({
    fields: {
        direction: {
            type: new GraphQLNonNull(SortDirection),
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    name: 'SortCriteria',
})

export const SortCriteriaList = new GraphQLList(SortCriteria)