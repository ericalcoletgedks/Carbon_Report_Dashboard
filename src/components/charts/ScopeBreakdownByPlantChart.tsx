import { Layers } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "./../ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig, } from "./../ui/chart"
import { useCsvData } from "../../context/CsvContext"
import { formatCompactNumber } from "../../utils/utils"
import type { ChartMeta } from "../../types"

export const meta: ChartMeta = {
    id: "scope-breakdown-by-plant",
    title: "3. Scope Breakdown by Plant",
    short: "Scope mix per plant",
    description: "The stacked bar chart disaggregates each plant's total emissions by scope, allowing a direct comparison of the Scope 1, Scope 2, and Scope 3 profiles across facilities. All three sites follow a broadly consistent pattern, with Scope 3 dominating in each case. \n \n Differences in the Scope 2 contribution across sites reflect varying grid emission factors and local energy sourcing conditions. Scope 1 contributions remain low and stable across all facilities, confirming that direct fuel use is not a structurally significant driver of emissions at any of the three plants.",
    group: "global",
}

const chartConfig = {
    scope1: {
        label: "Scope 1",
        color: "var(--color-pink)",
    },
    scope2: {
        label: "Scope 2",
        color: "var(--color-orange)",
    },
    scope3: {
        label: "Scope 3",
        color: "var(--color-coral)",
    },
} satisfies ChartConfig

export function ScopeBreakdownByPlantChart() {

    const { rows } = useCsvData();

    const chartData = rows.filter(row => row.entity !== "Total empresa").map(row => ({
        entity: row.entity.replace("Planta ", ""),
        scope1: row.total_scope_1,
        scope2: row.total_scope_2,
        scope3: row.total_scope_3,
    }))

    if (!rows.length) return

    return (
        <Card className="h-full flex flex-col shadow-md hover:shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle> { meta.title } </CardTitle>
                <CardDescription> { meta.short } </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="entity"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} formatter={(value, label) => [`${label} - ${formatCompactNumber(Number(value))}`]} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="scope1"
                            stackId="a"
                            fill="var(--color-scope1)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="scope2"
                            stackId="a"
                            fill="var(--color-scope2)"
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="scope3"
                            stackId="a"
                            fill="var(--color-scope3)"
                            radius={[4, 4, 0, 0]}
                        >
                            <LabelList
                                position="top"
                                offset={5}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(value) => formatCompactNumber(Number(value))}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Scope 3 is the largest contributor at every site. <Layers className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Scope 2 varies according to each plant's energy supply.
                </div>
            </CardFooter>
        </Card>
    )
}
