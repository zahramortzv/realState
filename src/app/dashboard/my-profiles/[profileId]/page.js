import AddProfilePage from "@/components/template/AddProfilePage";
import Profile from "@/models/profile";
import connectDB from "@/utils/connectDB";
import { Types } from "mongoose";

async function Edit({ params }) {
    await connectDB();

    // اطمینان از تبدیل profileId به ObjectId
    const id = Types.ObjectId.createFromHexString(params.profileId);

    const profile = await Profile.findOne({ _id: id });

    if (!profile) {
        return <h3>مشکلی پیش آمده، لطفا دوباره امتحان کنید</h3>
    }

    return <AddProfilePage data={JSON.parse(JSON.stringify(profile))} />
}

export default Edit;
