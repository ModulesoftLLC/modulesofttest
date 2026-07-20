"use client";

import { useMemo, useState } from "react";
import {
  Ban,
  Eye,
  MoreHorizontal,
  RotateCcw,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users as UsersIcon,
  Wrench,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { users as initialUsers } from "@/data/users";
import {
  formatCurrency,
  formatDate,
  formatRelativeTime,
  initials,
} from "@/lib/format";
import type { User, UserRole, UserStatus } from "@/types";

type RoleFilter = UserRole | "all";

const roleOptions: { value: RoleFilter; label: string }[] = [
  { value: "all", label: "All roles" },
  { value: "admin", label: "Admin" },
  { value: "customer", label: "Customer" },
  { value: "designer", label: "Designer" },
];

const roleBadge: Record<UserRole, string> = {
  admin: "bg-violet-500/15 text-violet-400",
  designer: "bg-blue-500/15 text-blue-400",
  customer: "bg-secondary text-muted-foreground",
};

const statusMeta: Record<UserStatus, { label: string; dot: string }> = {
  active: { label: "Active", dot: "bg-emerald-400" },
  invited: { label: "Invited", dot: "bg-amber-400" },
  suspended: { label: "Suspended", dot: "bg-zinc-500" },
};

export default function AdminUsersPage() {
  const [userList, setUserList] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return userList.filter((user) => {
      if (roleFilter !== "all" && user.role !== roleFilter) return false;
      if (!query) return true;
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });
  }, [userList, search, roleFilter]);

  const setStatus = (id: string, status: UserStatus) => {
    setUserList((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status } : user))
    );
    setProfileUser((prev) =>
      prev && prev.id === id ? { ...prev, status } : prev
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setUserList((prev) => prev.filter((user) => user.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const stats = [
    {
      label: "Total users",
      value: userList.length.toString(),
      icon: UsersIcon,
      tint: "bg-indigo-500/15 text-indigo-400",
    },
    {
      label: "Active",
      value: userList.filter((u) => u.status === "active").length.toString(),
      icon: UserCheck,
      tint: "bg-emerald-500/15 text-emerald-400",
    },
    {
      label: "Customers",
      value: userList.filter((u) => u.role === "customer").length.toString(),
      icon: ShieldCheck,
      tint: "bg-violet-500/15 text-violet-400",
    },
    {
      label: "Team members",
      value: userList
        .filter((u) => u.role === "admin" || u.role === "designer")
        .length.toString(),
      icon: Wrench,
      tint: "bg-fuchsia-500/15 text-fuchsia-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everyone with a MODULESOFT account — customers, designers, and
          admins.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} size="sm">
            <CardContent className="flex items-center gap-3">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${stat.tint}`}
              >
                <stat.icon className="size-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-semibold tracking-tight tabular-nums">
                  {stat.value}
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
            placeholder="Search by name or email…"
            className="bg-card pl-9"
            aria-label="Search users"
          />
        </div>
        <Select
          items={roleOptions}
          value={roleFilter}
          onValueChange={(value) => setRoleFilter(value as RoleFilter)}
        >
          <SelectTrigger
            className="h-9 w-full bg-card sm:w-44"
            aria-label="Filter by role"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Users table */}
      <Card className="py-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Projects</TableHead>
                <TableHead className="text-right">Total spent</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12 pr-4" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-14 text-center">
                    <p className="font-medium">No users found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      No users match &ldquo;{search}&rdquo; with the current
                      filters.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-[11px] font-semibold text-white">
                            {initials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{user.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${roleBadge[user.role]} capitalize`}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {user.projects}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(user.totalSpent)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(user.joinedAt)}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-sm">
                        <span
                          className={`size-2 shrink-0 rounded-full ${statusMeta[user.status].dot}`}
                        />
                        {statusMeta[user.status].label}
                      </span>
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Actions for ${user.name}`}
                            />
                          }
                        >
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={() => setProfileUser(user)}
                          >
                            <Eye />
                            View profile
                          </DropdownMenuItem>
                          {user.status === "suspended" ? (
                            <DropdownMenuItem
                              onClick={() => setStatus(user.id, "active")}
                            >
                              <RotateCcw />
                              Reactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => setStatus(user.id, "suspended")}
                            >
                              <Ban />
                              Suspend
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setDeleteTarget(user)}
                          >
                            <Trash2 />
                            Delete
                          </DropdownMenuItem>
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

      {/* Profile dialog */}
      <Dialog
        open={profileUser !== null}
        onOpenChange={(open) => {
          if (!open) setProfileUser(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {profileUser && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="size-11">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-semibold text-white">
                      {initials(profileUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle>{profileUser.name}</DialogTitle>
                    <DialogDescription>{profileUser.email}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge
                  variant="secondary"
                  className={`${roleBadge[profileUser.role]} capitalize`}
                >
                  {profileUser.role}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {profileUser.plan} plan
                </Badge>
                <span className="ml-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    className={`size-2 rounded-full ${statusMeta[profileUser.status].dot}`}
                  />
                  {statusMeta[profileUser.status].label}
                </span>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Projects</p>
                  <p className="mt-0.5 font-medium tabular-nums">
                    {profileUser.projects}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total spent</p>
                  <p className="mt-0.5 font-medium tabular-nums">
                    {formatCurrency(profileUser.totalSpent)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Joined</p>
                  <p className="mt-0.5 font-medium">
                    {formatDate(profileUser.joinedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last active</p>
                  <p className="mt-0.5 font-medium">
                    {formatRelativeTime(profileUser.lastActive)}
                  </p>
                </div>
              </div>
              <DialogFooter showCloseButton>
                {profileUser.status === "suspended" ? (
                  <Button
                    onClick={() => setStatus(profileUser.id, "active")}
                  >
                    Reactivate
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={() => setStatus(profileUser.id, "suspended")}
                  >
                    Suspend
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete user?</DialogTitle>
            <DialogDescription>
              {deleteTarget?.name}&rsquo;s account and access will be removed.
              This mock action only updates the local list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete user
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
