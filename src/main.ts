import { compress } from 'hono/compress'
import { createSchema } from './schema.js'
import { Hono } from 'hono'
import { introspectDatabase } from './database.js'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { serve } from '@hono/node-server'
import { type RootResolver, graphqlServer } from '@hono/graphql-server'

console.clear()

const app = new Hono()
app.use(logger())
app.use(compress())
app.use(secureHeaders())

const rootResolver: RootResolver = (c) => {
    return {
        createType: (name: string) => {
            console.log('createType', name)
            return false
        },
        hello: () => 'Hello Hono!',
    }
}

const tableInfo = introspectDatabase('Chinook.sqlite')
app.use('/', graphqlServer({
    graphiql: true,
    rootResolver,
    schema: createSchema(tableInfo),
}))

serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})