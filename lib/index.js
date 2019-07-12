import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import express from 'express';
import expressGraphQL from 'express-graphql';

const app = express();
const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			hello: {
				type: GraphQLString,
				resolve() {
					return 'world';
				},
			},
		},
	}),
})

app.use('/', expressGraphQL({
	graphiql: true,
	schema,
}))

export default app;
