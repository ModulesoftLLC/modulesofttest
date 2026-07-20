"use client";

import { useState } from "react";
import {
  Download,
  Eye,
  Hammer,
  MoreHorizontal,
  Package,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  budgetMeta,
  orders,
  orderStatusMeta,
  websiteTypeMeta,
} from "@/data/orders";
import { getTemplateById } from "@/data/templates";
import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Order } from "@/types";

const inProduction = orders.filter((o) => o.status === "in-production").length;
const totalValue = orders.reduce((sum, order) => sum + order.total, 0);

const summary = [
  {
    label: "Нийт захиалга",
    value: String(orders.length),
    hint: "Бүх хугацаанд",
    icon: Package,
    iconClass: "bg-indigo-500/15 text-indigo-400",
  },
  {
    label: "Хийгдэж буй",
    value: String(inProduction),
    hint: "Яг одоо бүтээгдэж байна",
    icon: Hammer,
    iconClass: "bg-violet-500/15 text-violet-400",
  },
  {
    label: "Нийт дүн",
    value: formatCurrency(totalValue),
    hint: "Бүх захиалгыг оруулаад",
    icon: Wallet,
    iconClass: "bg-emerald-500/15 text-emerald-400",
  },
];

function templateName(templateId: string | null): string {
  if (templateId === null) return "Захиалгат бүтээл";
  return getTemplateById(templateId)?.name ?? "Захиалгат бүтээл";
}

function OrderActions({ onView }: { onView: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Захиалгын үйлдлүүд" />
        }
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={onView}>
          <Eye className="size-4" />
          Дэлгэрэнгүй үзэх
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Download className="size-4" />
          Нэхэмжлэх татах
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function OrdersPage() {
  const [selected, setSelected] = useState<Order | null>(null);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Захиалгууд</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Таны захиалсан бүх ажил — хүсэлтээс хүлээлгэн өгөх хүртэл.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {summary.map((stat) => (
          <Card key={stat.label} className="gap-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg",
                  stat.iconClass
                )}
              >
                <stat.icon className="size-4" />
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop table */}
      <Card className="hidden py-2 md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Захиалгын дугаар</TableHead>
              <TableHead>Төрөл</TableHead>
              <TableHead>Загвар</TableHead>
              <TableHead>Огноо</TableHead>
              <TableHead className="text-right">Дүн</TableHead>
              <TableHead>Төлөв</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">
                  {order.orderNumber}
                </TableCell>
                <TableCell>{websiteTypeMeta[order.websiteType].label}</TableCell>
                <TableCell className="text-muted-foreground">
                  {templateName(order.templateId)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(order.total)}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "border-0",
                      orderStatusMeta[order.status].className
                    )}
                  >
                    {orderStatusMeta[order.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <OrderActions onView={() => setSelected(order)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Mobile stacked cards */}
      <div className="space-y-3 md:hidden">
        {orders.map((order) => (
          <Card key={order.id} className="gap-3 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  {order.orderNumber}
                </p>
                <p className="mt-1 font-medium">
                  {websiteTypeMeta[order.websiteType].label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {templateName(order.templateId)}
                </p>
              </div>
              <OrderActions onView={() => setSelected(order)} />
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {formatDate(order.createdAt)}
              </span>
              <span className="tabular-nums font-medium">
                {formatCurrency(order.total)}
              </span>
              <Badge
                className={cn(
                  "border-0",
                  orderStatusMeta[order.status].className
                )}
              >
                {orderStatusMeta[order.status].label}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Details dialog */}
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-mono text-base">
                  {selected.orderNumber}
                </DialogTitle>
                <DialogDescription>
                  Захиалгын дэлгэрэнгүй — {formatDate(selected.createdAt)} ·{" "}
                  {websiteTypeMeta[selected.websiteType].label}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Төлөв</span>
                  <Badge
                    className={cn(
                      "border-0",
                      orderStatusMeta[selected.status].className
                    )}
                  >
                    {orderStatusMeta[selected.status].label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Загвар</span>
                  <span>{templateName(selected.templateId)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Төсвийн хязгаар</span>
                  <span>{budgetMeta[selected.budget].label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Нийт дүн</span>
                  <span className="font-medium tabular-nums">
                    {formatCurrency(selected.total)}
                  </span>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground">Холбоо барих</p>
                  <p className="mt-1">
                    {selected.customer.name} · {selected.customer.company}
                  </p>
                  <p className="text-muted-foreground">
                    {selected.customer.email}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground">Тэмдэглэл</p>
                  <p className="mt-1">{selected.notes}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
