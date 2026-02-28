/**
 * Downloads data as a CSV file
 *
 * Utility function that:
 * - Creates a downloadable Blob
 * - Triggers browser download
 * - Cleans up resources (URL.revokeObjectURL)
 *
 * @param data - The array data to download
 * @param filename - The filename for the downloaded CSV file (should include .csv extension)
 *
 */
export function downloadCSV(data: string, filename: string): void {
  // Create Blob and download URL
  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Create temporary anchor element for download
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.setAttribute("download", filename);

  // Trigger download
  document.body.appendChild(anchor);
  anchor.click();

  // Cleanup
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
