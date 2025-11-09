export type TableInfo = {
    columns: {
        name: string
        notNull: boolean
        primaryKey: boolean
        type: string
    }[]
    foreignKeys: {
        from: string
        to: string
        table: string
    }[]
    name: string
}