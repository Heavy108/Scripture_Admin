"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import style from "@/CSS/DashCarasoul.module.css";

const DashCarasoul = ({ Data }) => {
  const [editingItems, setEditingItems] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const router =useRouter();

  const handleEditClick = (id) => {
    setOriginalData((prevOriginalData) => ({
      ...prevOriginalData,
      [id]: Data.find((item) => item._id === id),
    }));
    setEditingItems((prevEditingItems) => ({
      ...prevEditingItems,
      [id]: true,
    }));
    setSelectedImage(`data:image/jpeg;base64,${Data.find((item) => item._id === id).image}`);
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

    if (field === "image") {
      setSelectedImage(URL.createObjectURL(value));
    }
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
      const res = await fetch("/api/CarasoulUpdate", {
        method: "POST",
        body: formData,
      });
      console.log("success");
    } catch (error) {
      console.log("failed", error.message);
    }finally{
      Router.push('/Dashboard/Carasoul')
    }
  };

  const handleClearClick = (id) => {
    setEditingItems((prevEditingItems) => {
      const updatedEditingItems = { ...prevEditingItems };
      delete updatedEditingItems[id];
      return updatedEditingItems;
    });
    setSelectedImage(null);
  };

  const handleFileInputChange = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className={style.container}>
        <h4>Carousel</h4>
        <div className={style.Heading}>
          <li style={{ width: "40px", height: "21px" }}>S.No.</li>
          <li style={{ width: "120px", height: "21px" }}>Thumbnail</li>
          <li style={{ width: "160px", height: "21px" }}>Title</li>
          <li style={{ width: "240px", height: "21px" }}>Description</li>
          <li style={{ width: "160px", height: "21px" }}>Address</li>
          <li style={{ width: "80px", height: "21px" }}>BG Color</li>
          <li>Action</li>
        </div>

        {Data.map((item, index) => (
          <div key={item._id + index}>
            {editingItems[item._id] ? (
              <>
                <form onSubmit={() => handleSaveClick(item._id)} className={style.formcontainer}>
                  <span style={{ width: "40px", height: "18px" }}>{item._id}</span>
                  <div style={{ width: "120px", height: "120px" }} onClick={handleFileInputChange}>
                    {selectedImage && (
                      <>
                        <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                        <span className={style.closeButton} onClick={() => handleClearClick(item._id)}>×</span>
                      </>
                    )}
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => handleInputChange(item._id, "image", e.target.files[0])}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                  </div>
                  <textarea
                    style={{ width: "100px", height: "80px" }}
                    type="text"
                    name="title"
                    value={editingItems[item._id]?.title || item.title}
                    onChange={(e) => handleInputChange(item._id, "title", e.target.value)}
                  />
                  <textarea
                    style={{ width: "220px", height: "110px" }}
                    type="text"
                    name="text"
                    value={editingItems[item._id]?.text || item.text}
                    onChange={(e) => handleInputChange(item._id, "text", e.target.value)}
                  />
                  <input
                    style={{ width: "80px", height: "18px", padding: "1rem" }}
                    type="text"
                    name="address"
                    value={editingItems[item._id]?.address || item.address}
                    onChange={(e) => handleInputChange(item._id, "address", e.target.value)}
                  />
                  <input
                    style={{ width: "60px", height: "18px", padding: "1rem" }}
                    type="text"
                    name="bg_color"
                    value={editingItems[item._id]?.bg_color || item.bg_color}
                    onChange={(e) => handleInputChange(item._id, "bg_color", e.target.value)}
                  />
                  <div className={style.actions}>
                    <button type="submit" value="Submit" className={style.edit}>
                      Save
                    </button>
                    <button
                      className={style.edit2}
                      type="button"
                      onClick={() => handleClearClick(item._id)}
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className={style.table}>
                  <li style={{ width: "40px", height: "18px" }}>{item._id}</li>
                  <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt={item.title}
                    className={style.image}
                  />
                  <li style={{ width: "160px", height: "120px" }}>{item.title}</li>
                  <li style={{ width: "240px", height: "120px" }}>{item.text}</li>
                  <li style={{ width: "160px", height: "18px" }}>{item.address}</li>
                  <li style={{ width: "80px", height: "18px" }}>{item.bg_color}</li>
                  <button onClick={() => handleEditClick(item._id)} className={style.edit}>
                    Edit
                  </button>
                </div>
                <hr style={{backgroundColor:"#d9d9d9",opacity:"0.5"}}/>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default DashCarasoul;
