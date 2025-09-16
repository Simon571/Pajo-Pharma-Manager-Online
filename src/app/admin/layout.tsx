"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Bot, LayoutDashboard, ShoppingCart, Warehouse, PanelLeft, LogOut, CheckSquare, List, BrainCircuit } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarTrigger, useSidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import useStore from "@/hooks/use-store";

const AdminLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { userRole, setUserRole } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const { open, setOpen } = useSidebar();

  const handleLogout = () => {
    setUserRole(null);
    router.push("/login");
  };

  const menuItems = [
    { href: "/admin/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/admin/inventory", label: "Inventaire", icon: Warehouse },
    { href: "/admin/inventory-config", label: "Configuration inventaire", icon: CheckSquare },
    { href: "/admin/sales", label: "Ventes", icon: ShoppingCart },
    { href: "/admin/ai-ordering", label: "Commande IA", icon: Bot },
    { href: "/admin/strategic-analysis", label: "Analyse Stratégique", icon: BrainCircuit },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-sidebar-primary" />
            <span className="text-lg font-semibold text-sidebar-primary">PajoPharma</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname === item.href ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-primary hover:bg-sidebar-accent/80'}`}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <div className="mt-auto p-4">
          <Button onClick={handleLogout} className="w-full justify-start gap-3">
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">
              {menuItems.find(item => item.href === pathname)?.label || 'Admin'}
            </h1>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/40 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <AdminLayoutContent>{children}</AdminLayoutContent>
  </SidebarProvider>
);

export default AdminLayout;
