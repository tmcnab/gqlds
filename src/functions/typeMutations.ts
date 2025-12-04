import { GraphQLNonNull } from 'graphql'
import { GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLString } from 'graphql'

const CreateTypeFieldArgument = new GraphQLInputObjectType({
	fields: {
		name: { type: new GraphQLNonNull(GraphQLString) },
		type: { type: new GraphQLNonNull(GraphQLString) },// TODO this should be an enum of available Types
	},
	name: 'CreateTypeFieldArgument',
})

export const typeAddFields = () => {
	return {
		args: {
			name: { type: GraphQLString },
		},
		resolve: (_, args: { name: string, fields: string[] }) => {
			console.info('typeAddFields', JSON.parse(JSON.stringify(args)))
			// TODO add the fields to the type
			return false
		},
		type: GraphQLBoolean
	}
}



export const typeCreate = () => {
	return {
		args: {
			name: { type: GraphQLString },
			fields: { type: new GraphQLList(CreateTypeFieldArgument) },
		},
		resolve: (_, args: { name: string, fields: typeof CreateTypeFieldArgument[] }) => {
			console.info('typeCreate', JSON.parse(JSON.stringify(args)))
			// TODO create the type in the database
			return false
		},
		type: GraphQLBoolean,
	}
}

export const typeRemove = () => {
	return {
		args: {
			name: { type: GraphQLString },
		},
		resolve: (_, args: { name: string }) => {
			console.info('typeRemove', args)
			// TODO remove the type from the database
			return false
		},
		type: GraphQLBoolean
	}
}

export const typeRemoveFields = () => {
	return {
		args: {
			name: { type: GraphQLString },
			fields: { type: new GraphQLList(GraphQLString) },
		},
		resolve: (_, args: { name: string, fields: string[] }) => {
			console.info('typeRemoveFields', args)
			// TODO remove the fields from the type
			return false
		},
		type: GraphQLBoolean,
	}
}