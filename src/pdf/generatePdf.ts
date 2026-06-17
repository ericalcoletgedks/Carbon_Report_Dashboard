import jsPDF from "jspdf";
import type { PdfSection } from "../types";

export async function generatePdf(sections: PdfSection[]) {

    const pdf = new jsPDF();
    let y = 80;
    const imgWidth = 60;
    const pageWidth = 210;
    const x = (pageWidth - imgWidth) / 2;

    pdf.setTextColor(28, 28, 28);

    pdf.setFontSize(18)
    pdf.text("Organizational Carbon Footprint Report", 105, y, { align: "center" })
    y += 10;

    pdf.setFontSize(14)
    pdf.text("ISO 14064", 105, y, { align: "center" })
    y += 10;

    pdf.addImage("/relats.png", "PNG", x, y, imgWidth, 20);
    y += 40;

    pdf.setFontSize(12)
    pdf.text("Prepared by Mappa", 105, y, { align: "center" })
    y += 10;

    pdf.addPage()

    // Sections

    for (const section of sections) {

        pdf.addImage("/relats.png", "PNG", 20, 20, 30, 10);

        y = 50

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14)
        pdf.text(section.title, 20, y)

        y += 10

        const lines = pdf.splitTextToSize(section.description, 215)

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12)
        pdf.text(lines, 20, y)

        y += lines.length * 6

        const imgWidth = 100
        const x = (210 - imgWidth) / 2

        pdf.addImage(section.image, "PNG", x, y, imgWidth, 100)

        pdf.addPage()
    }

    pdf.save("report.pdf");
}