'use client'
import style from "@/CSS/DashBoard.module.css";
import { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { BiSolidCarousel } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { RiSettings4Fill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { TbHomeFilled } from "react-icons/tb";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/navigation";


function DashBoard() {
  const router =useRouter()
    const [activeItem, setActiveItem] = useState(null);
    const logout = async () => {
      try {
          await axios.get('/api/Logout')
        
          router.push('/Login')
      } catch (error) {
          console.log(error.message);
          
      }
  }

    const handleClick = (item) => {
      setActiveItem(item);
    //   router.push(href: `/${item}`)
    // }
    // <Link href={{pathname: `/${item}`}}/>
    }

    return (
      <>
      <div className={style.superContainer}>
        
          <ul className={style.items}>
            <li>Scripture</li>
            <li
              onClick={() => handleClick('Home')}
              className={activeItem === 'Home' ? `${style.activeItem}` : ''}
            >
            <Link href="/Dashboard/Home" className={style.Link}><TbHomeFilled className={style.icons}/>Dashboard</Link>
            </li>
            <li
              onClick={() => handleClick('Magazine')}
              className={activeItem === 'Magazine' ? `${style.activeItem}` : ''}
            >
              <Link href="/Dashboard/Magazine" className={style.Link}><MdDashboard className={style.icons}/>Magazine</Link>
            </li>
            <li
              onClick={() => handleClick('Carasoul')}
              className={activeItem === 'Carasoul' ? `${style.activeItem}` : ''}
            >
              <Link href="/Dashboard/Carasoul" className={style.Link}><BiSolidCarousel className={style.icons}/>Carousel</Link>
            </li>
            <li
              onClick={() => handleClick('Email')}
              className={activeItem === 'Email' ? `${style.activeItem}` : ''}
            >
             <Link href="/Dashboard/Subscribers" className={style.Link}><HiUserGroup className={style.icons}/>Subscribers</Link>
            </li>
            <li
              onClick={() => handleClick('SignUp')}
              className={activeItem === 'SignUp' ? `${style.activeItem}` : ''}
            >
            <Link href="/Dashboard/SignUp" className={style.Link}><RiSettings4Fill className={style.icons}/>Setting</Link>
            </li>
            
           
              <button onClick={logout} className={style.Link}><IoLogOutOutline className={style.icons}/>Logout</button>
            
          </ul>
        </div>

          
             
      </>
    )
}

export default DashBoard;
