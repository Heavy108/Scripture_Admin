import { fetchData } from "@/app/api/Magazine/route";
import Link from "next/link";
import style from "@/CSS/Display.module.css";
import { fetchAccountData } from "@/app/api/Account/route";
import { CiSearch } from "react-icons/ci";
import Mag_Section from "@/Helper/MagCluster";
const [magazine, subscriber, research, events, bytes] =
  await fetchAccountData();


// console.log(Data)

async function Display() {
  const Data = await fetchData();
  return (
    <>
      
      <div className={style.Account}>
        <div className={style.heading}>
          <p className={style.p}>Magazines</p>
          <Link href="/Dashboard/MagazineInsert" className={style.link}>
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
          <p className={style.all}>All Magazines</p>
          <div className={style.searchContainer}>
            <input type="search" placeholder="Search" />
            <CiSearch />
          </div>
        </div>
        <div style={{display:"flex", flexWrap:"wrap"}}>
        <Mag_Section Data={Data} MagazinesPerPage={8}/>
      </div>
      </div>
    </>
  );
}

export default Display;
