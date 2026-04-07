import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  columns: string[];
  rows: Record<string, any>[];
  maxRows?: number;
}

const DataTable = ({ columns, rows, maxRows = 10 }: DataTableProps) => {
  const displayRows = rows.slice(0, maxRows);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-sm text-foreground">
          Data Preview
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Showing {displayRows.length} of {rows.length} rows · {columns.length} columns
        </p>
      </div>
      <div className="overflow-x-auto max-h-80">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col} className="text-xs font-heading whitespace-nowrap">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayRows.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col} className="text-xs whitespace-nowrap">
                    {String(row[col] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
