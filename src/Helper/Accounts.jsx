import style from '@/CSS/Accounts.module.css';
import ViewPDFButton from './pdf';

import { fetchAccountData } from '@/app/api/Account/route';
 
async function Accounts(){
const [magazine, subscriber, research, events,bytes] =await fetchAccountData();
  
return(
    <>
    <div className={style.container}>
    <div className={style.Account}>
        <h4>Analytics</h4>
        <ul className={style.items}>
        <li className={style.box}>Number of magazines<span className={style.data}>{magazine}</span></li>
        <li className={style.box}>Number of subscribers<span className={style.data}>{subscriber}</span></li>
        <li className={style.box}>Events organized<span className={style.data}> {research}</span></li>
        <li className={style.box}>Research Published<span className={style.data}>{events}</span></li>
        </ul>
    </div>
    <div className={style.Account}>
        <h4>Magazines</h4>
        <ul className={style.items}>
        <li className={style.box}>Bytes<span className={style.data}>{bytes}</span></li>
        <li className={style.box}>SciTech<span className={style.data}>{research}</span></li>
        <li className={style.box}>Events<span className={style.data}> {events}</span></li>
        <li className={style.box}>Magazines Downloaded<span className={style.data}>99</span></li>
        </ul>
    </div>

    <div className={style.guidelines}>
        <div className={style.heading}>
        <h4>Scripture Admin Guidelines</h4>
        <span ><ViewPDFButton pdfPath='/final.pdf'/></span>
        </div>
        <div  className={style.image}>
        <img src="/guide.png" alt=""/>
    </div>
    </div>
    </div>
    </>
)
}

export default Accounts;