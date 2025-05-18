
export type customString = string[];

export type extractType = `username` | `tag` | `number` | `date` | `keywords` | `normal`;

export interface ExtractObject {
    type: extractType;
    stractBy: string
}

export interface ExtractObjectFicha {
    type: extractType;
    stractBy: string;
    label: string
}

export interface TableHeaderType {
    label: customString;
} 

export interface TableBodyType {
    label: any[];
    extract: (ExtractObject | string)[];
    cols?: any; 
} 

export interface ActionSelect {
    label: string;
    ico?: string;
    value?: `create` | `update` | `delete` | `unique`;
    use: `pag` | `modal`
}


export type FnChangeSelect = (action: `create` | `update` | `delete` | `unique`, use: `pag` | `modal`) => void

