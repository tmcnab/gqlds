import { RootResolver } from "@hono/graphql-server"
import { TableInfo } from "../types/TableInfo"

export const createRootResolver = (tableInfo: TableInfo[]): RootResolver => {
    return (c) => {
        return {

        }
    }
}