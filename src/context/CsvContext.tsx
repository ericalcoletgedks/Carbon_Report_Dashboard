import { createContext, useContext, useState } from "react"
import type { OcfReport } from "../types/ocf"

interface CsvContextType {
    rows: OcfReport[]
    setRows: (rows: OcfReport[]) => void
}

const CsvContext = createContext<CsvContextType | null>(null)

export const CsvProvider = ({ children }: { children: React.ReactNode }) => {

    const [rows, setRows] = useState<OcfReport[]>([])

    return (
        <CsvContext.Provider value={{ rows, setRows }}>
            {children}
        </CsvContext.Provider>
    )
}

export const useCsvData = () => {
    const ctx = useContext(CsvContext)
    if (!ctx) throw new Error("useCsvData must be used inside CsvProvider")
    return ctx
}