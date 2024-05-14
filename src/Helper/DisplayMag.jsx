"use client";
import style from "@/CSS/DashCarasoul.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
function Displaymag({ data }) {
  const [editingItems, setEditingItems] = useState({});


  const router = useRouter();

  const handleEditClick = (id) => {
    console.log(id)
    setEditingItems((prevEditingItems) => ({
      ...prevEditingItems,
      [id]: true,
    }));
  };
  const handleClickDelete = async (id) => {
    try {
      console.log(id);
      const res = await axios.post('/api/Delete', { id });
      console.log('success', res.data);
    } catch (error) {
      console.log(error.message);
    }finally{
      router.push('/Magazine')
    }
  };

  const handleInputChange = (id, field, value) => {
    setEditingItems((prevEditingItems) => ({
      ...prevEditingItems,
      [id]: {
        ...(prevEditingItems[id] || {}),
        [field]: value,
        _id: id,
      },
    }));
  };
 
  const handleSaveClick = async (id) => {
    try {
      const editedItem = editingItems[id];
      console.log("Edited item:", editedItem);
      const formData = new FormData();
      for (let key in editedItem) {
        formData.append(key, editedItem[key]);
      }

      const res = await fetch("/api/MagazineUpdate", {
        method: "POST",
        body: formData,
      });
      const data = await res.json(); // Parse JSON response

      if (data.success) {
        console.log("success");
        // window.location.reload();
        router.push("/Home");
      } // Reload the page
      // router.push("/Home");
      // router.back();
    } catch (error) {
      console.log("failed", error.message);
    }
  };

  return data.map((item, index) => (
    <div key={item._id + index} className={style.table}>
      {editingItems[item._id] ? (
        <>
          <form onSubmit={() => handleSaveClick(item._id)}>
            <input
              type="text"
              name="field"
              value={editingItems[item._id]?.field || item.field}
              onChange={(e) =>
                handleInputChange(item._id, "field", e.target.value)
              }
            />
            <input
              type="text"
              name="tags"
              value={editingItems[item._id]?.tags || item.tags}
              onChange={(e) =>
                handleInputChange(item._id, "tags", e.target.value)
              }
            />
            <input
              type="text"
              name="Date"
              value={editingItems[item._id]?.Date || item.Date}
              onChange={(e) =>
                handleInputChange(item._id, "Date", e.target.value)
              }
            />
            <input
              type="text"
              name="Title"
              value={editingItems[item._id]?.Title || item.Title}
              onChange={(e) =>
                handleInputChange(item._id, "Title", e.target.value)
              }
            />
            <input
              type="text"
              name="Description"
              value={editingItems[item._id]?.Description || item.Description}
              onChange={(e) =>
                handleInputChange(item._id, "Description", e.target.value)
              }
            />
            <input
              type="text"
              name="Para1"
              value={editingItems[item._id]?.Para1 || item.Para1}
              onChange={(e) =>
                handleInputChange(item._id, "Para1", e.target.value)
              }
            />
            <input
              type="file"
              name="file"
              // value={editingItems[item._id]?.pdfaddress || item.pdfaddress}
              onChange={(e) =>
                handleInputChange(item._id, "pdfaddress", e.target.files[0])
              }
            />
            <input
              type="file"
              name="file"
              // value={editingItems[item._id]?.image || item.image}
              onChange={(e) =>
                handleInputChange(item._id, "image", e.target.files[0])
              }
            />

            {/* <input
                type="text"
                name="address"
                value={editingItems[item._id]?.address || item.address}
                onChange={(e) =>
                  handleInputChange(item._id, "address", e.target.value)
                }
                
              /> */}

            <input type="submit" value="Submit" />
          </form>
        </>
      ) : (
        <>
          {/* <h4>{item._id}</h4> */}
          <h4>{item._id}</h4>
          <img src={`data:image/jpeg;base64,${item.image}`} alt={item.title} />
          {/* <h4>{item.image}</h4> */}

          <h4>{item.field}</h4>
          <h4>{item.tags}</h4>
          {/* <h4>{item.Date}</h4> */}
          <h4>{item.Title}</h4>
          {/* <h4>{item.Description}</h4> */}
          {/* <p>{item.Para1}</p> */}
          {/* <h4>{item.pdfaddress}</h4> */}
          {/* <h4>{item.image}</h4> */}
          <button onClick={() => handleEditClick(item._id)}>Edit</button>
          <button onClick={() => handleClickDelete(item._id)}>Delete</button>
        </>
      )}
    </div>
  ));
}

export default Displaymag;
