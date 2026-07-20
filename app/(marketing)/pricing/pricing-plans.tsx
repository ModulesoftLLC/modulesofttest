"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
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
            yearly ? "text-white/50" : "text-white"
          )}
        >
          Сараар
        </span>
        <Switch
          checked={yearly}
          onCheckedChange={(checked) => setYearly(checked)}
          aria-label="Жилийн төлбөрт шилжүүлэх"
        />
        <span
          className={cn(
            "text-sm font-medium",
            yearly ? "text-white" : "text-white/50"
          )}
        >
          Жилээр
        </span>
        <span className="liquid-glass rounded-full px-3 py-1 text-xs text-white/80">
          2 сар үнэгүй
        </span>
      </div>

      <Stagger className="grid items-stretch gap-6 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
          const savings = yearlySavings(plan);
          return (
            <StaggerItem key={plan.id} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl p-8 transition-transform hover:scale-105",
                  plan.highlighted
                    ? "liquid-glass-strong pt-14 lg:-my-4 lg:py-14"
                    : "liquid-glass"
                )}
              >
                <div className="relative z-10 flex flex-1 flex-col">
                  {plan.highlighted && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
                      Хамгийн эрэлттэй
                    </span>
                  )}
                  <h3 className="text-lg font-medium text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-white/60">
                    {plan.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-4xl font-medium tracking-tight text-white">
                      {formatCurrency(price)}
                    </span>
                    <span className="text-sm text-white/50">
                      /{yearly ? "жил" : "сар"}
                    </span>
                  </div>
                  <p className="mt-1.5 h-5 text-xs text-white/70">
                    {yearly && savings > 0
                      ? `Жилд ${formatCurrency(savings)} хэмнэнэ`
                      : " "}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-white/80"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-white/60" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.monthlyPrice === 0 ? "/templates" : "/order"}
                    className={cn(
                      "mt-8 inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-transform hover:scale-105 active:scale-95",
                      plan.highlighted
                        ? "bg-white text-black"
                        : "bg-white/10 text-white"
                    )}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <p className="mt-12 text-center text-sm text-white/50">
        Бүх багцад SSL, дэлхийн CDN байршуулалт, автомат нөөцлөлт багтсан.
        Студийн төслүүд болон нэг удаагийн бүтээн байгуулалт тусад нь
        үнэлэгддэг — эхлэх үнийг{" "}
        <Link
          href="/services"
          className="text-white underline-offset-4 hover:underline"
        >
          үйлчилгээ
        </Link>{" "}
        хэсгээс хараарай.
      </p>
    </div>
  );
}
