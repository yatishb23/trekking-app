import Link from "next/link";
import { getTreks } from "@/lib/data-store";
import { TreksTable } from "@/components/admin/treks-table";

export default async function AdminTreksPage() {
  const treks = await getTreks();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#2D5016]">
            Treks
          </h1>
          <p className="mt-1 text-sm text-[#8B7355]">
            Manage your trek offerings ({treks.length} total)
          </p>
        </div>
        <Link
          href="/admin/treks/new"
          className="btn-clay-primary rounded-full px-6 py-3 text-xs"
        >
          Add New Trek
        </Link>
      </div>

      <div className="mt-8">
        {treks.length === 0 ? (
          <div className="clay-card-sm flex flex-col items-center justify-center rounded-2xl py-16">
            <Mountain className="mb-4 h-12 w-12 text-[#B8D4AA]" />
            <p className="font-serif text-lg font-medium text-[#8B7355]">
              No treks yet
            </p>
            <p className="mt-1 text-sm text-[#B8A88A]">
              Create your first trek to get started.
            </p>
          </div>
        ) : (
          <TreksTable treks={treks} />
        )}
      </div>
    </div>
  );
}

function Mountain({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
