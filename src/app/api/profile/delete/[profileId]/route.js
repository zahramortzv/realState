import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Profile from "@/models/profile";

export async function DELETE(req, conetxt) {
    try {
        await connectDB();
        const id = conetxt.params.profileId;
        const session = await getServerSession(req);
        if (!session) {
            return NextResponse.json(
                { error: "لطفا وارد حساب کاربری خود شوید" },
                { status: 401 }
            );
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json(
                { error: "حساب کاربری یافت نشد" },
                { status: 404 }
            );
        }

        const profile = await Profile.findOne({ _id: _id });
        if (!user._id.equals(profile.userId)) {
            return NextResponse.json(
                { error: "دسترسی شما به این آگهی محدود شده است" },
                { status: 403 });
        }

        await Profile.deleteOne({ _id: id });
        return NextResponse.json(
            { message: "آگهی مورد نظر حذف شد" },
            { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: "مشکلی در سرور رخ داده است" },
            { status: 500 });
    }
}