import { GraphQLNonNull } from 'graphql'
import { GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLString } from 'graphql'

const CreateTypeFieldArgument = new GraphQLInputObjectType({
	fields: {
		name: { type: new GraphQLNonNull(GraphQLString) },
		type: { type: new GraphQLNonNull(GraphQLString) },// TODO this should be an enum of available Types
	},
	name: 'CreateTypeFieldArgument',
})

export const createTypeDelete = () => {
	return {
		args: {
			name: { type: GraphQLString },
		},
		resolve: (_, args: { name: string }) => {
			console.info('typeDelete', args)
			// TODO remove the type from the database
			return false
		},
		type: GraphQLBoolean
	}
}

export const createTypeInsert = () => {
	return {
		args: {
			name: { type: GraphQLString },
			fields: { type: new GraphQLList(CreateTypeFieldArgument) },
		},
		resolve: (_, args: { name: string, fields: typeof CreateTypeFieldArgument[] }) => {
			console.info('typeInsert', JSON.parse(JSON.stringify(args)))
			// TODO create the type in the database
			return false
		},
		type: GraphQLBoolean,
	}
}

export const createTypeUpdate = () => {
	return {
		args: {
			name: { type: GraphQLString },
			fields: { type: new GraphQLList(CreateTypeFieldArgument) },
		},
		resolve: (_, args: { name: string, fields: typeof CreateTypeFieldArgument[] }) => {
			console.info('typeUpdate', JSON.parse(JSON.stringify(args)))
			// TODO update the type in the database
			return false
		},
		type: GraphQLBoolean,
	}
}