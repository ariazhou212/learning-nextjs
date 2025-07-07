import Footer from "./components/Footer";
import Heading from "./components/Heading";
import Link from "next/link";
import styles from "./components/styles/home.module.css";

import imgUrll from "../app/components/Screenshot 2024-10-09 at 9.57.04 AM.png";

const headingProps = { title: "ana", age: 2, isCute: true, imgUrl: imgUrll };
export default function Home() {
  return (
    <>
      <Heading {...headingProps} />
      <Link href={"./blog"}>
        <p className={`${styles.text_wisteria_}`}>Blog</p>
      </Link>
      <h2 className={`${styles.text_wisteria_}`}>Test</h2>

      <Footer greet="abc" />
    </>
  );
}
