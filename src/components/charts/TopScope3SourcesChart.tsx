import { ChartBar } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./../ui/chart"
import { useCsvData } from "../../context/CsvContext"
import { formatCompactNumber } from "../../utils/utils"
import type { ChartMeta } from "../../types"

export const meta: ChartMeta = {
    id: "top-scope-3-emission-sources",
    title: "6. Top Scope 3 Emission Sources",
    short: "Largest Scope 3 categories",
    description: "The horizontal bar chart ranks all Scope 3 sub-categories by their absolute contribution to the total organisational footprint. Purchased raw materials and auxiliary materials (S3.1) stands out as the single largest source of emissions across the value chain, driven by the carbon intensity of the materials used in production processes. \n \n End-of-life treatment of sold products (S3.12), downstream transport and distribution (S3.9), and capital goods (S3.2) follow as the next most significant categories. Together, these four sources account for the majority of all Scope 3 emissions, confirming that the organisation's climate impact is predominantly concentrated in upstream material flows and downstream product handling. \n \n The remaining categories — including employee commuting, upstream transport, fuel- and energy-related activities, business travel, and waste generated in operations — contribute smaller but nonetheless relevant shares that complete a transparent and comprehensive picture of the company's total value chain impact.",
    group: "scope3",
}

const chartConfig = {
    emissions: {
        label: "Emissions",
        color: "var(--color-coral)",
    },
    label: {
        color: "var(--background)",
    },
} satisfies ChartConfig

export function TopScope3SourcesChart() {

    const { rows } = useCsvData();

    const totalCompany = rows.find(row => row.entity === "Total empresa");

    const chartData = [
        {
            source: "Raw materials",
            emissions: totalCompany?.scope_3_1_1_raw_materials_or_auxiliary_materials ?? 0,
        },
        {
            source: "Use of sold products",
            emissions: totalCompany?.scope_3_11_use_of_sold_products ?? 0,
        },
        {
            source: "Business travel",
            emissions: totalCompany?.scope_3_6_business_travel ?? 0,
        },
        {
            source: "Upstream transport",
            emissions: totalCompany?.scope_3_4_upstream_transport_and_distribution ?? 0,
        },
        {
            source: "Employee commuting",
            emissions: totalCompany?.scope_3_7_employee_commuting ?? 0,
        }
    ].sort((a, b) => b.emissions - a.emissions)

    if (!rows.length) return

    return (
        <Card className="h-full flex flex-col shadow-md hover:shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle> { meta.title } </CardTitle>
                <CardDescription> { meta.short } </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 content-center">
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="source"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="emissions" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}

                        />
                        <Bar dataKey="emissions" fill="var(--color-coral)" radius={4}>
                            <LabelList
                                dataKey="source"
                                position="insideLeft"
                                offset={8}
                                className="fill-(--color-label)"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="emissions"
                                position="right"
                                offset={8}
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
                    Raw materials are the largest Scope 3 source. <ChartBar className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Transport and end-of-life activities are also significant.
                </div>
            </CardFooter>
        </Card>
    )
}
