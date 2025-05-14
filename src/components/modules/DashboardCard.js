"use client"

import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Card from "./Card"
import styles from "@/components/modules/DashboardCard.module.css"
import toast, { Toaster } from "react-hot-toast";

function DashboardCard({ data }) {
    const router = useRouter();

    const editHandler = () => {
        router.push(`/dashboard/my-profiles/${data._id}`);
    }

    const deleteHandler = async () => {
        const res = await fetch(`/api/profile/delete/${data._id}`, {
            method: "DELETE"
        });

        const result = await res.json();
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(result.message);
            router.refresh()
        }
    }
    return (
        <div className={styles.container}>
            <Card data={data} />
            <div className={styles.main}>
                <button onClick={editHandler}><FiEdit />ویرایش</button>
                <button onClick={deleteHandler}><AiOutlineDelete />حذف آگهی</button>
            </div>
            <Toaster />
        </div>
    )
}

export default DashboardCard