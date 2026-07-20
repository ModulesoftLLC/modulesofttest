import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Container } from "@/components/shared/container";

const columns = [
  {
    title: "Бүтээгдэхүүн",
    links: [
      { label: "Загварууд", href: "/templates" },
      { label: "Вэбсайт бүтээгч", href: "/builder" },
      { label: "Код засварлагч", href: "/editor" },
      { label: "Үнэ", href: "/pricing" },
      { label: "Төсөл эхлүүлэх", href: "/order" },
    ],
  },
  {
    title: "Компани",
    links: [
      { label: "Бидний тухай", href: "/about" },
      { label: "Үйлчилгээ", href: "/services" },
      { label: "Портфолио", href: "/portfolio" },
      { label: "Блог", href: "/blog" },
    ],
  },
  {
    title: "Тусламж",
    links: [
      { label: "Холбоо барих", href: "/contact" },
      { label: "Хэрэглэгчийн самбар", href: "/dashboard" },
      { label: "Админ", href: "/admin" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Амбицтай бизнесүүдэд зориулсан дээд зэрэглэлийн вэбсайтууд.
              Загвараас сонгож, визуалаар бүтээж, эсвэл манай студиэр
              захиалгат шийдэл хийлгээрэй.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© 2026 MODULESOFT. Бүх эрх хуулиар хамгаалагдсан.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer transition-colors hover:text-white">Нууцлал</span>
            <span className="cursor-pointer transition-colors hover:text-white">Үйлчилгээний нөхцөл</span>
            <span className="cursor-pointer transition-colors hover:text-white">Twitter / X</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
