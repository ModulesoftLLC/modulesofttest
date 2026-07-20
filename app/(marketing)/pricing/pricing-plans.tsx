"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types";

function yearlySavings(plan: PricingPlan): number {
  return plan.monthlyPrice * 12 - plan.yearlyPrice;
}

export function PricingPlans({ plans }: { plans: PricingPlan[] }) {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      {/* Billing toggle */}
      <div className="mb-14 flex items-center justify-center gap-4">
        <span
          className={cn(
            "text-sm font-medium",
            yearly ? "text-muted-foreground" : "text-foreground"
          )}
        >
          Monthly
        </span>
        <Switch
          checked={yearly}
          onCheckedChange={(checked) => setYearly(checked)}
          aria-label="Toggle yearly billing"
        />
        <span
          className={cn(
            "text-sm font-medium",
            yearly ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Yearly
        </span>
        <Badge className="border-0 bg-emerald-500/15 text-emerald-300">
          2 months free
        </Badge>
      </div>

      <Stagger className="grid items-stretch gap-6 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
          const savings = yearlySavings(plan);
          return (
            <StaggerItem key={plan.id} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-card p-8",
                  plan.highlighted
                    ? "glow-primary border-indigo-400/40 lg:-my-4 lg:py-12"
                    : "card-hover border-border"
                )}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 border-0 bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25">
                    Most popular
                  </Badge>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight">
                    {formatCurrency(price)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    /{yearly ? "year" : "month"}
                  </span>
                </div>
                <p className="mt-1.5 h-5 text-xs text-emerald-300">
                  {yearly && savings > 0
                    ? `Save ${formatCurrency(savings)} a year`
                    : " "}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-foreground/90"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-indigo-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.monthlyPrice === 0 ? "/templates" : "/order"}
                  className={cn(
                    "mt-8 inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-medium transition-colors",
                    plan.highlighted
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-400"
                      : "border border-border bg-secondary/40 text-foreground hover:bg-secondary"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        All plans include SSL, global CDN hosting, and automatic backups.
        Studio engagements and one-off builds are quoted separately — see{" "}
        <Link
          href="/services"
          className="text-indigo-400 underline-offset-4 hover:underline"
        >
          services
        </Link>{" "}
        for starting prices.
      </p>
    </div>
  );
}
