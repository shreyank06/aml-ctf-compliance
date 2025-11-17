"use client";

import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface PDFExportProps {
  documentData: any;
  fileName: string;
}

export function PDFExport({ documentData, fileName }: PDFExportProps) {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(documentData.title, margin, yPosition);
    yPosition += 10;

    // Company details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Company: ${documentData.companyName}`, margin, yPosition);
    yPosition += 7;
    doc.text(`ABN: ${documentData.abn}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Generated: ${documentData.generatedDate}`, margin, yPosition);
    yPosition += 15;

    // Risk level if present
    if (documentData.riskLevel) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(
        documentData.riskColor === "#22c55e"
          ? 34
          : documentData.riskColor === "#f59e0b"
          ? 245
          : documentData.riskColor === "#ef4444"
          ? 239
          : 153,
        documentData.riskColor === "#22c55e"
          ? 197
          : documentData.riskColor === "#f59e0b"
          ? 158
          : documentData.riskColor === "#ef4444"
          ? 68
          : 27,
        documentData.riskColor === "#22c55e"
          ? 94
          : documentData.riskColor === "#f59e0b"
          ? 11
          : documentData.riskColor === "#ef4444"
          ? 68
          : 27
      );
      doc.text(
        `Risk Level: ${documentData.riskLevel} (Score: ${documentData.totalScore}/100)`,
        margin,
        yPosition
      );
      doc.setTextColor(0, 0, 0);
      yPosition += 15;
    }

    // Sections
    documentData.sections.forEach((section: any) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin;
      }

      // Section heading
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      const headingLines = doc.splitTextToSize(section.heading, maxWidth);
      doc.text(headingLines, margin, yPosition);
      yPosition += headingLines.length * 7 + 3;

      // Section content
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const contentLines = doc.splitTextToSize(section.content, maxWidth);

      contentLines.forEach((line: string) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += 6;
      });

      yPosition += 10;
    });

    // Save the PDF
    doc.save(`${fileName}.pdf`);
  };

  return (
    <Button onClick={generatePDF} variant="default">
      Download PDF
    </Button>
  );
}
