import { HiFilter } from "react-icons/hi";
import styles from "@/components/modules/Sidebar.module.css";
import Link from "next/link";

function Sidebar() {
    const queries = [
        { villa: "ویلا" },
        { apartment: "اپارتمان" },
        { store: "مغازه" },
        { office: "دفتر" }
    ];

    return (
        <div className={styles.container}>
            <p><HiFilter />دسته بندی</p>
            <Link href="/buy-residential">همه</Link>
            {
                queries.map((query, index) => (
                    <Link key={index} href={{ pathname: "/buy-residential", query: { category: Object.keys(query) } }}>{Object.values(query)}</Link>
                ))
            }
        </div>
    )
}

export default Sidebar