import { TrekForm } from "@/components/admin/trek-form";

export default function NewTrekPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-[#2D5016]">
        New Trek
      </h1>
      <p className="mt-1 text-sm text-[#8B7355]">
        Add a new trek to your offerings.
      </p>
      <div className="mt-8">
        <div className="clay-card-sm rounded-2xl p-8">
          <TrekForm />
        </div>
      </div>
    </div>
  );
}
