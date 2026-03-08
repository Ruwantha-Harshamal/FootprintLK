"use client";

import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-primary/10 p-6 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
