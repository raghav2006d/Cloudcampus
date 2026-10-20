export type MetricComplaint = { category:string; status:string }
export const categories: string[]
export function stats(items:MetricComplaint[]): { total:number; pending:number; progress:number; resolved:number }
export function statusData(items:MetricComplaint[]): { name:string; value:number }[]
export function categoryData(items:MetricComplaint[]): { name:string; count:number }[]
export function averageResolution(items:(MetricComplaint & { createdAt?:Date|string|number; resolvedAt?:Date|string|number })[]): string
