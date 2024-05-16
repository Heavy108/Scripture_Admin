import Displaymag from "@/Helper/DisplayMag";
import { fetchData } from "@/app/api/Magazine/route";
import Link from "next/link";
import style from "@/CSS/Display.module.css";
import { fetchAccountData } from "@/app/api/Account/route";
import { CiSearch } from "react-icons/ci";
import Mag_Section from "@/Helper/MagCluster";
const [magazine, subscriber, research, events, bytes] =
  await fetchAccountData();

const Data = await fetchData();

function Display() {
  return (
    <>
      {/* <Link href='/MagazineInsert'><button>Add</button></Link>
        <Displaymag data={Data}/> */}
      <div className={style.Account}>
        <div className={style.heading}>
          <h4>Magazines</h4>
          <Link href="/MagazineInsert" className={style.link}>
            <button className={style.add}>Add Magazines</button>
          </Link>
        </div>
        <ul className={style.items}>
          <li className={style.box}>
            Bytes<span className={style.data}>{bytes}</span>
          </li>
          <li className={style.box}>
            SciTech<span className={style.data}>{subscriber}</span>
          </li>
          <li className={style.box}>
            Events<span className={style.data}> {research}</span>
          </li>
          <li className={style.box}>
            Magazines Downloaded<span className={style.data}>99</span>
          </li>
        </ul>

        <div className={style.heading}>
          <h4>All Magazines</h4>
          <div className={style.searchContainer}>
            <input type="search" placeholder="Search" />
            <CiSearch />
          </div>
        </div>
        {/* <Mag_Section Data={Data} MagazinesPerPage={8}/> */}
      </div>
    </>
  );
}

export default Display;
