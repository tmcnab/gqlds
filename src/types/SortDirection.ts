import { GraphQLEnumType } from 'graphql'

export const SortDirection = new GraphQLEnumType({
    name: 'SortDirection',
    values: {
        ASC: { value: 'ASC' },
        DESC: { value: 'DESC' },
    }
})