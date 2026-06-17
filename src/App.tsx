
import { useRef, useState } from "react"
import { toPng } from "html-to-image"
import { generatePdf } from "./pdf/generatePdf"
import type { PdfSection } from "./types"
import { reportSections } from "./data/reportData"
import { FileUploader } from "./components/FileUploader"
import { useCsvParser } from "./hooks/useCsvParser"
import { ProgressBar } from "./components/ProgressBar"
import { ErrorAlert } from "./components/ErrorAlert"
import { Button } from "./components/ui/button"
import { Download, File, LoaderCircleIcon } from "lucide-react"
import { useCsvData } from "./context/CsvContext"
import { EmissionsBreakdownTable } from "./components/EmissionsBreakdownTable"
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"

function App() {

  const chartRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const { parseFile, isLoading, error } = useCsvParser();
  const { rows, setRows } = useCsvData();
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);

  const exportPDF = async () => {

    setPdfLoading(true)

    const sections: PdfSection[] = []

    for (const section of reportSections) {
      const node = chartRefs.current[section.id]
      if (!node) continue

      const image = await toPng(node)

      sections.push({
        title: section.title,
        description: section.description,
        image,
      })
    }

    generatePdf(sections)
    setPdfLoading(false)

  }

  return (
    <>
      <div className="p-6 pt-0 xl:max-w-7xl m-auto">

        <Header />


        <div className="max-w-md m-auto mt-40 text-sm text-center">
          <div className="text-2xl font-medium">Carbon Footprint Report Generator</div>
          <div className="text-muted-foreground mt-2">
            Upload your OCF ISO 14064 organizational carbon footprint data and generate an interactive report with charts and PDF export.
          </div>
        </div>



        <FileUploader className="mt-6" onFileSelect={parseFile} />

        {isLoading && !error && (
          <ProgressBar />
        )}

        {error && (
          <ErrorAlert error={error} />
        )}

        {rows.length !== 0 && (
          <>
            <div className="flex  items-center gap-2 relative z-20 justify-between px-2 py-3">
              <div className="flex flex-col gap-1.5">
                <div className="leading-none font-medium">
                  Emissions Overview
                </div>
                <div className="text-muted-foreground text-sm">
                  Plant-level breakdown and Scope distribution insights
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button className="hidden sm:flex" onClick={() => setRows([])} variant={"outline"} disabled={rows.length === 0}> <File /> Clear </Button>
                <Button onClick={exportPDF} disabled={rows.length === 0}>  {pdfLoading ? (<LoaderCircleIcon className="animate-spin" />) : (<Download />)} Generate PDF </Button>
              </div>
            </div>

            <div className="grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10">

              {reportSections.map(({ id, component: ChartComponent }) => (
                <div className="h-full" key={id} ref={(el) => { chartRefs.current[id] = el }}>
                  <ChartComponent />
                </div>
              ))}

            </div>

            <EmissionsBreakdownTable />

            <Footer />
          </>
        )}

      </div>
    </>
  )
}

export default App
