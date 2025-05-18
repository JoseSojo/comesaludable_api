import { ExtractObject } from "./extract.interface";

export interface CardDashboard {
    count: string | number;
    label: string;
    ico: string;
    content?: string
    color?: `primary` | `secondary` | `info` | `warning` | `error`
}

export interface TablesDataDashboard {
    options?: {
        label: string,
        path: string,
        ico: string,
    }[],
    label: string,
    header: string[],
    extract: (string | ExtractObject)[],
    body: any[],
    pagination?: { total: number, now: number, next: boolean, prev: boolean }
}

export interface GraphicStaticticsDashboard {
    label: string;
    path: string;
} 

export interface GraphicStaticticsDataDashboard {
    
}
