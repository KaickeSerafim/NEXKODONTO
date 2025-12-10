import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LayoutuAuth({ children }: { children: React.ReactNode }) {
    const cookiesList = await cookies()
    const hasToken = cookiesList.has("access")
    
    if (!hasToken)
    {
        return redirect("/")
    }

    const requestUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me/`, {
        method: "GET",
        headers: {
            cookie: cookiesList.toString(),
        },
        cache: "no-store",
    })

    return (
        <>
            {children}
        </>
    )
}