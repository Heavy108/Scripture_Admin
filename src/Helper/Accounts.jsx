import style from '@/CSS/Accounts.module.css';
import { fetchAccountData } from '@/app/api/Account/route';
import ViewPDFButton from './pdf';
const [magazine, subscriber, research, events,bytes] =await fetchAccountData();
 
function Accounts(){
    const pdfaddress = '/final.pdf';
  console.log(pdfaddress)
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfaddress;
    link.download = pdfaddress.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
        <li className={style.box}>SciTech<span className={style.data}>{subscriber}</span></li>
        <li className={style.box}>Events<span className={style.data}> {research}</span></li>
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