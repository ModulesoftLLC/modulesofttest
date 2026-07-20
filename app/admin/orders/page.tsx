"use client";

import { useMemo, useState } from "react";
import {
  Ban,
  CheckCircle2,
  Clock,
  Eye,
  Hammer,
  MoreHorizontal,
  PackageCheck,
  Search,
  Truck,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  orders as initialOrders,
  orderStatusMeta,
  websiteTypeMeta,
} from "@/data/orders";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Order, OrderStatus } from "@/types";

type StatusFilter = OrderStatus | "all";

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Бүх төлөв" },
  { value: "pending", label: orderStatusMeta.pending.label },
  { value: "confirmed", label: orderStatusMeta.confirmed.label },
  { value: "in-production", label: orderStatusMeta["in-production"].label },
  { value: "delivered", label: orderStatusMeta.delivered.label },
  { value: "cancelled", label: orderStatusMeta.cancelled.label },
];

export default function AdminOrdersPage() {
  const [orderList, setOrderList] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orderList.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) return false;
      if (!query) return true;
      return (
        order.orderNumber.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.company.toLowerCase().includes(query)
      );
    });
  }, [orderList, search, statusFilter]);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrderList((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
    setDetailOrder((prev) =>
      prev && prev.id === id ? { ...prev, status } : prev
    );
  };

  const summary = [
    {
      label: "Хүлээгдэж буй",
      value: orderList
        .filter((o) => o.status === "pending")
        .length.toString(),
      icon: Clock,
      tint: "bg-amber-500/15 text-amber-400",
    },
    {
      label: "Хийгдэж буй",
      value: orderList
        .filter((o) => o.status === "in-production")
        .length.toString(),
      icon: Hammer,
      tint: "bg-violet-500/15 text-violet-400",
    },
    {
      label: "Хүлээлгэн өгсөн",
      value: orderList
        .filter((o) => o.status === "delivered")
        .length.toString(),
      icon: Truck,
      tint: "bg-emerald-500/15 text-emerald-400",
    },
    {
      label: "Нийт дүн",
      value: formatCurrency(
        orderList
          .filter((o) => o.status !== "cancelled")
          .reduce((sum, o) => sum + o.total, 0)
      ),
      icon: Wallet,
      tint: "bg-indigo-500/15 text-indigo-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Захиалгууд</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Вэбсайтын бүх захиалгыг нэг дороос хянаж, баталгаажуулж, дагаж
          мөрдөөрэй.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <Card key={item.label} size="sm">
            <CardContent className="flex items-center gap-3">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${item.tint}`}
              >
                <item.icon className="size-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-lg font-semibold tracking-tight tabular-nums">
                  {item.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Захиалга, харилцагч хайх…"
            className="bg-card pl-9"
            aria-label="Захиалга хайх"
          />
        </div>
        <Select
          items={statusOptions}
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as StatusFilter)}
        >
          <SelectTrigger
            className="h-9 w-full bg-card sm:w-48"
            aria-label="Төлвөөр шүүх"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders table */}
      <Card className="py-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Захиалга</TableHead>
                <TableHead>Харилцагч</TableHead>
                <TableHead>Төрөл</TableHead>
                <TableHead>Төсөв</TableHead>
                <TableHead className="text-right">Дүн</TableHead>
                <TableHead>Огноо</TableHead>
                <TableHead>Төлөв</TableHead>
                <TableHead className="w-12 pr-4" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-14 text-center">
                    <p className="font-medium">Захиалга олдсонгүй</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Одоогийн шүүлтүүрээр &ldquo;{search}&rdquo; гэсэн
                      хайлтад тохирох захиалга алга. Өөр хайлт эсвэл төлөв
                      сонгоод үзээрэй.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="pl-4 font-mono text-xs">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.customer.company}
                      </p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {websiteTypeMeta[order.websiteType].label}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {budgetMeta[order.budget].label}
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {formatCurrency(order.total)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={orderStatusMeta[order.status].className}
                      >
                        {orderStatusMeta[order.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`${order.orderNumber} захиалгын үйлдлүүд`}
                            />
                          }
                        >
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            onClick={() => setDetailOrder(order)}
                          >
                            <Eye />
                            Дэлгэрэнгүй
                          </DropdownMenuItem>
                          {order.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateStatus(order.id, "confirmed")
                              }
                            >
                              <CheckCircle2 />
                              Баталгаажуулах
                            </DropdownMenuItem>
                          )}
                          {(order.status === "confirmed" ||
                            order.status === "in-production") && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateStatus(order.id, "delivered")
                              }
                            >
                              <PackageCheck />
                              Хүлээлгэн өгсөн болгох
                            </DropdownMenuItem>
                          )}
                          {order.status !== "cancelled" &&
                            order.status !== "delivered" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() =>
                                    updateStatus(order.id, "cancelled")
                                  }
                                >
                                  <Ban />
                                  Захиалга цуцлах
                                </DropdownMenuItem>
                              </>
                            )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Order detail dialog */}
      <Dialog
        open={detailOrder !== null}
        onOpenChange={(open) => {
          if (!open) setDetailOrder(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {detailOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="font-mono text-sm">
                    {detailOrder.orderNumber}
                  </span>
                  <Badge
                    variant="secondary"
                    className={orderStatusMeta[detailOrder.status].className}
                  >
                    {orderStatusMeta[detailOrder.status].label}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  {formatDate(detailOrder.createdAt)}-нд{" "}
                  {detailOrder.customer.name} захиалсан.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Харилцагч</p>
                    <p className="mt-0.5 font-medium">
                      {detailOrder.customer.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {detailOrder.customer.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Байгууллага</p>
                    <p className="mt-0.5 font-medium">
                      {detailOrder.customer.company}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Вэбсайтын төрөл
                    </p>
                    <p className="mt-0.5 font-medium">
                      {websiteTypeMeta[detailOrder.websiteType].label}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Төсөв</p>
                    <p className="mt-0.5 font-medium">
                      {budgetMeta[detailOrder.budget].label}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Дүн</p>
                    <p className="mt-0.5 font-medium tabular-nums text-indigo-400">
                      {formatCurrency(detailOrder.total)}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">Тэмдэглэл</p>
                  <p className="mt-1 text-muted-foreground">
                    &ldquo;{detailOrder.notes}&rdquo;
                  </p>
                </div>
              </div>
              <DialogFooter showCloseButton>
                {detailOrder.status === "pending" && (
                  <Button
                    onClick={() => updateStatus(detailOrder.id, "confirmed")}
                  >
                    Баталгаажуулах
                  </Button>
                )}
                {(detailOrder.status === "confirmed" ||
                  detailOrder.status === "in-production") && (
                  <Button
                    onClick={() => updateStatus(detailOrder.id, "delivered")}
                  >
                    Хүлээлгэн өгсөн болгох
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
