"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Archive,
  Copy,
  ExternalLink,
  FolderOpen,
  MoreHorizontal,
  PenTool,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects, projectStatusMeta } from "@/data/projects";
import { formatDate, initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types";

type FilterValue = "all" | ProjectStatus;

const filters: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in-progress", label: "In progress" },
  { value: "in-review", label: "In review" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On hold" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.status === filter);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every site your team is building, from first draft to launch.
          </p>
        </div>
        <Link
          href="/order"
          className={cn(
            buttonVariants(),
            "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-400"
          )}
        >
          <Plus className="size-4" />
          New project
        </Link>
      </div>

      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as FilterValue)}
      >
        <TabsList className="h-auto flex-wrap">
          {filters.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {visible.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <FolderOpen className="size-5" />
            </span>
            <div>
              <p className="font-medium">
                No {filters.find((f) => f.value === filter)?.label.toLowerCase()}{" "}
                projects
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Nothing here yet — try another filter or start something new.
              </p>
            </div>
            <Link
              href="/order"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Start a project
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => (
            <Card key={project.id} className="gap-0 overflow-hidden py-0">
              <div
                className="relative h-28"
                style={{
                  background: `linear-gradient(135deg, ${project.thumbnailPalette.from}, ${project.thumbnailPalette.to})`,
                }}
              >
                <Badge
                  className={cn(
                    "absolute right-3 top-3 border-0 backdrop-blur",
                    projectStatusMeta[project.status].className
                  )}
                >
                  {projectStatusMeta[project.status].label}
                </Badge>
              </div>

              <CardContent className="flex-1 space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold">{project.name}</h2>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {project.client}
                    </p>
                  </div>
                  {project.team.length > 0 && (
                    <div className="flex shrink-0 -space-x-2">
                      {project.team.map((member) => (
                        <Avatar
                          key={member}
                          className="size-7 ring-2 ring-card"
                          title={member}
                        >
                          <AvatarFallback className="bg-secondary text-[10px] font-medium">
                            {initials(member)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="tabular-nums">{project.progress}%</span>
                  </div>
                  <Progress
                    value={project.progress}
                    className="[&_[data-slot=progress-indicator]]:bg-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Created {formatDate(project.createdAt)}</span>
                  <span>Due {formatDate(project.dueDate)}</span>
                </div>
              </CardContent>

              <CardFooter className="flex items-center gap-2 border-t border-border p-4">
                <Link
                  href="/builder"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "flex-1"
                  )}
                >
                  <PenTool className="size-3.5" />
                  Open in builder
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Actions for ${project.name}`}
                      />
                    }
                  >
                    <MoreHorizontal className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem disabled={project.domain === null}>
                      <ExternalLink className="size-4" />
                      View site
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="size-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Archive className="size-4" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
