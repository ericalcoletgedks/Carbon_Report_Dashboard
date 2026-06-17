import Papa from "papaparse";

export function parseCsv<T>(file: File): Promise<T[]> {
    return new Promise((resolve, reject) => {
        Papa.parse<T>(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: reject,
        });
    });
}