import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartConfig {
  type: "bar" | "line" | "pie" | "area";
  title: string;
  data: Record<string, any>[];
  xKey?: string;
  yKey?: string;
}

const COLORS = [
  "hsl(190, 100%, 50%)",
  "hsl(260, 80%, 60%)",
  "hsl(150, 70%, 50%)",
  "hsl(30, 90%, 55%)",
  "hsl(340, 80%, 55%)",
  "hsl(210, 80%, 55%)",
];

const DynamicChart = ({ config }: { config: ChartConfig }) => {
  const { type, title, data, xKey = "name", yKey = "value" } = config;

  return (
    <div className="glass-card p-4 rounded-xl">
      <h4 className="font-heading font-semibold text-sm text-foreground mb-3">
        {title}
      </h4>
      <ResponsiveContainer width="100%" height={250}>
        {type === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
            <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 40%, 9%)",
                border: "1px solid hsl(222, 20%, 18%)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey={yKey} radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        ) : type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
            <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 40%, 9%)",
                border: "1px solid hsl(222, 20%, 18%)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Line type="monotone" dataKey={yKey} stroke={COLORS[0]} strokeWidth={2} dot={{ fill: COLORS[0] }} />
          </LineChart>
        ) : type === "area" ? (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
            <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 40%, 9%)",
                border: "1px solid hsl(222, 20%, 18%)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Area type="monotone" dataKey={yKey} stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.2} />
          </AreaChart>
        ) : (
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 40%, 9%)",
                border: "1px solid hsl(222, 20%, 18%)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Pie data={data} dataKey={yKey} nameKey={xKey} cx="50%" cy="50%" outerRadius={80} label>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicChart;
