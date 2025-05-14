import styles from "@/components/template/MyProfilePage.module.css";
import DashboardCard from "../modules/DashboardCard";

function MyProfilePage({ profiles }) {

    console.log("profiles", profiles)
    return (
        <div>
            {
                profiles.length
                    ? null
                    : <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
            }
            {
                profiles.map((i) => (<DashboardCard key={i._id} data={JSON.parse(JSON.stringify(i))} />))
            }
        </div>
    )
}

export default MyProfilePage