"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, FolderKanban, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { messageThreads } from "@/data/messages";
import { projects } from "@/data/projects";
import { currentUser } from "@/data/users";
import { formatRelativeTime, initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Message } from "@/types";

const sortedThreads = [...messageThreads].sort(
  (a, b) =>
    new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
);

function projectName(projectId: string | null): string | null {
  if (projectId === null) return null;
  return projects.find((p) => p.id === projectId)?.name ?? null;
}

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState(sortedThreads[0]?.id ?? "");
  const [mobileConversation, setMobileConversation] = useState(false);
  const [draft, setDraft] = useState("");
  const [sentMessages, setSentMessages] = useState<Record<string, Message[]>>(
    {}
  );

  const thread = useMemo(
    () => sortedThreads.find((t) => t.id === selectedId) ?? sortedThreads[0],
    [selectedId]
  );

  const conversation = thread
    ? [...thread.messages, ...(sentMessages[thread.id] ?? [])]
    : [];

  const linkedProject = thread ? projectName(thread.projectId) : null;

  function handleSend() {
    const body = draft.trim();
    if (!thread || body.length === 0) return;
    const message: Message = {
      id: `local-${Date.now()}`,
      threadId: thread.id,
      from: currentUser.name,
      fromRole: "customer",
      preview: body.slice(0, 80),
      body,
      sentAt: new Date().toISOString(),
      unread: false,
    };
    setSentMessages((prev) => ({
      ...prev,
      [thread.id]: [...(prev[thread.id] ?? []), message],
    }));
    setDraft("");
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-6xl flex-col lg:h-[calc(100vh-10rem)]">
      <div className="grid min-h-0 flex-1 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-[300px_1fr]">
        {/* Thread list */}
        <div
          className={cn(
            "min-h-0 flex-col border-border md:flex md:border-r",
            mobileConversation ? "hidden" : "flex"
          )}
        >
          <div className="border-b border-border px-4 py-4">
            <h1 className="font-semibold">Зурвасууд</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Дизайн багтайгаа харилцах яриа
            </p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {sortedThreads.map((item) => {
              const last = item.messages[item.messages.length - 1];
              const active = item.id === thread?.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(item.id);
                    setMobileConversation(true);
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors",
                    active ? "bg-accent" : "hover:bg-accent/50"
                  )}
                >
                  <Avatar className="size-9 shrink-0">
                    <AvatarFallback className="bg-secondary text-xs font-medium">
                      {initials(item.participant)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-sm font-medium">
                        {item.participant}
                      </p>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {formatRelativeTime(item.lastMessageAt)}
                      </span>
                    </div>
                    <p className="truncate text-xs font-medium text-muted-foreground">
                      {item.subject}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                        {last?.preview}
                      </p>
                      {item.unreadCount > 0 && (
                        <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-semibold text-white">
                          {item.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation */}
        <div
          className={cn(
            "min-h-0 flex-col md:flex",
            mobileConversation ? "flex" : "hidden"
          )}
        >
          {thread ? (
            <>
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="md:hidden"
                  aria-label="Буцах"
                  onClick={() => setMobileConversation(false)}
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{thread.subject}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Харилцагч: {thread.participant}
                  </p>
                </div>
                {linkedProject && (
                  <Badge className="hidden border-0 bg-indigo-500/15 text-indigo-400 sm:flex">
                    <FolderKanban className="size-3" />
                    {linkedProject}
                  </Badge>
                )}
              </div>

              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
                {conversation.map((message) => {
                  const mine = message.from === currentUser.name;
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-end gap-2.5",
                        mine && "flex-row-reverse"
                      )}
                    >
                      {!mine && (
                        <Avatar className="size-7 shrink-0">
                          <AvatarFallback className="bg-secondary text-[10px] font-medium">
                            {initials(message.from)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                          mine
                            ? "rounded-br-md bg-indigo-500/20 text-foreground"
                            : "rounded-bl-md bg-secondary"
                        )}
                      >
                        <p className="whitespace-pre-wrap">{message.body}</p>
                        <p
                          className={cn(
                            "mt-1 text-[10px] text-muted-foreground",
                            mine && "text-right"
                          )}
                        >
                          {formatRelativeTime(message.sentAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator />
              <form
                className="flex items-end gap-2 p-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSend();
                }}
              >
                <Textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Зурвас бичих…"
                  className="max-h-32 min-h-10 flex-1 resize-none bg-secondary/50"
                  rows={1}
                />
                <Button
                  type="submit"
                  size="icon"
                  aria-label="Илгээх"
                  disabled={draft.trim().length === 0}
                  className="shrink-0 bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-400"
                >
                  <Send className="size-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Эхлэхийн тулд харилцан яриа сонгоно уу.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
