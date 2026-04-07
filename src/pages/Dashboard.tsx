import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogOut, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import DataTable from "@/components/DataTable";
import DataStats from "@/components/DataStats";
import AIChatPanel from "@/components/AIChatPanel";

interface DatasetState {
  name: string;
  rows: Record<string, any>[];
  columns: string[];
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [dataset, setDataset] = useState<DatasetState | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const dataContext = useMemo(() => {
    if (!dataset) return "";
    const sampleRows = dataset.rows.slice(0, 30);
    return `File: ${dataset.name}
Columns: ${dataset.columns.join(", ")}
Total rows: ${dataset.rows.length}
Sample data (first 30 rows):
${JSON.stringify(sampleRows, null, 2)}`;
  }, [dataset]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h1 className="font-heading font-bold text-lg">
            <span className="gradient-text">DataLens</span> AI
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">{user.email}</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-1" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-6">
        {!dataset ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-heading font-bold mb-2">Upload Your Data</h2>
              <p className="text-muted-foreground text-sm">
                Drop a CSV file and DataLens AI will instantly analyze it like a senior data analyst
              </p>
            </div>
            <FileUpload onDataLoaded={setDataset} />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold">Dashboard</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDataset(null)}
              >
                Upload New File
              </Button>
            </div>

            <DataStats
              name={dataset.name}
              rowCount={dataset.rows.length}
              colCount={dataset.columns.length}
              columns={dataset.columns}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              <DataTable columns={dataset.columns} rows={dataset.rows} />
              <AIChatPanel dataContext={dataContext} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
