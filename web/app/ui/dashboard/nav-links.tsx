"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Customers", href: "/dashboard/customers" },
  { name: "Invoices", href: "/dashboard/invoices" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1" aria-label="Main navigation">
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === link.href ||
                pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
                ? "rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-cyan-300"
                : "rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
            }
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
