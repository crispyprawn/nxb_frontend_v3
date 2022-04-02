export interface PostParamsInDetail {
    id: number
    cat_name: string
    cat_url: string
    time: number
    content: string
    comments: Comment[]
    tags: string[]
    views: number
    hot_spot_index: number
    subscriptions: number
    most_dislike_type: string
    most_dislike_count: number
    like: number
    dislike: number
    is_liked: boolean
    is_disliked: boolean
    is_subscribed: boolean
}
export interface PostParamsInBrief {
    id: number
    cat_name: string
    cat_url: string
    time: number
    content: string
    comments: number
    hot_comments: HotComment[]
    most_dislike_type: string
    most_dislike_count: number
    like: number
    dislike: number
    is_liked: boolean
    is_disliked: boolean
}
export interface Comment {
    rpid: number
    root: number
    parent: number
    time: number
    message: string
    signature: string
    like: number
    report: number
}
export interface HotComment {
    rpid: number
    time: number
    message: string
    signature: string
    like: number
}
export interface SearchHotSpot {
    topic: string
    hot_spot_index: number
}
export interface District {
    id: number
    name: string
}
