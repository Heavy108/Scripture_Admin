import "../global.css";
import Dashmagazines from "@/Helper/DashMagazine";

import DashBoard from "@/Helper/DashBoardNavigation";

function MagazineUpdate() {
  return (
    <>
    <div style={{display:"flex",flexDirection:"row"}}>
      <DashBoard />
      
      <Dashmagazines />
      </div>
    </>
  );
}

export default MagazineUpdate;
