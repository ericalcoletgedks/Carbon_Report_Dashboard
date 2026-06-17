import { useState } from "react";
import type { OcfReport } from "../types/ocf";
import { parseCsv } from "../lib/parseCsv";
import { useCsvData } from "../context/CsvContext";

type CsvRow = Record<string, string>;

export const useCsvParser = () => {

    const { setRows } = useCsvData();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const requiredFields: (keyof OcfReport)[] = [
        "entity",
        "total_emissions",
        "total_scope_1",
        "total_scope_2",
        "total_scope_3",
        "scope_1_1_stationary_combustion",
        "scope_1_2_mobile_combustion",
        "scope_1_3_process_emissions",
        "scope_1_4_1_refrigerant_gases",
        "scope_1_4_2_fire_extinguishers",
        "scope_2_1_1_purchased_electricity",
        "scope_2_1_2_purchased_heat_or_steam",
        "scope_3_1_1_raw_materials_or_auxiliary_materials",
        "scope_3_1_2_water_consumption",
        "scope_3_1_3_services",
        "scope_3_2_capital_fixed_assets",
        "scope_3_3_fuel_and_energy_related_activities",
        "scope_3_4_upstream_transport_and_distribution",
        "scope_3_5_waste_generated_in_operations",
        "scope_3_6_business_travel",
        "scope_3_7_employee_commuting",
        "scope_3_8_upstream_leased_assets",
        "scope_3_9_downstream_transport_and_distribution",
        "scope_3_10_processing_of_sold_products",
        "scope_3_11_use_of_sold_products",
        "scope_3_12_end_of_life_treatment_of_sold_products",
        "scope_3_13_downstream_leased_assets",
        "scope_3_14_franchises",
        "scope_3_15_investments"
    ];

    const parseFile = async (file: File) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await parseCsv<CsvRow>(file);
            data.forEach(validateRow);
            const normalizedData = data.map(normalizeRow);
            setRows(normalizedData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to parse CSV file");
        } finally {
            setIsLoading(false);
        }
    };

    function validateRow(row: CsvRow): void {
        for (const field of requiredFields) {
            if (!(field in row)) {
                throw new Error(`Missing column: ${field}`);
            }
        }
    }


    function normalizeRow(row: CsvRow): OcfReport {
        return {
            entity: row.entity,

            total_emissions: Number(row.total_emissions),

            total_scope_1: Number(row.total_scope_1),
            total_scope_2: Number(row.total_scope_2),
            total_scope_3: Number(row.total_scope_3),
            scope_1_1_stationary_combustion: Number(row.scope_1_1_stationary_combustion),
            scope_1_2_mobile_combustion: Number(row.scope_1_2_mobile_combustion),
            scope_1_3_process_emissions: Number(row.scope_1_3_process_emissions),
            scope_1_4_1_refrigerant_gases: Number(row.scope_1_4_1_refrigerant_gases),
            scope_1_4_2_fire_extinguishers: Number(row.scope_1_4_2_fire_extinguishers),
            scope_2_1_1_purchased_electricity: Number(row.scope_2_1_1_purchased_electricity),
            scope_2_1_2_purchased_heat_or_steam: Number(row.scope_2_1_2_purchased_heat_or_steam),
            scope_3_1_1_raw_materials_or_auxiliary_materials: Number(row.scope_3_1_1_raw_materials_or_auxiliary_materials),
            scope_3_1_2_water_consumption: Number(row.scope_3_1_2_water_consumption),
            scope_3_1_3_services: Number(row.scope_3_1_3_services),
            scope_3_2_capital_fixed_assets: Number(row.scope_3_2_capital_fixed_assets),
            scope_3_3_fuel_and_energy_related_activities: Number(row.scope_3_3_fuel_and_energy_related_activities),
            scope_3_4_upstream_transport_and_distribution: Number(row.scope_3_4_upstream_transport_and_distribution),
            scope_3_5_waste_generated_in_operations: Number(row.scope_3_5_waste_generated_in_operations),
            scope_3_6_business_travel: Number(row.scope_3_6_business_travel),
            scope_3_7_employee_commuting: Number(row.scope_3_7_employee_commuting),
            scope_3_8_upstream_leased_assets: Number(row.scope_3_8_upstream_leased_assets),
            scope_3_9_downstream_transport_and_distribution: Number(row.scope_3_9_downstream_transport_and_distribution),
            scope_3_10_processing_of_sold_products: Number(row.scope_3_10_processing_of_sold_products),
            scope_3_11_use_of_sold_products: Number(row.scope_3_11_use_of_sold_products),
            scope_3_12_end_of_life_treatment_of_sold_products: Number(row.scope_3_12_end_of_life_treatment_of_sold_products),
            scope_3_13_downstream_leased_assets: Number(row.scope_3_13_downstream_leased_assets),
            scope_3_14_franchises: Number(row.scope_3_14_franchises),
            scope_3_15_investments: Number(row.scope_3_15_investments),
        };
    }

    return {
        parseFile,
        isLoading,
        error,
    };
};