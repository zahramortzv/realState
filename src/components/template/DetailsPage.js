import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";
import { e2p, sp } from "@/utils/replaceNumber";
import Title from "../modules/Title";
import ItemList from "../modules/ItemList";
import ShareButton from "../modules/ShareButton";
import styles from "@/components/template/DetailsPage.module.css";
import { categories } from "src/constants/strings";
import { icons } from "src/constants/icons";

function DetailsPage({
    data: {
        title,
        location,
        description,
        amenities,
        rules,
        realState,
        phone,
        price,
        category,
        constructionDate,
    },
}) {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1>{title}</h1>
                <span>
                    <HiOutlineLocationMarker />
                    {location}
                </span>
                <Title>توضیحات</Title>
                <p>{description}</p>
                <Title>امکانات رفاهی</Title>
                <ItemList data={amenities} />
                <Title>قوانین</Title>
                <ItemList data={rules} />
            </div>
            <div className={styles.sidebar}>
                <div className={styles.realState}>
                    <SiHomebridge />
                    <p>املاک {realState}</p>
                    <span>
                        <AiOutlinePhone />
                        {e2p(phone)}
                    </span>
                </div>
                <ShareButton />
                <div className={styles.price}>
                    <p>
                        {icons[category]}
                        {categories[category]}
                    </p>
                    <p>{sp(price)} تومان</p>
                    <p>
                        <BiCalendarCheck />
                        {new Date(constructionDate).toLocaleDateString("fa-IR")}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage