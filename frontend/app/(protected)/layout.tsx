import { getServerUser } from "@/lib/api/get-server/getServerUser";
import { UserProvider } from "./user-context";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LayoutProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  return (
    <UserProvider user={user}>
      {children}
    </UserProvider>
  );
}
