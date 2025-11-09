import { compress } from 'hono/compress'
import { createRootResolver } from './createRootResolver.js'
import { createSchema } from './schema.js'
import { graphqlServer } from '@hono/graphql-server'
import { Hono } from 'hono'
import { introspectDatabase } from "./introspectDatabase.js"
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { serve } from '@hono/node-server'

console.clear()

const app = new Hono()
app.use(logger())
app.use(compress())
app.use(secureHeaders())


const tableInfo = introspectDatabase('Chinook.sqlite')
app.use('/', graphqlServer({
    graphiql: true,
    rootResolver: createRootResolver(tableInfo),
    schema: createSchema(tableInfo),
}))

serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})