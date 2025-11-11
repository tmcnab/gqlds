import type { RootResolver } from "@hono/graphql-server"
import type { TableInfo } from "../types/TableInfo"

export const createRootResolver = (tableInfo: TableInfo[]): RootResolver => {
    return (c) => {
        return {

        }
    }
}