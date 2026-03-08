"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home,
  Users,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/shared/hooks/useAuth';
import { useState } from 'react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  enabled: boolean;
  color?: string;
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    enabled: true,
  },
  {
    title: 'Data Breach Detection',
    href: '/dashboard/breach-detection',
    icon: ShieldAlert,
    enabled: true,
    color: 'text-destructive',
  },
  {
    title: 'Social Media Exposure',
    href: '/dashboard/social-media',
    icon: Users,
    enabled: true,
    color: 'text-blue-500',
  },
  {
    title: 'Image Prediction',
    href: '/dashboard/image-search',
    icon: ImageIcon,
    enabled: true,
    color: 'text-green-500',
  },
  {
    title: 'Privacy Compliance Advisor',
    href: '/dashboard/risk-scoring',
    icon: TrendingUp,
    enabled: true,
    color: 'text-orange-500',
  },

];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">FL</span>
          </div>
          <span className="text-lg font-bold">FootprintLK</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.enabled ? item.href : '#'}
              className={cn(
                'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                !item.enabled && 'cursor-not-allowed opacity-60'
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon className={cn('mr-3 h-5 w-5', item.color)} />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
      
      <Separator />
      
      {/* User section */}
      <div className="p-4">
        <div className="space-y-2">
          <Link
            href="/dashboard/settings"
            className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
          
          <Separator className="my-2" />
          
          <div className="px-3 py-2">
            <p className="text-xs font-medium text-muted-foreground">Logged in as</p>
            <p className="text-sm font-medium">{user?.email || 'User'}</p>
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      
      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-full w-64 border-r bg-background/80 backdrop-blur-xl shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
      
      {/* Desktop sidebar */}
      <aside className="hidden w-64 border-r bg-background/60 backdrop-blur-xl md:block relative z-10 shadow-lg">
        {sidebarContent}
      </aside>
    </>
  );
}
