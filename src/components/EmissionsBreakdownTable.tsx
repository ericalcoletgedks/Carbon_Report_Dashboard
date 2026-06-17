
import { useMemo, useState } from "react"
import {
    type ColumnDef,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useCsvData } from "../context/CsvContext"
import { formatCompactNumber } from "../utils/utils"
import type { OcfReport } from "../types/ocf"
import { PlantSelector } from "./PlantSelector"

interface EmissionRow {
    category: string
    scope: string
    value: number
}

const EMISSION_CATEGORIES: { key: keyof OcfReport; label: string; scope: string }[] = [
    { key: "scope_1_1_stationary_combustion", label: "Stationary Combustion", scope: "Scope 1" },
    { key: "scope_1_2_mobile_combustion", label: "Mobile Combustion", scope: "Scope 1" },
    { key: "scope_1_3_process_emissions", label: "Process Emissions", scope: "Scope 1" },
    { key: "scope_1_4_1_refrigerant_gases", label: "Refrigerant Gases", scope: "Scope 1" },
    { key: "scope_1_4_2_fire_extinguishers", label: "Fire Extinguishers", scope: "Scope 1" },
    { key: "scope_2_1_1_purchased_electricity", label: "Purchased Electricity", scope: "Scope 2" },
    { key: "scope_2_1_2_purchased_heat_or_steam", label: "Purchased Heat / Steam", scope: "Scope 2" },
    { key: "scope_3_1_1_raw_materials_or_auxiliary_materials", label: "Raw Materials & Auxiliary Materials", scope: "Scope 3" },
    { key: "scope_3_1_2_water_consumption", label: "Water Consumption", scope: "Scope 3" },
    { key: "scope_3_1_3_services", label: "Services", scope: "Scope 3" },
    { key: "scope_3_2_capital_fixed_assets", label: "Capital Goods", scope: "Scope 3" },
    { key: "scope_3_3_fuel_and_energy_related_activities", label: "Fuel & Energy Related Activities", scope: "Scope 3" },
    { key: "scope_3_4_upstream_transport_and_distribution", label: "Upstream Transport & Distribution", scope: "Scope 3" },
    { key: "scope_3_5_waste_generated_in_operations", label: "Waste Generated in Operations", scope: "Scope 3" },
    { key: "scope_3_6_business_travel", label: "Business Travel", scope: "Scope 3" },
    { key: "scope_3_7_employee_commuting", label: "Employee Commuting", scope: "Scope 3" },
    { key: "scope_3_8_upstream_leased_assets", label: "Upstream Leased Assets", scope: "Scope 3" },
    { key: "scope_3_9_downstream_transport_and_distribution", label: "Downstream Transport & Distribution", scope: "Scope 3" },
    { key: "scope_3_10_processing_of_sold_products", label: "Processing of Sold Products", scope: "Scope 3" },
    { key: "scope_3_11_use_of_sold_products", label: "Use of Sold Products", scope: "Scope 3" },
    { key: "scope_3_12_end_of_life_treatment_of_sold_products", label: "End-of-Life Treatment of Sold Products", scope: "Scope 3" },
    { key: "scope_3_13_downstream_leased_assets", label: "Downstream Leased Assets", scope: "Scope 3" },
    { key: "scope_3_14_franchises", label: "Franchises", scope: "Scope 3" },
    { key: "scope_3_15_investments", label: "Investments", scope: "Scope 3" },
]

const columns: ColumnDef<EmissionRow>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="px-0"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Category
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "scope",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="px-0"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Scope
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "value",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="px-0"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Emissions (tCO2e)
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ getValue }) => (
            <div className="text-right font-mono"> {formatCompactNumber(getValue<number>())} </div>
        ),
    },
]

export function EmissionsBreakdownTable() {
    const { rows } = useCsvData()

    const [selectedEntity, setSelectedEntity] = useState<string>("Planta Barcelona")
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")

    const entities = useMemo(() => rows.map((row) => row.entity), [rows])

    const currentRow = useMemo(
        () => rows.find((row) => row.entity === selectedEntity) ?? rows[0],
        [rows, selectedEntity]
    )

    const data = useMemo<EmissionRow[]>(() => {
        if (!currentRow) return []

        return EMISSION_CATEGORIES.map(({ key, label, scope }) => ({
            category: label,
            scope,
            value: currentRow[key] as number,
        }))
    }, [currentRow])

    const table = useReactTable({
        data,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <Card className="shadow-md hover:shadow-xl transition-shadow mt-10 mb-20">
            <CardHeader>
                <CardTitle>Emissions Breakdown</CardTitle>
                <CardDescription>{currentRow?.entity ?? "No data"}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between gap-4 pb-4">
                    <Input
                        placeholder="Filter category..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="max-w-sm"
                    />

                    <PlantSelector
                        entities={entities}
                        selected={selectedEntity}
                        onSelect={setSelectedEntity}
                    />
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="text-muted-foreground pt-2 text-sm">
                    {table.getFilteredRowModel().rows.length} of {data.length} categories
                </div>
            </CardContent>
        </Card>
    )
}