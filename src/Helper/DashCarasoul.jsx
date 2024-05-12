"use client";
import { useState } from "react";
import style from "@/CSS/DashCarasoul.module.css";

function DashCarasoul({ Data }) {
  const [editingItems, setEditingItems] = useState({});

  const handleEditClick = (id) => {
    setEditingItems((prevEditingItems) => ({
      ...prevEditingItems,
      [id]: true,
    }));
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
      console.log("error for here");
      const res = await fetch("/api/DashCarasoul", {
        method: "POST",
        body: formData,
      });
      console.log("i am near the sucess");
      console.log("success");
    } catch (error) {
      console.log("failed", error.message);
    }
  };

  return Data.map((item, index) => (
    <div key={item._id + index} className={style.table}>
      {editingItems[item._id] ? (
        <>
          <form onSubmit={() => handleSaveClick(item._id)}>
            <input
              type="file"
              name="file"
              onChange={(e) =>
                handleInputChange(item._id, "image", e.target.files[0])
              }
            />
            <input
              type="text"
              name="title"
              value={editingItems[item._id]?.title || item.title}
              onChange={(e) =>
                handleInputChange(item._id, "title", e.target.value)
              }
            />
            <input
              type="text"
              name="text"
              value={editingItems[item._id]?.text || item.text}
              onChange={(e) =>
                handleInputChange(item._id, "text", e.target.value)
              }
            />
            <input
              type="text"
              name="address"
              value={editingItems[item._id]?.address || item.address}
              onChange={(e) =>
                handleInputChange(item._id, "address", e.target.value)
              }
            />
            <input
              type="text"
              name="bg_color"
              value={editingItems[item._id]?.bg_color || item.bg_color}
              onChange={(e) =>
                handleInputChange(item._id, "bg_color", e.target.value)
              }
            />
            <input type="submit" value="Submit" />
          </form>
        </>
      ) : (
        <>
          <h4>{item._id}</h4>
          <img src={`data:image/jpeg;base64,${item.image}`} alt={item.title} />
          <h4>{item.title}</h4>
          <p>{item.text}</p>
          <h4>{item.address}</h4>
          <h4>{item.bg_color}</h4>
          <button onClick={() => handleEditClick(item._id)}>Edit</button>
        </>
      )}
    </div>
  ));
}

export default DashCarasoul;
