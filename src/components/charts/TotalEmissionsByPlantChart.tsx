import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "./../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig, } from "./../ui/chart"
import { useCsvData } from "../../context/CsvContext"
import { formatCompactNumber } from "../../utils/utils"
import type { ChartMeta } from "../../types"

export const meta: ChartMeta = {
    id: "total-emissions-by-plant",
    title: "1. Total Emissions by Plant",
    short: "Total emissions per plant",
    description: "The chart below presents the total greenhouse gas emissions recorded for each production facility during the reporting period, expressed in tonnes of CO2 equivalent (tCO2e). Planta Valencia registers the highest absolute emissions, followed closely by Planta Sevilla, while Planta Barcelona contributes the smallest share of the three sites. \n \n These differences reflect variations in production volume, energy mix, and operational intensity across facilities. The comparison provides a reference point for identifying which sites carry the greatest weight in the organisation's overall carbon profile and where targeted reduction efforts may have the most significant impact.",
    group: "global",
}

export const TotalEmissionsByPlantChart = () => {

    const { rows } = useCsvData();

    const chartData = rows.filter(row => row.entity !== "Total empresa").map((row, key) => ({
        entity: row.entity,
        emissions: row.total_emissions,
        fill: `var(--color-chart-${key})`
    }))

    const chartConfig = {
        emissions: {
            label: "Emissions",
        },
        ...chartData.reduce((acc, data, key) => {
            acc[data.entity] = {
                label: data.entity.replace("Planta ", ""),
                color: `var(--color-chart-${key})`,
            }

            return acc
        }, {} as ChartConfig),
    } satisfies ChartConfig

    if (!rows.length) return

    return (
        <Card className="h-full flex flex-col shadow-md hover:shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle> {meta.title} </CardTitle>
                <CardDescription> {meta.short} </CardDescription>
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
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel formatter={(value) => ["Emissions: ", formatCompactNumber(Number(value)),]} />}
                        />
                        <Bar dataKey="emissions" strokeWidth={2} radius={8}>
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
                    Valencia is the highest emitting site. <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Emissions differ across plants due to production and energy use.
                </div>
            </CardFooter>
        </Card>
    )
}
