"use client";
import style from "@/CSS/DashMagazine.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Displaymag({ data }) {
  const [editingItems, setEditingItems] = useState({});
  const [loadingItems, setLoadingItems] = useState({});
  const router = useRouter();

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

  const handleSaveClick = async (e, id) => {
    e.preventDefault();
    setLoadingItems((prevLoadingItems) => ({
      ...prevLoadingItems,
      [id]: true,
    }));

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

      console.log({ message: 'success' });
    } catch (error) {
      console.log("failed", error.message);
    } finally {
      setLoadingItems((prevLoadingItems) => ({
        ...prevLoadingItems,
        [id]: false,
      }));
      router.push('/Dashboard/Magazine')
    }
  };

  return data.map((item, index) => (
    <div key={item._id + index} className={style.table}>
      <div className={style.formContainer}>
        <p>Edit Magazine</p>
        <form onSubmit={(e) => handleSaveClick(e, item._id)} className={style.form}>
          <label htmlFor="field" className={style.label}>
            Field
          </label>
          <div>
            <input
              placeholder="Enter Field"
              id="field"
              name="field"
              onChange={(e) => handleInputChange(item._id, "field", e.target.value)}
              value={editingItems[item._id]?.field || item.field}
              disabled={loadingItems[item._id]}
            />
          </div>

          <label htmlFor="tags" className={style.label}>
            Tags
          </label>
          <div>
            <input
              placeholder="Enter Tags"
              id="tags"
              name="tags"
              onChange={(e) => handleInputChange(item._id, "tags", e.target.value)}
              value={editingItems[item._id]?.tags || item.tags}
              disabled={loadingItems[item._id]}
            />
          </div>

          <label htmlFor="date" className={style.label}>
            Date
          </label>
          <div>
            <input
              style={{ border: "2px solid #C0D3FA" }}
              type="date"
              id="date"
              name="Date"
              placeholder="DD/MM/YYYY"
              onChange={(e) => handleInputChange(item._id, "Date", e.target.value)}
              value={editingItems[item._id]?.Date || item.Date}
              disabled={loadingItems[item._id]}
            />
          </div>

          <label htmlFor="title" className={style.label}>
            Title
          </label>
          <div>
            <input
              placeholder="Enter Title"
              id="title"
              name="Title"
              onChange={(e) => handleInputChange(item._id, "Title", e.target.value)}
              value={editingItems[item._id]?.Title || item.Title}
              disabled={loadingItems[item._id]}
            />
          </div>

          <label htmlFor="description" className={style.label}>
            Description
          </label>
          <div>
            <textarea
              placeholder="Enter Description"
              id="description"
              name="Description"
              onChange={(e) => handleInputChange(item._id, "Description", e.target.value)}
              value={editingItems[item._id]?.Description || item.Description}
              disabled={loadingItems[item._id]}
            />
          </div>

          <label htmlFor="image" className={style.label}>
            Image
          </label>
          <div>
            <input
              type="file"
              className={style.input}
              id="image"
              name="image"
              onChange={(e) => handleInputChange(item._id, "image", e.target.files[0])}
              disabled={loadingItems[item._id]}
            />
          </div>

          <label htmlFor="para1" className={style.label}>
            Para1
          </label>
          <div>
            <textarea
              placeholder="Enter Para1"
              id="para1"
              name="Para1"
              onChange={(e) => handleInputChange(item._id, "Para1", e.target.value)}
              value={editingItems[item._id]?.Para1 || item.Para1}
              disabled={loadingItems[item._id]}
            />
          </div>

          <label htmlFor="pdfadress" className={style.label}>
            PDF Address
          </label>
          <div>
            <input
              type="file"
              className={style.input}
              id="pdfadress"
              name="pdfadress"
              onChange={(e) => handleInputChange(item._id, "pdfadress", e.target.files[0])}
              disabled={loadingItems[item._id]}
            />
          </div>

          <span className={style.submit}>
            <button type="submit" disabled={loadingItems[item._id]}>
              {loadingItems[item._id] ? "Updating..." : "Submit"}
            </button>
          </span>
        </form>
      </div>
    </div>
  ));
}

export default Displaymag;
