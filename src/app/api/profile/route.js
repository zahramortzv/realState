import Profile from "@/models/profile";
import User from "@/models/User";
import { Types } from "mongoose";
import { NextResponse } from "next/server"
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";

export async function GET(req) {
    try {
        await connectDB();
        const profiles = await Profile.find({ published: true }).select("-userId");
        return NextResponse.json(
            { data: profiles },
            { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: "مشکلی در سرور رخ داده است" },
            { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const {
            title,
            description,
            location,
            phone,
            realState,
            price,
            constructionDate,
            amenities, rules,
            category
        } = body;

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

        if (
            !title ||
            !description ||
            !location ||
            !phone ||
            !realState ||
            !price ||
            !constructionDate ||
            !amenities ||
            !rules ||
            !category
        ) {
            return NextResponse.json(
                { error: "لطفا اطلاعات معتبر وارد کنید" },
                { status: 400 });
        }

        const newprofile = await Profile.create({
            title,
            description,
            location,
            phone,
            realState,
            price: +price,
            constructionDate,
            amenities,
            rules,
            category,
            userId: new Types.ObjectId(user._id),
        });

        return NextResponse.json(
            { message: "آگهی جدید اضافه شد" },
            { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { error: "مشکلی در سرور رخ داده است" },
            { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        await connectDB();
        const {
            _id,
            title,
            description,
            location,
            phone,
            realState,
            price,
            constructionDate,
            amenities,
            rules,
            category
        } = await req.json();

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
        if (
            !_id,
            !title ||
            !description ||
            !location ||
            !phone ||
            !realState ||
            !price ||
            !constructionDate ||
            !category
        ) {
            return NextResponse.json(
                { error: "لطفا اطلاعات معتبر وارد کنید" },
                { status: 400 });
        }

        const profile = await Profile.findOne({ _id: _id });
        if (!user._id.equals(profile.userId)) {
            return NextResponse.json(
                { error: "دسترسی شما به این آگهی محدود شده است" },
                { status: 403 });
        }

        profile.title = title;
        profile.description = description;
        profile.location = location;
        profile.realState = realState;
        profile.price = price;
        profile.constructionDate = constructionDate;
        profile.category = category;
        profile.amenities = amenities;
        profile.rules = rules;
        profile.save();

        return NextResponse.json(
            { message: "آگهی با موفقیت ویرایش شد" },
            { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: "مشکلی در سرور رخ داده است" },
            { status: 500 });
    }
}

