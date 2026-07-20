"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ExternalLink,
  LayoutTemplate,
  MoreHorizontal,
  Pencil,
  Plus,
  ShoppingCart,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TemplateThumbnail } from "@/components/shared/template-thumbnail";
import { templates as initialTemplates } from "@/data/templates";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Template, TemplateCategory } from "@/types";

const categoryOptions: { value: TemplateCategory; label: string }[] = [
  { value: "business", label: "Business" },
  { value: "restaurant", label: "Restaurant" },
  { value: "hotel", label: "Hotel" },
  { value: "school", label: "School" },
  { value: "medical", label: "Medical" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "portfolio", label: "Portfolio" },
  { value: "ai-startup", label: "AI Startup" },
  { value: "landing-page", label: "Landing Page" },
];

export default function AdminTemplatesPage() {
  const [templateList, setTemplateList] =
    useState<Template[]>(initialTemplates);
  const [addOpen, setAddOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Template | null>(null);

  const [draftName, setDraftName] = useState("");
  const [draftCategory, setDraftCategory] =
    useState<TemplateCategory>("business");
  const [draftPrice, setDraftPrice] = useState("79");

  const toggleFeatured = (id: string, isFeatured: boolean) => {
    setTemplateList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFeatured } : t))
    );
  };

  const handleCreate = () => {
    const name = draftName.trim() || "Untitled template";
    setAddOpen(false);
    setDraftName("");
    setDraftPrice("79");
    setNotice(`“${name}” was queued for review. (Mock — nothing was saved.)`);
    window.setTimeout(() => setNotice(null), 4000);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setTemplateList((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const stats = [
    {
      label: "Total templates",
      value: templateList.length.toLocaleString("en-US"),
      icon: LayoutTemplate,
      tint: "bg-indigo-500/15 text-indigo-400",
    },
    {
      label: "Featured",
      value: templateList.filter((t) => t.isFeatured).length.toString(),
      icon: Star,
      tint: "bg-violet-500/15 text-violet-400",
    },
    {
      label: "New",
      value: templateList.filter((t) => t.isNew).length.toString(),
      icon: Sparkles,
      tint: "bg-fuchsia-500/15 text-fuchsia-400",
    },
    {
      label: "Total sales",
      value: templateList
        .reduce((sum, t) => sum + t.sales, 0)
        .toLocaleString("en-US"),
      icon: ShoppingCart,
      tint: "bg-emerald-500/15 text-emerald-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the marketplace catalog — feature, edit, or retire
            templates.
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger
            render={
              <Button className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:from-indigo-400 hover:to-fuchsia-400" />
            }
          >
            <Plus />
            Add template
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add template</DialogTitle>
              <DialogDescription>
                Create a new marketplace template. This is a mock form — no
                data is persisted.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Name</Label>
                <Input
                  id="template-name"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  placeholder="e.g. Meridian Studio"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-category">Category</Label>
                <Select
                  items={categoryOptions}
                  value={draftCategory}
                  onValueChange={(value) =>
                    setDraftCategory(value as TemplateCategory)
                  }
                >
                  <SelectTrigger
                    id="template-category"
                    className="w-full"
                    aria-label="Template category"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-price">Price (USD)</Label>
                <Input
                  id="template-price"
                  type="number"
                  min="0"
                  value={draftPrice}
                  onChange={(event) => setDraftPrice(event.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {notice && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-400">
          <CheckCircle2 className="size-4 shrink-0" />
          {notice}
        </div>
      )}

      {/* Stats */}
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

      {/* Template grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {templateList.map((template) => (
          <Card key={template.id} className="pt-0">
            <TemplateThumbnail
              template={template}
              className="aspect-video w-full"
            />
            <CardContent className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{template.name}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <Badge
                      variant="secondary"
                      className="bg-indigo-500/15 text-indigo-400 capitalize"
                    >
                      {template.category.replace("-", " ")}
                    </Badge>
                    {template.isNew && (
                      <Badge
                        variant="secondary"
                        className="bg-fuchsia-500/15 text-fuchsia-400"
                      >
                        New
                      </Badge>
                    )}
                  </div>
                </div>
                <span className="shrink-0 font-semibold tabular-nums text-indigo-400">
                  {formatCurrency(template.price)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ShoppingCart className="size-3.5" />
                  {template.sales.toLocaleString("en-US")} sales
                </span>
                <span className="flex items-center gap-1">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  {template.rating}
                </span>
                <span className="ml-auto">
                  Updated {formatDate(template.updatedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Switch
                    size="sm"
                    checked={template.isFeatured}
                    onCheckedChange={(checked) =>
                      toggleFeatured(template.id, checked)
                    }
                    aria-label={`Feature ${template.name}`}
                  />
                  Featured
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Actions for ${template.name}`}
                      />
                    }
                  >
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem disabled>
                      <Pencil />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      render={<Link href={`/templates/${template.slug}`} />}
                    >
                      <ExternalLink />
                      View live
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setDeleteTarget(template)}
                    >
                      <Trash2 />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete confirmation */}
      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete template?</DialogTitle>
            <DialogDescription>
              &ldquo;{deleteTarget?.name}&rdquo; will be removed from the
              marketplace. This mock action only updates the local list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
