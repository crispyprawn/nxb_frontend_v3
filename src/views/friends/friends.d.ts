export interface Team {
    tid: number
    time: number
    name: string
    description: string
    members: TeamMember[]
    max_members: number
    is_in: boolean
}
export interface TeamMember {
    nickname: string
    gender: number
    sexual_orientation: number
    personal_info: string
    join_time: number
}
