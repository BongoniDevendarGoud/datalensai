import { Database, Rows3, Columns3, Hash } from "lucide-react";

interface DataStatsProps {
  name: string;
  rowCount: number;
  colCount: number;
  columns: string[];
}

const DataStats = ({ name, rowCount, colCount, columns }: DataStatsProps) => {
  // Detect numeric columns
  const stats = [
    { icon: Database, label: "Dataset", value: name },
    { icon: Rows3, label: "Rows", value: rowCount.toLocaleString() },
    { icon: Columns3, label: "Columns", value: colCount.toString() },
    { icon: Hash, label: "Fields", value: columns.slice(0, 3).join(", ") + (columns.length > 3 ? "..." : "") },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="glass-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <s.icon className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
          <p className="text-sm font-heading font-semibold text-foreground truncate">
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DataStats;
