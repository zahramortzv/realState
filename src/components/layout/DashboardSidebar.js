import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from "@/layout/DashboardSidebar.module.css";
import { getServerSession } from "next-auth";
import { CgProfile } from "react-icons/cg"
import Link from "next/link";
import LogoutButton from "../modules/LogoutButton";

async function DashboardSidebar({ children, email, role }) {

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <CgProfile />
                {role === "ADMIN" ? "ادمین" : null}
                <p>{email}</p>
                <Link href="/dashboard">حساب کاربری</Link>
                <Link href="/dashboard/my-profiles">آگهی های من</Link>
                <Link href="/dashboard/add">ثبت آگهی</Link>
                {
                    role === "ADMIN"
                        ? <Link href="/admin">در انتظار تايید</Link>
                        : null
                }
                <LogoutButton />
            </div>
            <div className={styles.main}>{children}</div>
        </div>
    )
}

export default DashboardSidebar