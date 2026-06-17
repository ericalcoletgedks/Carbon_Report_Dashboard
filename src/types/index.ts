import type { ComponentType } from "react"

export type PdfSection = {
    title: string
    description: string
    image: string
}

export type ChartGroup = "global" | "scope1" | "scope2" | "scope3"

export interface ChartMeta {
    id: string
    title: string
    short: string
    description: string
    group: ChartGroup
}

export interface ReportSection extends ChartMeta {
    component: ComponentType
}