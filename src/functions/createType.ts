import {
    GraphQLBoolean,
    GraphQLString,
} from "graphql"
import Database from "better-sqlite3"

export const createType = () => {
    return {
        args: {
            name: { type: GraphQLString },
        },
        resolve: (_: any, args: { name: string }) => {
            const db = new Database('Chinook.sqlite')
            const result = db.prepare(`CREATE TABLE IF NOT EXISTS ${args.name} (rowid INTEGER PRIMARY KEY) WITHOUT ROWID`).run()
            return result.changes > 0
        },
        type: GraphQLBoolean,
    }
}