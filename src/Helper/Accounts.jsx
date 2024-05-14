import style from '@/CSS/Accounts.module.css';
import { fetchAccountData } from '@/app/api/Account/route';

const [magazine, subscriber, research, events] =await fetchAccountData();
 
function Accounts(){
return(
    <>
    <div className={style.Account}>
        <li className={style.box}>Total number of Magazines:{magazine}</li>
        <li className={style.box}>Total Number of Subscribers:{subscriber}</li>
        <li className={style.box}>Total number of events organized:{research}</li>
        <li className={style.box}>Total number of research Published:{events}</li>

    </div>
    </>
)
}

export default Accounts;