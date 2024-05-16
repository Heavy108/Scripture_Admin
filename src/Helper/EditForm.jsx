'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const EditForm = ({ data }) => {
  const router = useRouter();
  console.log("from editform", data);
  const [edit, setedit] = useState({});

  const handleInputChange = (id, field, value) => {
    setedit((prevEdit) => ({
      ...prevEdit,
      [id]: {
        ...prevEdit[id],
        [field]: value,
      },
    }));
  };

  const handleSaveClick = async (id) => {
    try {
      const editedItem = editingItems[id];
      console.log("Edited item:", editedItem);
      const formData = new FormData();
      for (let key in editedItem) {
        if (key !== "_id") {
          if (key === "pdfaddress" || key === "image") {
            if (editedItem[key]) {
              formData.append(key, editedItem[key]);
            }
          } else {
            formData.append(key, editedItem[key]);
          }
        }
      }
  
      const res = await fetch("/api/MagazineUpdate", {
        method: "POST",
        body: formData,
      });
      const data = await res.json(); // Parse JSON response
  
      console.log({ message: 'success' });
    } catch (error) {
      console.log("failed", error.message);
    }
  };

  return (
    <>
      <h2>from edit form</h2>
      {data.map((item, index) => (
        <form key={item._id} onSubmit={() => handleSaveClick(item._id)}>
          <input
            type="text"
            name="field"
            value={edit[item._id]?.field || item.field}
            onChange={(e) => handleInputChange(item._id, "field", e.target.value)}
          />
          <input
            type="text"
            name="tags"
            value={edit[item._id]?.tags || item.tags}
            onChange={(e) => handleInputChange(item._id, "tags", e.target.value)}
          />
          <input
            type="text"
            name="Date"
            value={edit[item._id]?.Date || item.Date}
            onChange={(e) => handleInputChange(item._id, "Date", e.target.value)}
          />
          <input
            type="text"
            name="Title"
            value={edit[item._id]?.Title || item.Title}
            onChange={(e) => handleInputChange(item._id, "Title", e.target.value)}
          />
          <input
            type="text"
            name="Description"
            value={edit[item._id]?.Description || item.Description}
            onChange={(e) => handleInputChange(item._id, "Description", e.target.value)}
          />
          <input
            type="text"
            name="Para1"
            value={edit[item._id]?.Para1 || item.Para1}
            onChange={(e) => handleInputChange(item._id, "Para1", e.target.value)}
          />
          <input
            type="file"
            name="file"
            onChange={(e) => handleInputChange(item._id, "pdfaddress", e.target.files[0])}
          />
          <input
            type="file"
            name="file"
            onChange={(e) => handleInputChange(item._id, "image", e.target.files[0])}
          />
          <input type="submit" value="Submit" />
        </form>
      ))}
    </>
  );
};

export default EditForm;
