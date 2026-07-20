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
  "Хязгааргүй төсөл",
  "Тусгай дизайн баг",
  "Тэргүүн ээлжийн дэмжлэг",
  "Өөрийн домэйн ба SSL",
];

const notificationRows = [
  {
    key: "projects",
    label: "Төслийн шинэчлэлт",
    description: "Үе шат, хяналт болон нээлтийн мэдэгдлүүд",
    defaultOn: true,
  },
  {
    key: "messages",
    label: "Шинэ зурвас",
    description: "Танай баг харилцан ярианд хариулах үед",
    defaultOn: true,
  },
  {
    key: "billing",
    label: "Төлбөрийн мэдээлэл",
    description: "Нэхэмжлэх, баримт болон төлбөрийн сануулга",
    defaultOn: true,
  },
  {
    key: "news",
    label: "Бүтээгдэхүүний мэдээ",
    description: "Шинэ загварууд болон бүтээгчийн шинэ боломжууд",
    defaultOn: false,
  },
];

function SaveButton({ label = "Хадгалах" }: { label?: string }) {
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
          <Check className="size-3.5" /> Хадгаллаа
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
        <h1 className="text-2xl font-semibold tracking-tight">Тохиргоо</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Таны профайл, ажлын орчин, багц — бүгд нэг дор.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Профайл</CardTitle>
          <CardDescription>
            Та багтаа болон нэхэмжлэх дээр хэрхэн харагдах вэ.
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
                Студи багц · {formatDate(currentUser.joinedAt)}-с хойш гишүүн
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="settings-name">Бүтэн нэр</Label>
              <Input
                id="settings-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-email">Имэйл</Label>
              <Input
                id="settings-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="settings-company">Компани</Label>
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
          <CardTitle>Ажлын орчин</CardTitle>
          <CardDescription>
            Нийтлэгдсэн сайтуудын нэр болон хаяг.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="settings-site-name">Сайтын нэр</Label>
            <Input
              id="settings-site-name"
              value={siteName}
              onChange={(event) => setSiteName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-subdomain">Дэд домэйн</Label>
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
          <CardTitle>Мэдэгдэл</CardTitle>
          <CardDescription>
            Танд юу ирэхийг сонгоорой. Бид хэт олон мэдэгдэл илгээхгүй.
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
                  aria-label={`"${row.label}" мэдэгдлийг асаах/унтраах`}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Plan & billing */}
      <Card>
        <CardHeader>
          <CardTitle>Багц ба төлбөр</CardTitle>
          <CardDescription>
            Таны захиалга болон дараагийн нэхэмжлэх.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                <Crown className="size-5" />
              </span>
              <div>
                <p className="font-semibold">Студи — $99/сар</p>
                <p className="text-xs text-muted-foreground">
                  Дараагийн нэхэмжлэх: {formatDate("2026-08-01")}
                </p>
              </div>
            </div>
            <Link
              href="/pricing"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Багц удирдах
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
          <CardTitle className="text-destructive">Аюултай бүс</CardTitle>
          <CardDescription>
            Ажлын орчноо устгавал бүх төсөл, захиалга, зурвас устана.
            Энэ үйлдлийг буцаах боломжгүй.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger render={<Button variant="destructive" />}>
              <Trash2 className="size-4" />
              Ажлын орчин устгах
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ажлын орчныг устгах уу?</DialogTitle>
                <DialogDescription>
                  Энэ үйлдэл &ldquo;Harbor &amp; Co.&rdquo;-г бүх төсөл,
                  захиалга, харилцан ярианы түүхийн хамт бүрмөсөн устгана.
                  Буцаах боломжгүй.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteOpen(false)}
                >
                  Цуцлах
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteOpen(false)}
                >
                  Тийм, бүгдийг устгах
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
