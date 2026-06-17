import { Zap } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "./../ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./../ui/chart"
import { useCsvData } from "../../context/CsvContext"
import { formatCompactNumber } from "../../utils/utils"
import type { ChartMeta } from "../../types"

export const meta: ChartMeta = {
    id: "scope-2-emissions-profile-by-plant",
    title: "5. Scope 2 Emissions Profile by Plant",
    short: "Electricity vs heat by plant",
    description: "The chart presents the distribution of Scope 2 emissions across the three production facilities, broken down by source: purchased electricity and purchased heat or steam. Planta Barcelona shows the highest reliance on purchased heat and steam, which represents the larger share of its indirect energy-related emissions. Planta Sevilla, by contrast, shows a higher proportion of emissions linked to purchased electricity than the other two sites. Planta Valencia presents a more balanced split between the two sources. These differences reflect variations in the energy mix, production processes, and heating requirements of each facility. Overall, Scope 2 emissions remain closely tied to each site's energy procurement strategy, highlighting opportunities to reduce indirect emissions through renewable electricity contracts and lower-carbon heat sources.",
    group: "scope2",
}

const chartConfig = {
    electricity: {
        label: "Electricity",
        color: "var(--chart-pink)",
    },
    steamOrHeat: {
        label: "Heat / Steam",
        color: "var(--chart-coral)",
    },
} satisfies ChartConfig

export function Scope2ProfileChart() {

    const { rows } = useCsvData();

    const chartData = rows.filter(row => row.entity !== "Total empresa").map(row => ({
        entity: row.entity.replace("Planta ", ""),
        electricity: row.scope_2_1_1_purchased_electricity,
        steamOrHeat: row.scope_2_1_2_purchased_heat_or_steam,
    }))

    if (!rows.length) return

    return (
        <Card className="h-full flex flex-col shadow-md hover:shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle> { meta.title } </CardTitle>
                <CardDescription> { meta.short } </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 content-center">
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="entity"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                            formatter={(value, label) => ([`${label}: ${formatCompactNumber(Number(value))}`])}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="electricity" fill="var(--color-pink)" radius={4}>
                            <LabelList
                                position="center"
                                offset={5}
                                className="fill-white"
                                fontSize={12}
                                formatter={(value) => formatCompactNumber(Number(value))}
                            />
                        </Bar>
                        <Bar dataKey="steamOrHeat" fill="var(--color-coral)" radius={4}>
                            <LabelList
                                position="center"
                                offset={5}
                                className="fill-white"
                                fontSize={12}
                                formatter={(value) => formatCompactNumber(Number(value))}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Electricity consumption drives Scope 2 emissions. <Zap className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Energy sourcing strongly influences each plant's profile.
                </div>
            </CardFooter>
        </Card>
    )
}
