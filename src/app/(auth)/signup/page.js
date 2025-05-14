import SignupPage from "@/components/template/SignupPage"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

async function SignUp() {
    const session = await getServerSession(authOptions);
    console.log("session", session)
    if (session) redirect("/");
    return (
        <SignupPage />
    )
}

export default SignUp