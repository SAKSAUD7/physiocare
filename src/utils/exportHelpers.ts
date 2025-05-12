/**
 * Export Utilities
 * A collection of utility functions to help with data export operations
 */

/**
 * Creates a formatted CSV string from an array of objects
 * @param data The array of objects to format as CSV
 * @param fields The fields to include in the CSV
 * @returns A CSV string
 */
export function formatDataToCsv(data: any[], fields: string[]): string {
  // Create header row
  const header = fields.join(',');
  
  // Create data rows
  const rows = data.map(item => {
    return fields.map(field => {
      const value = item[field]?.toString() || '';
      // Escape quotes and wrap in quotes if contains comma or newline
      if (value.includes(',') || value.includes('\n') || value.includes('"')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',');
  });
  
  // Combine header and rows
  return [header, ...rows].join('\n');
}

/**
 * Downloads a CSV file in the browser
 * @param data The CSV content
 * @param filename The name of the file to download
 */
export function downloadCsvFile(data: string, filename: string): void {
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Formats data for WhatsApp sharing
 * @param data The data to format for WhatsApp
 * @param title The title of the data
 * @returns A formatted string for WhatsApp sharing
 */
export function formatDataForWhatsApp(data: any[], title: string): string {
  const header = `*${title}*\n\n`;
  
  const rows = data.map(item => {
    const entries = Object.entries(item)
      .filter(([key]) => key !== 'id' && key !== 'createdAt')
      .map(([key, value]) => `*${key}*: ${value}`)
      .join('\n');
    
    return entries + '\n--------';
  }).join('\n\n');
  
  return header + rows;
}

/**
 * Creates a Google Sheets URL with pre-populated data
 * Note: This is a simplified version. In production, you would use the Google Sheets API
 * @param data The data to export to Google Sheets
 * @param title The title for the sheet
 * @returns A URL to create a new Google Sheet with the data
 */
export function createGoogleSheetsUrl(data: any[], fields: string[]): string {
  // Format data for the URL
  const header = fields.join(',');
  const rows = data.map(item => {
    return fields.map(field => item[field] || '').join(',');
  }).join('\n');
  
  const csvContent = `${header}\n${rows}`;
  const encodedContent = encodeURIComponent(csvContent);
  
  // This is a simplified approach - in production, use the Google Sheets API
  return `https://docs.google.com/spreadsheets/create?title=PhysioCare_Export&content=${encodedContent}`;
}

/**
 * Creates a mailto link with data in the email body
 * @param data The data to include in the email
 * @param subject The email subject
 * @returns A mailto URL
 */
export function createEmailLink(data: any[], subject: string): string {
  // Format data for email body
  const body = data.map(item => {
    return Object.entries(item)
      .filter(([key]) => key !== 'id' && key !== 'createdAt')
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }).join('\n\n---\n\n');
  
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
} 