import { PieChart, Pie, LabelList } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { PieChartIcon } from "lucide-react"
import { useCsvData } from "../../context/CsvContext"
import { formatCompactNumber } from "../../utils/utils"
import type { ChartMeta } from "../../types"

export const meta: ChartMeta = {
    id: "emissions-distribution-by-scope",
    title: "2. Emissions Distribution by Scope",
    short: "Share of emissions by scope",
    description: "The donut chart illustrates the relative contribution of each scope to the organisation's total footprint. Scope 3 indirect emissions represent the dominant component, accounting for the vast majority of total organisational emissions. This pattern is consistent with manufacturing companies that rely on complex supply chains, where upstream material sourcing and downstream product distribution generate significantly more impact than direct operational activity. \n \n Scope 2 emissions, arising from purchased electricity, represent a secondary but meaningful share. Scope 1 direct emissions from fuel combustion and company vehicles remain marginal in relative terms.",
    group: "global",
}

const chartConfig = {
    value: {
        label: "Emissions",
    },
    scope1: {
        label: "Scope 1",
        color: "var(--chart-1)",
    },
    scope2: {
        label: "Scope 2",
        color: "var(--chart-2)",
    },
    scope3: {
        label: "Scope 3",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig


export function EmissionsByScopeChart() {

    const { rows } = useCsvData();

    const totalRow = rows.find(row => row.entity === "Total empresa");

    const chartData = totalRow ? [
        { name: "scope1", value: totalRow.total_scope_1, fill: "var(--color-chart-0)" },
        { name: "scope2", value: totalRow.total_scope_2, fill: "var(--color-chart-1)" },
        { name: "scope3", value: totalRow.total_scope_3, fill: "var(--color-chart-2)" },
    ] : [];

    if (!rows.length) return

    return (
        <Card className="h-full flex flex-col shadow-md hover:shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle> {meta.title} </CardTitle>
                <CardDescription> {meta.short} </CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex-1">
                <ChartContainer config={chartConfig}>
                    <PieChart>
                        <ChartLegend content={<ChartLegendContent />} />
                        <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => (formatCompactNumber(Number(value)))} />
                        <Pie data={chartData} dataKey="value" nameKey="name">
                            <LabelList
                                dataKey="value"
                                position="inside"
                                formatter={(value) => formatCompactNumber(Number(value))}
                                className="fill-white text-xs font-medium"
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Scope 3 accounts for most emissions. <PieChartIcon className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Indirect value chain activities drive the overall footprint.
                </div>
            </CardFooter>
        </Card>
    )
}