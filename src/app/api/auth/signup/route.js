import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";

export async function POST(req) {
    try {
        await connectDB();

        const { email, password } = await req.json();
        console.log(email, password);
        if (!email || !password) {
            return NextResponse.json(
                { error: "لطفا اطلاعات معتبر وارد کنید" },
                { status: 422 }
            );
        }

        // const existingUser = await userAgent.findOne({ email });
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse({ error: "این حساب کاربری وجود دارد" },
                { status: 422 }
            );
        }

        const hashedpassword = await hashPassword(password);

        const newUser = await User.create({
            email: email,
            password: hashedpassword
        });

        console.log(newUser)

        return NextResponse.json({ message: "حساب کاربری ایجاد شد" }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "مشکلی در سرور رخ داده است" }, { status: 500 })
    }
}