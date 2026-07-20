import type { Metadata } from "next";
import {
  DollarSign,
  Package,
  Percent,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { analytics } from "@/data/analytics";
import { formatCurrency } from "@/lib/format";

export const metadata: Metadata = {
  title: "Аналитик — MODULESOFT Админ",
  description: "Орлогын хандлага, захиалгын хэмжээ, трафик, хөрвүүлэлт.",
};

const kpis: {
  label: string;
  value: string;
  growth: number;
  icon: LucideIcon;
  tint: string;
}[] = [
  {
    label: "Нийт орлого",
    value: formatCurrency(analytics.totalRevenue),
    growth: analytics.revenueGrowth,
    icon: DollarSign,
    tint: "bg-indigo-500/15 text-indigo-400",
  },
  {
    label: "Захиалгууд",
    value: analytics.totalOrders.toLocaleString("en-US"),
    growth: analytics.ordersGrowth,
    icon: Package,
    tint: "bg-violet-500/15 text-violet-400",
  },
  {
    label: "Идэвхтэй хэрэглэгчид",
    value: analytics.activeUsers.toLocaleString("en-US"),
    growth: analytics.usersGrowth,
    icon: Users,
    tint: "bg-fuchsia-500/15 text-fuchsia-400",
  },
  {
    label: "Хөрвүүлэлтийн хувь",
    value: `${analytics.conversionRate}%`,
    growth: analytics.conversionGrowth,
    icon: Percent,
    tint: "bg-indigo-500/15 text-indigo-400",
  },
];

const trafficColors = ["#6366f1", "#8b5cf6", "#d946ef", "#a5b4fc", "#c4b5fd"];

const funnel = [
  { label: "Зочид", value: "128k", pct: "100%", width: "100%" },
  { label: "Загвар үзэлт", value: "42k", pct: "32.8%", width: "72%" },
  { label: "Бүтээгчийн сешн", value: "9.8k", pct: "7.7%", width: "46%" },
  { label: "Захиалгууд", value: "342", pct: "0.3%", width: "22%" },
];

function RevenueAreaChart() {
  const W = 720;
  const H = 220;
  const PAD = 12;
  const points = analytics.revenueByMonth;
  const max = Math.max(...points.map((p) => p.revenue));
  const coords = points.map((p, i) => ({
    x: PAD + (i * (W - PAD * 2)) / (points.length - 1),
    y: H - 30 - (p.revenue / max) * (H - 60),
    month: p.month,
    revenue: p.revenue,
  }));
  const first = coords[0]!;
  const last = coords[coords.length - 1]!;
  const line = coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${last.x.toFixed(1)},${H - 20} L${first.x.toFixed(
    1
  )},${H - 20} Z`;

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Сар тутмын орлого"
      >
        <defs>
          <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={PAD}
            x2={W - PAD}
            y1={H - 30 - t * (H - 60)}
            y2={H - 30 - t * (H - 60)}
            stroke="currentColor"
            className="text-border"
            strokeDasharray="4 6"
            strokeWidth="1"
          />
        ))}
        <path d={area} fill="url(#revenue-fill)" />
        <path
          d={line}
          fill="none"
          stroke="#818cf8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map((c) => (
          <circle
            key={c.month}
            cx={c.x}
            cy={c.y}
            r="4"
            fill="#818cf8"
            stroke="#0a0a0f"
            strokeWidth="2"
          >
            <title>{`${c.month}: ${formatCurrency(c.revenue)}`}</title>
          </circle>
        ))}
      </svg>
      <div className="mt-1 flex justify-between px-1">
        {points.map((p) => (
          <span key={p.month} className="text-[10px] text-muted-foreground">
            {p.month}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const maxOrders = Math.max(
    ...analytics.revenueByMonth.map((point) => point.orders)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Аналитик</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Орлого, захиалгын хэмжээ, зочдын эх үүсвэрийн дэлгэрэнгүй шинжилгээ.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} size="sm">
            <CardContent className="flex items-center gap-3">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${kpi.tint}`}
              >
                <kpi.icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold tracking-tight">
                    {kpi.value}
                  </span>
                  <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-400">
                    <TrendingUp className="size-3" />+{kpi.growth}%
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue area chart */}
      <Card>
        <CardHeader>
          <CardTitle>Орлогын хандлага</CardTitle>
          <CardDescription>
            8-р сараас 7-р сар хүртэлх сарын орлого.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RevenueAreaChart />
        </CardContent>
      </Card>

      {/* Orders per month */}
      <Card>
        <CardHeader>
          <CardTitle>Сарын захиалгууд</CardTitle>
          <CardDescription>Амжилттай хийгдсэн захиалгын хэмжээ.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-40 items-end gap-2 sm:gap-3">
            {analytics.revenueByMonth.map((point) => (
              <div
                key={point.month}
                className="group relative flex h-full flex-1 flex-col justify-end"
              >
                <span className="pointer-events-none absolute -top-7 left-1/2 z-10 hidden -translate-x-1/2 rounded-md bg-secondary px-2 py-1 text-[11px] font-medium tabular-nums whitespace-nowrap group-hover:block">
                  {point.orders} захиалга
                </span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-fuchsia-500 opacity-80 transition-opacity group-hover:opacity-100"
                  style={{ height: `${(point.orders / maxOrders) * 100}%` }}
                  title={`${point.month}: ${point.orders} захиалга`}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2 sm:gap-3">
            {analytics.revenueByMonth.map((point) => (
              <span
                key={point.month}
                className="flex-1 text-center text-[10px] text-muted-foreground"
              >
                {point.month}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traffic + funnel */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Трафикийн эх үүсвэр</CardTitle>
            <CardDescription>
              Өнгөрсөн үеийн зочилтууд хаанаас ирсэн бэ.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-4 w-full overflow-hidden rounded-full">
              {analytics.trafficSources.map((source, index) => (
                <div
                  key={source.source}
                  className="h-full transition-opacity hover:opacity-80"
                  style={{
                    width: `${source.share}%`,
                    backgroundColor:
                      trafficColors[index % trafficColors.length],
                  }}
                  title={`${source.source}: ${source.share}%`}
                />
              ))}
            </div>
            <ul className="mt-5 space-y-3">
              {analytics.trafficSources.map((source, index) => (
                <li
                  key={source.source}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        trafficColors[index % trafficColors.length],
                    }}
                  />
                  <span>{source.source}</span>
                  <span className="ml-auto tabular-nums text-muted-foreground">
                    {source.share}%
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Хөрвүүлэлтийн юүлүүр</CardTitle>
            <CardDescription>
              Анхны зочилтоос захиалга хийх хүртэл.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {funnel.map((stage) => (
              <div key={stage.label}>
                <div className="mb-1.5 flex items-baseline justify-between text-sm">
                  <span>{stage.label}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {stage.value}
                    <span className="ml-2 text-xs">({stage.pct})</span>
                  </span>
                </div>
                <div
                  className="mx-auto h-7 rounded-md bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500 opacity-90 transition-opacity hover:opacity-100"
                  style={{ width: stage.width }}
                  title={`${stage.label}: ${stage.value}`}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
