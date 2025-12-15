import { checkAuth } from "@/lib/api/get-server/checkAuth";
import { redirect } from "next/navigation";
import AuthWrapper from "./auth-wrapper";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkAuth();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return <AuthWrapper>{children}</AuthWrapper>;
}
