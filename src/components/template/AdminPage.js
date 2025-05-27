import styles from "@/components/template/AdminPage.module.css";
import AdminCard from "../modules/AdminCard";

function AdminPage({ profiles }) {
    return (
        <div className={styles}>
            {
                profiles.length
                    ? null
                    : (<p className={styles.text}>هیچ آگهی در انتظار تاییدی وجود ندارد</p>)
            }
            {
                profiles.map((i) => (
                    <AdminCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
                ))
            }
        </div>
    )
}

export default AdminPage