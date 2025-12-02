import { compress } from 'hono/compress'
import { createSchema } from './functions/createSchema'
import { graphqlServer } from '@hono/graphql-server'
import { Hono } from 'hono'
import { introspectDatabase } from "./functions/introspectDatabase"
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { serve } from '@hono/node-server'
import { TypeCache } from './types/TypeCache'

console.clear()

const app = new Hono()
app.use(logger())
app.use(compress())
app.use(secureHeaders())

global.typeCache = new TypeCache({ dbName: 'Chinook.sqlite' })

const tableInfo = introspectDatabase('Chinook.sqlite')
app.use('/', graphqlServer({
    graphiql: true,
    schema: createSchema(tableInfo),
}))

serve({
    fetch: app.fetch,
    port: 3000,
})