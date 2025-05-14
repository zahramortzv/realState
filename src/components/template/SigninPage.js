"use client"

import styles from "@/components/template/SignupPage.module.css";
import Link from "next/link";
import { useState } from "react"
import { signIn } from "next-auth/react";
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Loader from "../modules/Loader";

function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const signInHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        const res = signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        setLoading(false);
        if (res.error) {
            toast.error(res.error)
        } else {
            router.push("/");
        }
    }


    return (
        <div className={styles.form}>
            <h4>فرم ورود</h4>
            <form>
                <label>ایمیل:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>رمز عبور:</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {loading
                    ? (
                        <Loader />
                    )
                    : (
                        <button
                            type="submit"
                            onClick={signInHandler}
                        >ورود
                        </button>
                    )
                }


            </form>
            <p>حساب کاربری ندارید؟
                <Link href="/signup">ثبت نام</Link>
            </p>
            <div><Toaster /></div>
        </div>
    );

}
export default SigninPage