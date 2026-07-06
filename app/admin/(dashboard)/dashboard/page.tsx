import { getTreks } from "@/lib/data-store";
import {
  TrendingUp,
  Mountain,
  Users as UsersIcon,
  IndianRupee,
} from "lucide-react";
import Link from "next/link";
import { getServerBaseUrl } from "@/lib/server-url";

export default async function AdminDashboardPage() {
  const treks = await getTreks();
  const baseUrl = await getServerBaseUrl();

  const usersRes = await fetch(`${baseUrl}/api/user`, {
    cache: "no-store",
  });
  const users = usersRes.ok ? await usersRes.json() : [];

  const totalTreks = treks.length;
  const totalUsers = users.length;
  const totalBookings = users.reduce(
    (acc: number, user: any) => acc + (user.treksBooked || 0),
    0,
  );
  const revenue = totalBookings * 2499; // Approximated average value
  const featuredTreks = treks.filter((t) => t.featured);

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-[#2D5016]">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-[#8B7355]">
        Welcome back! Here&apos;s what&apos;s happening.
      </p>

      {/* Stats */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Mountain}
          label="Total Treks"
          value={totalTreks}
          color="#4A7C3F"
        />
        <StatCard
          icon={UsersIcon}
          label="Total Users"
          value={totalUsers}
          color="#C4622D"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Bookings"
          value={totalBookings}
          color="#7BAF6E"
        />
        <StatCard
          icon={IndianRupee}
          label="Revenue"
          value={`₹${(revenue / 1000).toFixed(1)}K`}
          color="#2D5016"
        />
      </div>

      {/* Featured Treks */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-[#2D5016]">
            Featured Treks
          </h2>
          <Link
            href="/admin/treks"
            className="text-xs font-bold uppercase tracking-widest text-[#4A7C3F] transition-colors hover:text-[#2D5016]"
          >
            View All
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTreks.map((trek) => (
            <Link
              key={trek.slug}
              href={`/admin/treks/${trek.slug}/edit`}
              className="clay-card-sm rounded-2xl p-5 transition-all hover:-translate-y-1"
            >
              <h3 className="font-serif text-base font-medium text-[#2D5016]">
                {trek.title}
              </h3>
              <p className="mt-1 text-xs text-[#8B7355]">{trek.location}</p>
              <div className="mt-3 flex items-center gap-3 text-xs font-medium">
                <span className="rounded-full bg-[#4A7C3F]/10 px-3 py-1 text-[#4A7C3F]">
                  {trek.difficulty}
                </span>
                <span className="text-[#8B7355]">₹{trek.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="font-serif text-xl font-semibold text-[#2D5016]">
          Quick Actions
        </h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/admin/treks/new"
            className="btn-clay-primary rounded-full px-6 py-3 text-xs"
          >
            Add New Trek
          </Link>
          <Link
            href="/treks"
            target="_blank"
            className="btn-clay-light rounded-full px-6 py-3 text-xs"
          >
            View Site
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="clay-card-sm rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${color}15`, color }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#8B7355]">
            {label}
          </p>
          <p className="mt-0.5 font-serif text-2xl font-semibold text-[#2D5016]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
