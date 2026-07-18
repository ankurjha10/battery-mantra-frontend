import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Users, ShoppingCart, Package, LogOut, Layers, Tag, Car, Image, PhoneCall, MapPin } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/providers/AuthProvider";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: Layers },
  { name: "Brands", href: "/admin/brands", icon: Tag },
  { name: "Vehicles", href: "/admin/vehicles", icon: Car },
  { name: "Capacities (RL)", href: "/admin/capacities", icon: Layers },
  { name: "Manufacturers", href: "/admin/manufacturers", icon: Layers },
  { name: "Locations", href: "/admin/locations", icon: MapPin },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Banners", href: "/admin/banners", icon: Image },
  { name: "Callbacks", href: "/admin/callbacks", icon: PhoneCall },
];

const seoNavigation = [
  { name: "Google Products Feed", href: "/api/seo/google-feed.xml", icon: Package, external: true },
  { name: "SEO Pages", href: "/admin/seo/pages", icon: Layers },
  { name: "SEO Quick (Brands)", href: "/admin/seo/quick/brands", icon: Tag },
  { name: "SEO Quick (Manufacturers)", href: "/admin/seo/quick/manufacturers", icon: Layers },
  { name: "SEO Quick (Categories)", href: "/admin/seo/quick/categories", icon: Layers },
  { name: "SEO Quick (Products)", href: "/admin/seo/quick/products", icon: Package },
];

export function AdminSidebar() {
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-primary">
          BatteryMantra
          <span className="text-xs font-normal text-muted-foreground uppercase tracking-widest ml-2">Admin</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                      <Link to={item.href}>
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>SEO</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {seoNavigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive && !item.external} tooltip={item.name}>
                      {item.external ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                          <item.icon />
                          <span>{item.name}</span>
                        </a>
                      ) : (
                        <Link to={item.href}>
                          <item.icon />
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => signOut()} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
              <LogOut />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
