import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";

export default function SideNav() {
  return (
    <aside className="flex h-full flex-col border-r border-slate-800 bg-slate-950 px-3 py-4 md:px-2">
      <Link
        href="/"
        className="mb-6 px-3 text-lg font-semibold text-slate-100 hover:text-cyan-300"
      >
        Network Monitoring
      </Link>
      <NavLinks />
    </aside>
  );
}
