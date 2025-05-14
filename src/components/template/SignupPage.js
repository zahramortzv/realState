"use client"

import styles from "@/components/template/SignupPage.module.css";
import Link from "next/link";
import { useState } from "react"
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Loader from "../modules/Loader";

function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const signUpHandler = async (e) => {
        e.preventDefault();
        if (password !== rePassword) {
            toast.error("رمز عبور و تکرار آن برابر نیست")
            return;
        }
        setLoading(true);
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setLoading(false);
        if (res.status === 201) {
            router.push("/signin")
        } else {
            toast.error(data.errors);
        }
    }

    return (
        <div className={styles.form}>
            <h4>فرم ثبت نام</h4>
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
                <label>تکرار رمزعبور:</label>
                <input
                    type="password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />
                {loading
                    ? (
                        <Loader />
                    )
                    : (
                        <button
                            type="submit"
                            onClick={signUpHandler}
                        >ثبت نام
                        </button>
                    )
                }


            </form>
            <p>حساب کاربری دارید؟
                <Link href="/signin">ورود</Link>
            </p>
            <div><Toaster /></div>
        </div>
    );
}

export default SignupPage