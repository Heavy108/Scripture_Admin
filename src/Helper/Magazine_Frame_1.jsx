import { useState } from "react";
import style from "../CSS/Magazine_Frame_1.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

function Magazine(props) {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleEdit = (id) => {
    // router.push("/EditMagazine");
  };

  const handleClickDelete = async (id) => {
    try {
      console.log(id);
      const res = await axios.post("/api/Delete", { id });
      console.log("success", res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      router.push("/Dashboard/Magazine");
    }
  };

  return (
    <>
      <div className={style.Magazine_Container}>
        <div className={style.thumbnail}>
          <img src={`data:image/jpeg;base64,${props.image}`} alt="" />
          <div className={style.mag_Info}>
            <h5>{props.field}</h5>
            <div className={style.dropdown}>
              <span>
                <BsThreeDotsVertical onClick={toggleMenu} />
              </span>
              {showMenu && (
                <div className={style.dropdownContent}>
                  <Link
                    href={{
                      pathname: "/Dashboard/EditMagazine",
                      query: { _id: props._id },
                    }}
                  >
                  
                    <li>
                      <BiSolidEditAlt className={style.edit} />
                      Edit
                    </li>
                  </Link>
                  <li onClick={() => handleClickDelete(props._id)}>
                    <MdDelete className={style.delete} />
                    Delete
                  </li>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Magazine;
