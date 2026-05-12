"use client";

import { Phone, Mail, Calendar, Mountain } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  treksBooked: number;
  joinedAt: string;
}

export function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="clay-card-sm overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr
              className="text-xs font-bold uppercase tracking-widest text-[#8B7355]"
              style={{ background: "#F5F0E8" }}
            >
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Treks Booked</th>
              <th className="px-6 py-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-[#E8D5B7]/50 transition-colors hover:bg-[#F5F0E8]/50"
              >
                <td className="px-6 py-4">
                  <span className="font-medium text-[#2D5016]">
                    {user.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-xs text-[#8B7355]">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#8B7355]">
                      <Phone className="h-3 w-3" />
                      {user.phone}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-[#4A7C3F]">
                    <Mountain className="h-3.5 w-3.5" />
                    {user.treksBooked}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-[#8B7355]">
                    <Calendar className="h-3 w-3" />
                    {user.joinedAt}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
