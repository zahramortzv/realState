import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SigninPage from "@/components/template/SigninPage"
import { redirect } from "next/dist/server/api-utils";

async function page() {
    const session = await getServerSession(authOptions);
    console.log("session", session)
    if (session) redirect("/");
    return <SigninPage />
}

export default page