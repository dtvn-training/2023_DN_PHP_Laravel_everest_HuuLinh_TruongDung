import { toast } from "react-toastify";
import api from "../api/axios";

const DownloadCSVButton = () => {
  const convertToCSV = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  const downloadCSV = async () => {
    try {
      const result = await api.get("api/user/get?page=1");
      const csvData = convertToCSV(result.data[0].data);
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "data.csv";
      link.href = url;
      link.click();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return <button onClick={downloadCSV}>Export CSV</button>;
};

export default DownloadCSVButton;
