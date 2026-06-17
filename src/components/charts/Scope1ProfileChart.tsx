import { Flame } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./../ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./../ui/chart"
import { useCsvData } from "../../context/CsvContext"
import { formatCompactNumber } from "../../utils/utils"
import type { ChartMeta } from "../../types"

export const meta: ChartMeta = {
    id: "scope-1-emissions-profile-by-plant",
    title: "4. Scope 1 Emissions Profile by Plant",
    short: "Scope 1 sources per plant",
    description: "The chart presents the distribution of direct Scope 1 emissions across the three production facilities, broken down by emission source: stationary combustion, mobile combustion, process emissions, and fugitive emissions including refrigerant gases. \n \n Stationary combustion, associated with the use of natural gas and other fuels for production and heating, represents the dominant source of Scope 1 emissions across all sites. Mobile combustion from company vehicles and internal logistics equipment contributes a smaller but consistent share at each facility. \n \n Process emissions and fugitive releases from refrigerant gases account for a minor proportion of total Scope 1 emissions, though their presence underlines the importance of monitoring these sources given the high global warming potential of certain refrigerant substances. Overall, Scope 1 emissions remain a limited component of the total organisational footprint across all three plants.",
    group: "scope1",
}

export function Scope1ProfileChart() {

    const { rows } = useCsvData();
    const filteredRows = rows.filter(row => row.entity !== "Total empresa")

    const chartConfig = filteredRows.reduce((acc, row, index) => {
        acc[row.entity] = {
            label: row.entity.replace("Planta ", ""),
            color: `var(--color-chart-${index})`,
        }

        return acc
    }, {} as ChartConfig)

    const categories = [
        {
            label: "Stationary",
            key: "scope_1_1_stationary_combustion",
        },
        {
            label: "Mobile",
            key: "scope_1_2_mobile_combustion",
        },
        {
            label: "Process",
            key: "scope_1_3_process_emissions",
        },
        {
            label: "Refrigerants",
            key: "scope_1_4_1_refrigerant_gases",
        },
        {
            label: "Fire",
            key: "scope_1_4_2_fire_extinguishers",
        },
        {
            label: "Total",
            key: "total_scope_1",
        },
    ] as const

    const chartData = categories.map(category => ({
        category: category.label,

        ...filteredRows.reduce((acc, row) => {
            acc[row.entity] = row[category.key]
            return acc
        }, {} as Record<string, number>)
    }))

    if (!rows.length) return

    return (
        <Card className="h-full flex flex-col shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="items-center pb-4">
                <CardTitle> {meta.title} </CardTitle>
                <CardDescription>
                    {meta.short}
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0 flex-1">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-62.5"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                            formatter={(value, label) => [`${label}: ${formatCompactNumber(Number(value))}`]}
                        />
                        <PolarAngleAxis dataKey="category" />
                        <PolarGrid radialLines={false} />
                        {filteredRows.map((row, index) => (
                            <Radar
                                key={row.entity}
                                dataKey={row.entity}
                                fill={`var(--color-chart-${index})`}
                                stroke={`var(--color-chart-${index})`}
                                fillOpacity={0}
                                strokeWidth={2}
                            />
                        ))}
                        <ChartLegend className="mt-8" content={<ChartLegendContent />} />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Stationary combustion is the main Scope 1 source. <Flame className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Direct emissions represent a small share of the total footprint.
                </div>
            </CardFooter>
        </Card>
    )
}
