"use client";
import style from "@/CSS/DashMagazine.module.css";
import { useState } from "react";

let uniqueIdCounter = 1;

const generateUniqueId = () => {
  const id = `SC${uniqueIdCounter.toString().padStart(3, '0')}`;
  uniqueIdCounter++;
  return id;
};


function Dashmagazines() {
  const [user, setUser] = useState({
    _id: generateUniqueId(),
    field: "",
    tags: "",
    Date: "",
    Title: "",
    Description: "",
    image: "",
    Para1: "",
    pdfadress: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const isFormFilled = () => {
    const requiredFields = [
      // user._id,
      user.field,
      user.tags,
      user.Date,
      user.Title,
      user.Description,
      imageFile,
      user.Para1,
      pdfFile,
    ];
  
    return requiredFields.every((field) => {
      if (field === null || field === undefined) {
        return false; // Treat null/undefined as an empty field
      }
  
      if (typeof field === "string") {
        return field.trim() !== "";
      }
  
      return true;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "image" || name === "pdfadress") {
      setUser({ ...user });
      if (name === "image") {
        setImageFile(e.target.files[0]);
      } else {
        setPdfFile(e.target.files[0]);
      }
    } else {
      setUser({ ...user, [name]: value });
    }

    setIsFormValid(isFormFilled());
  };

  const onSubmit = async (e) => {
    // e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("_id",user._id)
      formData.append("field", user.field);
      formData.append("tags", user.tags);
      formData.append("Date", user.Date);
      formData.append("Title", user.Title);
      formData.append("Description", user.Description);
      formData.append("Para1", user.Para1);

      if (imageFile) {
        formData.append("image", imageFile, imageFile.name);
      }
      if (pdfFile) {
        formData.append("pdfadress", pdfFile, pdfFile.name);
      }

      const res = await fetch("/api/MagazineInsert", {
        method: "POST",
        body: formData,
      });

      console.log(" success", res.data);
    } catch (error) {
      console.log(" failed", error.message);
    }
  };

  return (
    <>
      <div className={style.formContainer}>
        <p>Add Magazines</p>
        <form onSubmit={onSubmit} className={style.form}>
          

          <label htmlFor="field" className={style.label}>
            Field
          </label>
          <div >
            <input
              placeholder="Enter Field"
              
              id="field"
              name="field"
              onChange={handleInputChange}
              value={user.field}
            />
          </div>

          <label htmlFor="tags" className={style.label}>
            Tags
          </label>
          <div >
            <input
              placeholder="Enter Tags"
              
              id="tags"
              name="tags"
              onChange={handleInputChange}
              value={user.tags}
            />
          </div>

          <label htmlFor="date" className={style.label}>
            Date
          </label>
          <div >
            <input
              style={{border:"2px solid #C0D3FA"}}
              type="date"
              id="date"
              name="Date"
              placeholder="DD/MM/YYYY"
              onChange={handleInputChange}
              value={user.Date}
            />
          </div>

          <label htmlFor="title" className={style.label}>
            Title
          </label>
          <div >
            <input
              placeholder="Enter Title"
              
              id="title"
              name="Title"
              onChange={handleInputChange}
              value={user.Title}
            />
          </div>

          <label htmlFor="description" className={style.label}>
            Description
          </label>
          <div >
            <textarea
              placeholder="Enter Description"
              
              id="description"
              name="Description"
              onChange={handleInputChange}
              value={user.Description}
            />
          </div>

          <label htmlFor="image" className={style.label}>
            Image
          </label>
          <div >
            <input
              type="file"
              className={style.input}
              id="image"
              name="image"
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="para1" className={style.label}>
            Para1
          </label>
          <div >
            <textarea
              placeholder="Enter Para1"
              
              id="para1"
              name="Para1"
              onChange={handleInputChange}
              value={user.Para1}
            />
          </div>

          <label htmlFor="pdfadress" className={style.label}>
            PDF Address
          </label>
          <div >
            <input
              type="file"
              className={style.input}
              id="pdfadress"
              name="pdfadress"
              onChange={handleInputChange}
            />
          </div>
         
        </form>
      </div>
      <span className={style.submit}>
      <button
            type="submit"
            value="submit"
            disabled={!isFormValid}
          >Submit</button>
    </span>
    </>

  );
}

export default Dashmagazines;