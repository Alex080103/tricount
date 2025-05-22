import type { Category, Group, User } from "@/types"

type Spending = {
    id: number
    spender: User
    Group: Group
    category?: Category
    value: number
    label: string
}

export default Spending