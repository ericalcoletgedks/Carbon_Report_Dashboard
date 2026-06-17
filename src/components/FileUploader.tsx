import { formatBytes, useFileUpload } from "../hooks/use-file-upload"
import { Alert, AlertDescription, AlertTitle } from "./reui/alert"
import { cn } from "../lib/utils" 
import { Button } from "./ui/button" 
import { CircleAlertIcon, FileSpreadsheetIcon, UploadIcon, XIcon } from "lucide-react"
import { useCsvData } from "../context/CsvContext"

interface CsvUploaderProps {
    onFileSelect?: (file: File) => void
    className?: string
}

export function FileUploader({ onFileSelect, className }: CsvUploaderProps) {

    const { setRows, rows } = useCsvData();

    const [
        { isDragging, errors, files },
        {
            removeFile,
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            getInputProps,
        },
    ] = useFileUpload({
        maxFiles: 1,
        multiple: false,
        accept: ".csv,text/csv",
        onFilesChange: (newFiles) => {
            const file = newFiles[0]?.file
            if (file instanceof File) {
                onFileSelect?.(file)
            }
        },
    })

    const file = files[0]

    return (
        <div className={cn("max-w-md m-auto my-6", className)}>
            {!file ? (
                <div
                    className={cn(
                        "rounded-lg relative border border-dashed p-8 text-center transition-colors cursor-pointer",
                        isDragging
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-muted-foreground/50"
                    )}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={openFileDialog}
                >
                    <input {...getInputProps()} className="sr-only" />

                    <div className="flex flex-col items-center gap-3">
                        <div
                            className={cn(
                                "flex h-12 w-12 items-center justify-center rounded-full",
                                isDragging ? "bg-primary/10" : "bg-muted"
                            )}
                        >
                            <UploadIcon
                                className={cn("h-5 w-5", isDragging ? "text-primary" : "text-muted-foreground")}
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium">Upload your CSV file</p>
                            <p className="text-muted-foreground text-xs">
                                Drag and drop or click to browse
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`${rows.length > 0 && "fixed bottom-0 left-0 m-6" }  z-50 xl:w-md backdrop-blur-2xl border-border bg-card/60 rounded-lg border p-2.5`}>
                    <div className="flex items-center gap-2.5">
                        <div className="border-border text-muted-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
                            <FileSpreadsheetIcon className="size-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{file.file.name}</p>
                            <p className="text-muted-foreground text-xs">
                                {formatBytes(file.file.size)}
                            </p>
                        </div>

                        <Button
                            onClick={() => {
                                removeFile(file.id)
                                setRows([])
                            }}
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground size-6 hover:bg-transparent hover:opacity-100"
                        >
                            <XIcon className="size-4" />
                        </Button>
                    </div>
                </div>
            )}

            {errors.length > 0 && (
                <Alert variant="destructive" className="mt-3 max-w-md">
                    <CircleAlertIcon />
                    <AlertTitle>File upload error</AlertTitle>
                    <AlertDescription>
                        {errors.map((error, index) => (
                            <p key={index} className="last:mb-0">
                                {error}
                            </p>
                        ))}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
}