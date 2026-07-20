"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  LayoutTemplate,
  Loader2,
  Palette,
  Rocket,
  Send,
  ShoppingBag,
  UtensilsCrossed,
  Wand2,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { budgetMeta, websiteTypeMeta } from "@/data/orders";
import { submitOrderRequest } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { BudgetRange, OrderRequestInput, WebsiteType } from "@/types";

const typeIcons: Record<string, LucideIcon> = {
  Briefcase,
  ShoppingBag,
  Palette,
  UtensilsCrossed,
  Rocket,
  Wand2,
};

const STEPS = ["Вэбсайтын төрөл", "Төсөв", "Төслийн дэлгэрэнгүй", "Холбоо барих"] as const;

const PAGE_PRESETS = [
  "Нүүр",
  "Тухай",
  "Үйлчилгээ",
  "Үнэ",
  "Блог",
  "Холбоо барих",
  "Дэлгүүр",
  "Захиалга",
  "Асуулт хариулт",
  "Баг",
] as const;

const TIMELINES = ["Яаралтай", "1 сарын дотор", "1–3 сар", "Уян хатан"] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

const stepVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 48 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -48,
    transition: { duration: 0.2, ease: easeOut },
  }),
};

const gradientButton =
  "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-400";

const selectedCard =
  "border-indigo-500 shadow-[0_0_32px_-8px_theme(colors.indigo.500/50%)]";

export function OrderWizard({
  template,
}: {
  template: { id: string; name: string } | null;
}) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [input, setInput] = useState<OrderRequestInput>({
    websiteType: null,
    budget: null,
    templateId: template?.id ?? null,
    projectName: "",
    description: "",
    pagesNeeded: [],
    timeline: "",
    contact: { name: "", email: "", phone: "", company: "" },
  });

  const setField = <K extends keyof OrderRequestInput>(
    key: K,
    value: OrderRequestInput[K]
  ) => setInput((prev) => ({ ...prev, [key]: value }));

  const setContact = (
    key: keyof OrderRequestInput["contact"],
    value: string
  ) =>
    setInput((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: value },
    }));

  const togglePage = (page: string) =>
    setInput((prev) => ({
      ...prev,
      pagesNeeded: prev.pagesNeeded.includes(page)
        ? prev.pagesNeeded.filter((p) => p !== page)
        : [...prev.pagesNeeded, page],
    }));

  const stepValid = [
    input.websiteType !== null,
    input.budget !== null,
    input.projectName.trim().length > 0,
    input.contact.name.trim().length > 0 && input.contact.email.includes("@"),
  ][step];

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleSubmit = async () => {
    if (!stepValid || submitting) return;
    setSubmitting(true);
    const result = await submitOrderRequest(input);
    setOrderNumber(result.orderNumber);
    setSubmitting(false);
  };

  if (orderNumber) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="glass flex flex-col items-center rounded-2xl px-8 py-16 text-center"
      >
        <div className="glow-primary flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500">
          <Check className="size-10 text-white" strokeWidth={2.5} />
        </div>
        <h2 className="mt-8 text-2xl font-semibold tracking-tight">
          Хүсэлт хүлээн авлаа
        </h2>
        <Badge variant="secondary" className="mt-4 font-mono text-indigo-400">
          {orderNumber}
        </Badge>
        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
          Манай студи ажлын нэг өдрийн дотор хариу өгнө.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" className={gradientButton} render={<Link href="/dashboard" />}>
            Самбар руу очих
          </Button>
          <Button size="lg" variant="ghost" render={<Link href="/" />}>
            Нүүр хуудас руу буцах
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-start">
        {STEPS.map((label, i) => (
          <Fragment key={label}>
            {i > 0 && (
              <div
                aria-hidden
                className={cn(
                  "mx-2 mt-4 h-px flex-1 transition-colors",
                  i <= step
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500"
                    : "bg-border"
                )}
              />
            )}
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-all",
                  i < step &&
                    "bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25",
                  i === step &&
                    "border border-indigo-500 bg-secondary text-indigo-400 ring-4 ring-indigo-500/20",
                  i > step &&
                    "border border-border bg-secondary text-muted-foreground"
                )}
              >
                {i < step ? <Check className="size-4" strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden text-[11px] font-medium sm:block",
                  i === step ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>

      <Progress
        value={((step + 1) / STEPS.length) * 100}
        className="mt-5 [&_[data-slot=progress-track]]:h-1"
      />

      {/* Step body */}
      <div className="relative mt-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {step === 0 && (
              <StepWebsiteType
                value={input.websiteType}
                onSelect={(type) => setField("websiteType", type)}
              />
            )}
            {step === 1 && (
              <StepBudget
                value={input.budget}
                template={template}
                onSelect={(budget) => setField("budget", budget)}
              />
            )}
            {step === 2 && (
              <StepDetails
                input={input}
                onField={setField}
                onTogglePage={togglePage}
              />
            )}
            {step === 3 && <StepContact input={input} onContact={setContact} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => goTo(step - 1)}
          disabled={step === 0 || submitting}
          className={cn(step === 0 && "invisible")}
        >
          <ArrowLeft data-icon="inline-start" />
          Буцах
        </Button>

        {step < STEPS.length - 1 ? (
          <Button
            size="lg"
            className={gradientButton}
            disabled={!stepValid}
            onClick={() => goTo(step + 1)}
          >
            Үргэлжлүүлэх
            <ArrowRight data-icon="inline-end" />
          </Button>
        ) : (
          <Button
            size="lg"
            className={gradientButton}
            disabled={!stepValid || submitting}
            onClick={handleSubmit}
          >
            {submitting ? (
              <Loader2 data-icon="inline-start" className="animate-spin" />
            ) : (
              <Send data-icon="inline-start" />
            )}
            {submitting ? "Илгээж байна…" : "Хүсэлт илгээх"}
          </Button>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- Step 1 ---------------------------------- */

function StepWebsiteType({
  value,
  onSelect,
}: {
  value: WebsiteType | null;
  onSelect: (type: WebsiteType) => void;
}) {
  return (
    <div>
      <StepHeading
        title="Бид юу бүтээх вэ?"
        subtitle="Хамгийн ойр тохирохыг сонгоорой — дэлгэрэнгүйг хамтдаа нарийвчилна."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {(Object.keys(websiteTypeMeta) as WebsiteType[]).map((type) => {
          const meta = websiteTypeMeta[type];
          const Icon = typeIcons[meta.icon] ?? Wand2;
          const selected = value === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelect(type)}
              aria-pressed={selected}
              className={cn(
                "relative flex items-start gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-indigo-500/50",
                selected && selectedCard
              )}
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-400 transition-colors",
                  selected && "from-indigo-500/25 to-violet-500/25"
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{meta.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  {meta.description}
                </span>
              </span>
              {selected && (
                <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------- Step 2 ---------------------------------- */

function StepBudget({
  value,
  template,
  onSelect,
}: {
  value: BudgetRange | null;
  template: { id: string; name: string } | null;
  onSelect: (budget: BudgetRange) => void;
}) {
  return (
    <div>
      <StepHeading
        title="Таны төсөв хэд вэ?"
        subtitle="Ойролцоо хязгаар хангалттай — зөв хандлагыг санал болгоход бидэнд тусална."
      />

      {template && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3">
          <LayoutTemplate className="size-4 shrink-0 text-indigo-400" />
          <p className="text-sm text-indigo-300">
            Суурь загвар:{" "}
            <span className="font-semibold text-foreground">{template.name}</span>
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {(Object.keys(budgetMeta) as BudgetRange[]).map((budget) => {
          const meta = budgetMeta[budget];
          const selected = value === budget;
          return (
            <button
              key={budget}
              type="button"
              onClick={() => onSelect(budget)}
              aria-pressed={selected}
              className={cn(
                "flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 text-left transition-all hover:border-indigo-500/50",
                selected && selectedCard
              )}
            >
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                  selected ? "border-indigo-500" : "border-muted-foreground/40"
                )}
              >
                {selected && (
                  <span className="size-2 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400" />
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="text-sm font-semibold">{meta.label}</span>
                <span className="text-xs text-muted-foreground">{meta.hint}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------- Step 3 ---------------------------------- */

function StepDetails({
  input,
  onField,
  onTogglePage,
}: {
  input: OrderRequestInput;
  onField: <K extends keyof OrderRequestInput>(
    key: K,
    value: OrderRequestInput[K]
  ) => void;
  onTogglePage: (page: string) => void;
}) {
  return (
    <div>
      <StepHeading
        title="Төслийнхөө талаар бидэнд хэлээрэй"
        subtitle="Та мэдээлэл дэлгэрэнгүй өгөх тусам бидний анхны санал оновчтой болно."
      />
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="projectName">Төслийн нэр</Label>
          <Input
            id="projectName"
            value={input.projectName}
            onChange={(e) => onField("projectName", e.target.value)}
            placeholder="ж.нь: Harbor & Co. шинэчлэл"
            className="h-10"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Тайлбар</Label>
          <Textarea
            id="description"
            value={input.description}
            onChange={(e) => onField("description", e.target.value)}
            placeholder="Таны зорилго юу вэ? Хэнд зориулагдсан бэ? Таалагддаг сайтууд байвал бичээрэй."
            className="min-h-28"
          />
        </div>

        <div className="grid gap-2">
          <Label>Шаардлагатай хуудсууд</Label>
          <div className="flex flex-wrap gap-2">
            {PAGE_PRESETS.map((page) => {
              const selected = input.pagesNeeded.includes(page);
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => onTogglePage(page)}
                  aria-pressed={selected}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                    selected
                      ? "border-indigo-500 bg-indigo-500/15 text-indigo-300"
                      : "border-border bg-secondary text-muted-foreground hover:border-indigo-500/40 hover:text-foreground"
                  )}
                >
                  {selected && <Check className="size-3" strokeWidth={3} />}
                  {page}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Хугацаа</Label>
          <Select
            value={input.timeline || null}
            onValueChange={(value) => {
              if (typeof value === "string") onField("timeline", value);
            }}
          >
            <SelectTrigger className="h-10 w-full sm:w-64">
              <SelectValue placeholder="Хэзээ хэрэгтэй вэ?" />
            </SelectTrigger>
            <SelectContent>
              {TIMELINES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Step 4 ---------------------------------- */

function StepContact({
  input,
  onContact,
}: {
  input: OrderRequestInput;
  onContact: (key: keyof OrderRequestInput["contact"], value: string) => void;
}) {
  const typeLabel = input.websiteType
    ? websiteTypeMeta[input.websiteType].label
    : "—";
  const budgetLabel = input.budget ? budgetMeta[input.budget].label : "—";

  return (
    <div>
      <StepHeading
        title="Бид тантай хэрхэн холбогдох вэ?"
        subtitle="Санал болон дараагийн алхмуудыг энэ хаяг руу илгээнэ."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contactName">Нэр</Label>
          <Input
            id="contactName"
            value={input.contact.name}
            onChange={(e) => onContact("name", e.target.value)}
            placeholder="Таны бүтэн нэр"
            className="h-10"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contactEmail">Имэйл</Label>
          <Input
            id="contactEmail"
            type="email"
            value={input.contact.email}
            onChange={(e) => onContact("email", e.target.value)}
            placeholder="tany@kompani.mn"
            className="h-10"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contactPhone">Утас (заавал биш)</Label>
          <Input
            id="contactPhone"
            type="tel"
            value={input.contact.phone}
            onChange={(e) => onContact("phone", e.target.value)}
            placeholder="+976 8800 0000"
            className="h-10"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contactCompany">Компани (заавал биш)</Label>
          <Input
            id="contactCompany"
            value={input.contact.company}
            onChange={(e) => onContact("company", e.target.value)}
            placeholder="Компани эсвэл студийн нэр"
            className="h-10"
          />
        </div>
      </div>

      <Card className="glass mt-6 border-none">
        <CardContent className="pt-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-indigo-400">
            Хүсэлтийн тойм
          </p>
          <Separator className="my-4" />
          <dl className="grid gap-3 text-sm">
            <SummaryRow label="Вэбсайтын төрөл" value={typeLabel} />
            <SummaryRow label="Төсөв" value={budgetLabel} />
            <SummaryRow
              label="Төслийн нэр"
              value={input.projectName.trim() || "—"}
            />
            <SummaryRow
              label="Хуудсууд"
              value={
                input.pagesNeeded.length > 0
                  ? `${input.pagesNeeded.length} сонгосон`
                  : "Тодорхойлоогүй"
              }
            />
            <SummaryRow label="Хугацаа" value={input.timeline || "Уян хатан"} />
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

/* --------------------------------- Helpers ---------------------------------- */

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="truncate text-right font-medium">{value}</dd>
    </div>
  );
}
