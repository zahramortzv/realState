import styles from "@/components/modules/RadioList.module.css";

function RadioList({ profileData, setProfileData }) {

    const { category } = profileData;
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value })
    }

    return (
        <div className={styles.container}>
            <p>دسته بندی</p>
            <div className={styles.main}>
                <div>
                    <label>ویلا</label>
                    <input
                        type="radio"
                        name="category"
                        value="villa"
                        id="villa"
                        checked={category === "villa"}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label>آپارتمان</label>
                    <input
                        type="radio"
                        name="category"
                        value="apartment"
                        id="apartment"
                        checked={category === "apartment"}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label>مغازه</label>
                    <input
                        type="radio"
                        name="category"
                        value="store"
                        id="store"
                        checked={category === "store"}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label>دفتر</label>
                    <input
                        type="radio"
                        name="category"
                        value="office"
                        id="office"
                        checked={category === "office"}
                        onChange={changeHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export default RadioList