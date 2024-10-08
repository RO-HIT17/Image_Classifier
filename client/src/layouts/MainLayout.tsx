import * as React from "react";
import { NavBar } from "../components/NavBar";
import { Sidebar } from "../components/Sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <NavBar />

        {/* Main Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
