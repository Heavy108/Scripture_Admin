'use client'
import style from "@/CSS/DashBoard.module.css";
import { useState } from 'react';
// import {useRouter} from "next/navigation";
import Link from "next/link";


function DashBoard() {
  // const router =useRouter()
    const [activeItem, setActiveItem] = useState(null);

    const handleClick = (item) => {
      setActiveItem(item);
    //   router.push(href: `/${item}`)
    // }
    // <Link href={{pathname: `/${item}`}}/>
    }

    return (
      <>
      <div className={style.superContainer}>
        <div className={style.Container}>
          <ul className={style.items}>
            <li
              onClick={() => handleClick('Home')}
              className={activeItem === 'Home' ? `${style.activeItem}` : ''}
            >
            <Link href="/Home">Home</Link>
            </li>
            <li
              onClick={() => handleClick('Magazine')}
              className={activeItem === 'Magazine' ? `${style.activeItem}` : ''}
            >
              <Link href="/Magazine">Magazine</Link>
            </li>
            <li
              onClick={() => handleClick('Carasoul')}
              className={activeItem === 'Carasoul' ? `${style.activeItem}` : ''}
            >
              <Link href="/Carasoul">CaraSoul</Link>
            </li>
            <li
              onClick={() => handleClick('Email')}
              className={activeItem === 'Email' ? `${style.activeItem}` : ''}
            >
              Email
            </li>
            <li
              onClick={() => handleClick('Accounts')}
              className={activeItem === 'Accounts' ? `${style.activeItem}` : ''}
            >
            <Link href="/Accounts">Accounts</Link>
            </li>
            <li
              onClick={() => handleClick('Logout')}
              className={activeItem === 'Logout' ? `${style.activeItem}` : ''}
            >
              Logout
            </li>
          </ul>
        </div>

          </div>
             
      </>
    )
}

export default DashBoard;
