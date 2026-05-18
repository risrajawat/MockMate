"use client";

import Link from 'next/link';
import { useState } from 'react';

const ROLES = [
  {
    id: "Frontend Developer",
    title: "Frontend Developer",
    icon: "web",
    description: "React, Vue, performance optimization, and CSS wizardry challenges."
  },
  {
    id: "Backend Developer",
    title: "Backend Developer",
    icon: "database",
    description: "Systems design, API architectures, and scalable database management."
  },
  {
    id: "Data Scientist",
    title: "Data Scientist",
    icon: "query_stats",
    description: "Machine learning, statistics, and complex data visualization scenarios."
  },
  {
    id: "HR Interview",
    title: "HR Interview",
    icon: "groups",
    description: "Behavioral questions, culture fit, and soft skills evaluation."
  },
  {
    id: "Product Manager",
    title: "Product Manager",
    icon: "account_tree",
    description: "Roadmapping, stakeholder management, and product-market fit."
  }
];

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");

  return (
    <div className="max-w-5xl mx-auto px-8 py-12 pb-32">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex flex-col items-center mb-6">
          <div className="text-[10px] tracking-widest text-cyan-400 font-bold uppercase mb-2">Interview Setup</div>
          <div className="flex gap-2">
            <div className="h-0.5 w-12 bg-cyan-400 rounded-full"></div>
            <div className="h-0.5 w-12 bg-white/10 rounded-full"></div>
          </div>
          <div className="text-xs text-zinc-500 mt-2">Step 2 of 3</div>
        </div>
        <h1 className="text-4xl font-bold font-h2 mb-4">Select Your Role</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Choose the track you want to master. Our AI will tailor technical and behavioral questions specifically for this career path.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROLES.map((role) => {
          const isSelected = selectedRole === role.id;
          
          return (
            <div 
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`rounded-xl p-6 relative cursor-pointer transition-colors flex flex-col min-h-[220px] group ${
                isSelected 
                  ? 'bg-zinc-900/30 border-2 border-cyan-400 hover:bg-zinc-900/50 shadow-[0_0_15px_rgba(0,229,255,0.1)]' 
                  : 'bg-zinc-900/30 border border-white/5 hover:bg-white/5 hover:border-white/10'
              }`}
            >
              <div className={`w-10 h-10 rounded flex items-center justify-center mb-4 ${
                isSelected ? 'bg-cyan-400/10 text-cyan-400' : 'bg-white/5 text-zinc-300'
              }`}>
                <span className="material-symbols-outlined text-[20px]">{role.icon}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{role.title}</h3>
              <p className="text-xs text-zinc-400 flex-grow mb-6">{role.description}</p>
              
              {isSelected ? (
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
                  Selected
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-zinc-500 text-sm font-bold group-hover:text-zinc-300 transition-colors">
                  Choose Role
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Other Role Card */}
        <div 
          onClick={() => setSelectedRole("Other Role")}
          className={`rounded-xl p-6 cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[220px] ${
            selectedRole === "Other Role"
              ? 'bg-zinc-900/30 border-2 border-cyan-400 hover:bg-zinc-900/50 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
              : 'border border-dashed border-white/10 hover:bg-white/5 hover:border-white/20'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            selectedRole === "Other Role" ? 'bg-cyan-400/10 text-cyan-400' : 'bg-white/5 text-zinc-400'
          }`}>
            {selectedRole === "Other Role" ? (
              <span className="material-symbols-outlined text-[24px]">check</span>
            ) : (
              <span className="material-symbols-outlined text-[24px]">add</span>
            )}
          </div>
          <h3 className={`text-lg font-bold ${selectedRole === "Other Role" ? 'text-cyan-400' : 'text-zinc-300'}`}>
            Other Role
          </h3>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] max-w-4xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 z-50 ml-0 md:ml-32">
        <div>
          <h3 className="text-xl font-bold mb-1">{selectedRole} Selected</h3>
          <p className="text-sm text-zinc-400">Estimated session duration: 25 minutes</p>
        </div>
        <Link href="/interview" className="w-full sm:w-auto bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-bold py-4 px-8 rounded-xl transition-colors shadow-[0_0_20px_rgba(0,229,255,0.3)] block text-center">
          Start Interview Session
        </Link>
      </div>
    </div>
  );
}
