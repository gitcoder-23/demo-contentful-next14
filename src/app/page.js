import Image from "next/image";
import styles from "./page.module.css";
import { getClient } from "./lib/contentful";

export default function Home() {
  return (
    <div>
      <h1 style={{ color: "pink", fontSize: "50px" }}>Hello World</h1>
    </div>
  );
}
