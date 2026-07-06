import { UsersTable } from "@/components/admin/users-table";
import { format } from "date-fns";
import { getServerBaseUrl } from "@/lib/server-url";

export default async function AdminUsersPage() {
  const baseUrl = await getServerBaseUrl();
  const res = await fetch(`${baseUrl}/api/user`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Failed to load users</div>;
  }

  const fetchedUsers = await res.json();
  const users = fetchedUsers.map((user: any) => ({
    ...user,
    joinedAt: format(new Date(user.joinedAt), "MMM yyyy"),
  }));

  return (
    <div>
      <div>
        <h1 className="font-serif text-3xl font-semibold text-[#2D5016]">
          Users
        </h1>
        <p className="mt-1 text-sm text-[#8B7355]">
          Registered users ({users.length} total)
        </p>
      </div>

      <div className="mt-8">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
