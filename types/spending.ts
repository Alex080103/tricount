import type { Category, Group, User } from "@/types"

type Spending = {
    id: number
    spender: User
    group: Group
    category?: Category
    value: number
    label: string
}

export default Spending