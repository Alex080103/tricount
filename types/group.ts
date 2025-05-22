import type { Category, User } from "@/types"

type Group = {
    id: number
    category?: Category
    members: (
        User 
        & {
            balance: number
            joined_at: Date
        }
    )[]
    title: string
    description: string
    created_at: Date
    archived_at?: number
    active_user_spending_sum: number
    total: number
}

export default Group