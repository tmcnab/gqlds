import { buildSchema } from 'graphql'
import { compress } from 'hono/compress'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { serve } from '@hono/node-server'
import { type RootResolver, graphqlServer } from '@hono/graphql-server'

const app = new Hono()
app.use(logger())
app.use(compress())
app.use(secureHeaders())

const schema = buildSchema(`
	type Mutation {
		createType (name: String): Boolean
	}

	type Query {
		hello: String
	}
`)

const rootResolver: RootResolver = (c) => {
	return {
		createType: (name: string) => {
			console.log('createType', name)
			return false
		},
		hello: () => 'Hello Hono!',
	}
}

app.use('/', graphqlServer({
	graphiql: true,
	rootResolver,
	schema,
}))

serve({
	fetch: app.fetch,
	port: 3000,
}, (info) => {
	console.log(`Server is running on http://localhost:${info.port}`)
})