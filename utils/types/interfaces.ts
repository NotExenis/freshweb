export interface session {
    id: number,
    name: string,
    expires_at: Date,
}

export interface users {
    id: number,
    name: string,
    email: string,
    password: string,
}