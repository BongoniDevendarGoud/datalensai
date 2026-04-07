import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileSpreadsheet } from "lucide-react";
import Papa from "papaparse";

interface FileUploadProps {
  onDataLoaded: (data: {
    name: string;
    rows: Record<string, any>[];
    columns: string[];
  }) => void;
}

const FileUpload = ({ onDataLoaded }: FileUploadProps) => {
  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const columns = results.meta.fields || [];
          onDataLoaded({
            name: file.name,
            rows: results.data as Record<string, any>[],
            columns,
          });
        },
      });
    },
    [onDataLoaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`glass-card glow-border p-12 text-center cursor-pointer transition-all duration-300 hover:bg-secondary/30 ${
        isDragActive ? "bg-primary/10 border-primary" : ""
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        {isDragActive ? (
          <FileSpreadsheet className="w-12 h-12 text-primary animate-bounce" />
        ) : (
          <Upload className="w-12 h-12 text-muted-foreground" />
        )}
        <div>
          <p className="text-foreground font-heading font-semibold">
            {isDragActive ? "Drop your file here" : "Upload your dataset"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Drag & drop a CSV file, or click to browse
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
