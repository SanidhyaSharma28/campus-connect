import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

// Helper function to format date as "3rd December 2024"
const formatDate = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('default', { month: 'long' });
  const year = d.getFullYear();
  const suffix = ['st', 'nd', 'rd'][((day + 90) % 100 - 10) % 10 - 1] || 'th'; // Handles suffixes like 'st', 'nd'
  return `${day}${suffix} ${month} ${year}`;
};

export const DownloadEventsExcel = ({ events }: { events: any[] }) => {
  const handleDownloadExcel = () => {
    // Prepare data for the Excel sheet
    const formattedEvents = events.map((event, index) => ({
      "Company": event.company,
      "Process": event.Process,
      "Mode": event.Mode,
      "Date": formatDate(event.date),  // Use the formatted date
      "Timings": event.Timings,
      "SPOC": event.SPOC,
      "Type": event.For
    }));

    // Create a new worksheet from the formatted data
    const ws = XLSX.utils.json_to_sheet(formattedEvents);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Events Report");

    // Write the Excel file to a Blob and trigger download
    const excelFile = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelFile], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Save the Excel file
    saveAs(blob, "events-report.xlsx");
  };

  return (
    <button
      onClick={handleDownloadExcel}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 m-2"
    >
      Download Excel
    </button>
  );
};
