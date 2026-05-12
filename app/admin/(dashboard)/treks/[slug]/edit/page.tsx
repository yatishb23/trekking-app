import { notFound } from "next/navigation";
import { getTrek } from "@/lib/data-store";
import { TrekForm } from "@/components/admin/trek-form";

export default async function EditTrekPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trek = await getTrek(slug);

  if (!trek) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-[#2D5016]">
        Edit Trek
      </h1>
      <p className="mt-1 text-sm text-[#8B7355]">
        Editing: {trek.title}
      </p>
      <div className="mt-8">
        <div className="clay-card-sm rounded-2xl p-8">
          <TrekForm trek={trek} />
        </div>
      </div>
    </div>
  );
}
