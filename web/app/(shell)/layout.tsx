import SideNav from "@/app/ui/dashboard/sidenav";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:h-screen md:w-64">
        <SideNav />
      </div>
      <div className="grow md:overflow-y-auto">{children}</div>
    </div>
  );
}
