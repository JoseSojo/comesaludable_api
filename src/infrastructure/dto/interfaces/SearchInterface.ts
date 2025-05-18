
export interface SearchInterface {
    label:string,
    value:string|number
}

export interface SearchResponseInterface {
    error?: boolean,
    message: string,
    body: SearchInterface[] | null
}
