import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  DollarSign,
  Package,
  Percent,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TemplateThumbnail } from "@/components/shared/template-thumbnail";
import { analytics } from "@/data/analytics";
import { orders, orderStatusMeta } from "@/data/orders";
import { getTemplateById } from "@/data/templates";
import { formatCurrency } from "@/lib/format";

export const metadata: Metadata = {
  title: "Админ тойм — MODULESOFT",
  description: "Орлого, захиалга, загварын гүйцэтгэлийг нэг дороос.",
};

const rangeOptions = [
  { value: "30d", label: "Сүүлийн 30 хоног" },
  { value: "90d", label: "Сүүлийн 90 хоног" },
  { value: "year", label: "Энэ жил" },
];

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

const trafficTints = [
  "[&_[data-slot=progress-indicator]]:bg-indigo-500",
  "[&_[data-slot=progress-indicator]]:bg-violet-500",
  "[&_[data-slot=progress-indicator]]:bg-fuchsia-500",
  "[&_[data-slot=progress-indicator]]:bg-indigo-300",
  "[&_[data-slot=progress-indicator]]:bg-violet-300",
];

export default function AdminOverviewPage() {
  const maxRevenue = Math.max(
    ...analytics.revenueByMonth.map((point) => point.revenue)
  );
  const recentOrders = [...orders]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Админ тойм
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            MODULESOFT-ийн орлого, захиалга, загварын гүйцэтгэлийн ерөнхий
            дүр зураг.
          </p>
        </div>
        <Select items={rangeOptions} defaultValue="30d">
          <SelectTrigger className="w-40 bg-card" aria-label="Хугацааны интервал">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {rangeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="flex items-start gap-4">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${kpi.tint}`}
              >
                <kpi.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  {kpi.value}
                </p>
                <p className="mt-1.5 flex items-center gap-1 text-xs">
                  <span className="flex items-center gap-1 font-medium text-emerald-400">
                    <TrendingUp className="size-3.5" />+{kpi.growth}%
                  </span>
                  <span className="text-muted-foreground">өмнөх үеэс</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue chart + top templates */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Сарын орлого</CardTitle>
            <CardDescription>
              Сүүлийн арван хоёр сарын орлогын үзүүлэлт.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-56 items-end gap-2 sm:gap-3">
              {analytics.revenueByMonth.map((point) => (
                <div
                  key={point.month}
                  className="group relative flex h-full flex-1 flex-col justify-end"
                >
                  <span className="pointer-events-none absolute -top-7 left-1/2 z-10 hidden -translate-x-1/2 rounded-md bg-secondary px-2 py-1 text-[11px] font-medium tabular-nums whitespace-nowrap group-hover:block">
                    {formatCurrency(point.revenue)}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-indigo-600 to-violet-500 opacity-80 transition-all group-hover:opacity-100 group-hover:from-indigo-500 group-hover:to-fuchsia-500"
                    style={{ height: `${(point.revenue / maxRevenue) * 100}%` }}
                    title={`${point.month}: ${formatCurrency(point.revenue)}`}
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

        <Card>
          <CardHeader>
            <CardTitle>Шилдэг загварууд</CardTitle>
            <CardDescription>Бүх цаг үеийн хамгийн их борлуулалттай.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.topTemplates.map((entry, index) => {
              const template = getTemplateById(entry.templateId);
              if (!template) return null;
              return (
                <div key={entry.templateId} className="flex items-center gap-3">
                  <span className="w-4 shrink-0 text-sm font-medium tabular-nums text-muted-foreground">
                    {index + 1}
                  </span>
                  <TemplateThumbnail
                    template={template}
                    className="w-12 shrink-0 rounded-md aspect-video"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {template.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.sales.toLocaleString("en-US")} борлуулалт
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-medium tabular-nums text-indigo-400">
                    {formatCurrency(entry.revenue)}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent orders + traffic sources */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Сүүлийн захиалгууд</CardTitle>
            <CardDescription>Хамгийн сүүлд ирсэн таван захиалга.</CardDescription>
            <CardAction>
              <Link
                href="/admin/orders"
                className="flex items-center gap-1 text-sm text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Бүгдийг үзэх
                <ArrowRight className="size-3.5" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Захиалга</TableHead>
                    <TableHead>Харилцагч</TableHead>
                    <TableHead className="text-right">Дүн</TableHead>
                    <TableHead className="text-right">Төлөв</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Link
                          href="/admin/orders"
                          className="font-mono text-xs text-foreground transition-colors hover:text-indigo-400"
                        >
                          {order.orderNumber}
                        </Link>
                      </TableCell>
                      <TableCell>{order.customer.name}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="secondary"
                          className={orderStatusMeta[order.status].className}
                        >
                          {orderStatusMeta[order.status].label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Трафикийн эх үүсвэр</CardTitle>
            <CardDescription>Зочилтын сувгуудын эзлэх хувь.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {analytics.trafficSources.map((source, index) => (
              <Progress
                key={source.source}
                value={source.share}
                className={trafficTints[index % trafficTints.length]}
              >
                <ProgressLabel className="text-sm font-normal">
                  {source.source}
                </ProgressLabel>
                <span className="ml-auto text-sm tabular-nums text-muted-foreground">
                  {source.share}%
                </span>
              </Progress>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
