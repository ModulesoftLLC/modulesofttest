"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Crown, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { currentUser } from "@/data/users";
import { formatDate, initials } from "@/lib/format";
import { cn } from "@/lib/utils";

const planFeatures = [
  "Unlimited projects",
  "Dedicated design team",
  "Priority support",
  "Custom domains & SSL",
];

const notificationRows = [
  {
    key: "projects",
    label: "Project updates",
    description: "Milestones, reviews and launch notices",
    defaultOn: true,
  },
  {
    key: "messages",
    label: "New messages",
    description: "When your team replies to a thread",
    defaultOn: true,
  },
  {
    key: "billing",
    label: "Billing",
    description: "Invoices, receipts and payment reminders",
    defaultOn: true,
  },
  {
    key: "news",
    label: "Product news",
    description: "New templates and builder features",
    defaultOn: false,
  },
];

function SaveButton({ label = "Save changes" }: { label?: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <Button
      size="sm"
      disabled={saved}
      onClick={() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }}
      className={cn(
        !saved &&
          "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-400"
      )}
    >
      {saved ? (
        <>
          <Check className="size-3.5" /> Saved
        </>
      ) : (
        label
      )}
    </Button>
  );
}

export default function SettingsPage() {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [company, setCompany] = useState("Harbor & Co.");
  const [siteName, setSiteName] = useState("Harbor & Co.");
  const [subdomain, setSubdomain] = useState("harborandco");
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    Object.fromEntries(notificationRows.map((row) => [row.key, row.defaultOn]))
  );
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your profile, workspace and plan — all in one place.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            How you appear to your team and on invoices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-lg font-semibold text-white">
                {initials(name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">
                Studio plan · member since {formatDate(currentUser.joinedAt)}
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="settings-name">Full name</Label>
              <Input
                id="settings-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-email">Email</Label>
              <Input
                id="settings-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="settings-company">Company</Label>
              <Input
                id="settings-company"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t border-border">
          <SaveButton />
        </CardFooter>
      </Card>

      {/* Workspace */}
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>
            Naming and address for your published sites.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="settings-site-name">Site name</Label>
            <Input
              id="settings-site-name"
              value={siteName}
              onChange={(event) => setSiteName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-subdomain">Subdomain</Label>
            <div className="flex items-center">
              <Input
                id="settings-subdomain"
                value={subdomain}
                onChange={(event) => setSubdomain(event.target.value)}
                className="rounded-r-none"
              />
              <span className="flex h-8 items-center rounded-r-lg border border-l-0 border-border bg-secondary px-3 text-sm text-muted-foreground">
                .modulesoft.site
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t border-border">
          <SaveButton />
        </CardFooter>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose what lands in your inbox. We keep it light.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {notificationRows.map((row, index) => (
            <div key={row.key}>
              {index > 0 && <Separator className="my-1" />}
              <div className="flex items-center justify-between gap-4 py-2.5">
                <div>
                  <p className="text-sm font-medium">{row.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {row.description}
                  </p>
                </div>
                <Switch
                  checked={notifications[row.key] ?? false}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      [row.key]: checked,
                    }))
                  }
                  aria-label={`Toggle ${row.label.toLowerCase()} notifications`}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Plan & billing */}
      <Card>
        <CardHeader>
          <CardTitle>Plan &amp; billing</CardTitle>
          <CardDescription>
            Your subscription and upcoming invoice.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                <Crown className="size-5" />
              </span>
              <div>
                <p className="font-semibold">Studio — $99/mo</p>
                <p className="text-xs text-muted-foreground">
                  Next invoice on {formatDate("2026-08-01")}
                </p>
              </div>
            </div>
            <Link
              href="/pricing"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Manage plan
            </Link>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {planFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="size-3.5 text-indigo-400" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>
            Deleting your workspace removes every project, order and message.
            This can&rsquo;t be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger render={<Button variant="destructive" />}>
              <Trash2 className="size-4" />
              Delete workspace
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete workspace?</DialogTitle>
                <DialogDescription>
                  This permanently deletes &ldquo;Harbor &amp; Co.&rdquo; along
                  with all projects, orders and conversation history. There is
                  no way back.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteOpen(false)}
                >
                  Yes, delete everything
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
