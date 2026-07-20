"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl border border-border bg-card p-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="size-7 text-emerald-400" />
        </span>
        <h3 className="mt-6 text-xl font-semibold">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out — a real person will reply within one
          business day. If it’s urgent, mention it in a follow-up and we’ll
          bump you up the queue.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 text-sm font-medium text-indigo-400 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-xl border border-border bg-card p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            placeholder="Ada Lovelace"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="ada@company.com"
            required
          />
        </div>
      </div>
      <div className="mt-5 grid gap-2">
        <Label htmlFor="contact-company">
          Company{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Input id="contact-company" name="company" placeholder="Company Inc." />
      </div>
      <div className="mt-5 grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="Tell us a little about your project, question, or idea…"
          required
          className="min-h-32"
        />
      </div>
      <button
        type="submit"
        className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-colors hover:from-indigo-400 hover:to-violet-400"
      >
        Send message <Send className="size-4" />
      </button>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        We’ll only use your details to reply — never for a mailing list you
        didn’t ask for.
      </p>
    </form>
  );
}
