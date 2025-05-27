import DetailsPage from "@/components/template/DetailsPage";
import Profile from "@/models/profile";
import connectDB from "@/utils/connectDB";

async function ProfileDetails({ params: { profileId } }) {
    await connectDB();
    const profile = await Profile.findOne({ _id: profileId });
    if (!profile) return <h3>مشکلی پیش آمده است</h3>
    return <DetailsPage data={profile} />
}

export default ProfileDetails;

export const generateMetadata = async ({ params: profileId }) => {
    await connectDB();
    const profile = await Profile.findOne({ _id: profileId });
    return { title: profile.title, description: profile.description };
}