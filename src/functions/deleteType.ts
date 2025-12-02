import Database from "better-sqlite3"
import { GraphQLBoolean, GraphQLString } from "graphql"

export const deleteType = () => {
    return {
        args: {
            name: { type: GraphQLString },
        },
        resolve: (_: any, args: { name: string }) => {
            const db = new Database('Chinook.sqlite')
            const result = db.prepare(`DROP TABLE IF EXISTS ${args.name}`).run()
            db.close()
            return result.changes > 0
        },
        type: GraphQLBoolean
    }
}   