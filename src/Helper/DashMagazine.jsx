"use client";
import style from "@/CSS/DashMagazine.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

function Dashmagazines() {
  const router = useRouter();
  const [user, setUser] = useState({
    _id: uuidv4(),
    field: "",
    tags: "",
    Date: "",
    Title: "",
    Description: "",
    image: null,
    Para1: "",
    pdfadress: null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: files ? files[0] : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("_id", user._id);
      formData.append("field", user.field);
      formData.append("tags", user.tags);
      formData.append("Date", user.Date);
      formData.append("Title", user.Title);
      formData.append("Description", user.Description);
      formData.append("Para1", user.Para1);

      if (user.image) {
        formData.append("image", user.image, user.image.name);
      }
      if (user.pdfadress) {
        formData.append("pdfadress", user.pdfadress, user.pdfadress.name);
      }

      const res = await fetch("/api/MagazineInsert", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("Success", await res.json());
        router.push("/Dashboard/Magazine");
      } else {
        console.log("Failed", await res.json());
      }
    } catch (error) {
      console.log("Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.formContainer}>
      <p>Add Magazines</p>
      <form onSubmit={onSubmit} className={style.form}>
        <label htmlFor="field" className={style.label}>
          Field
        </label>
        <div>
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
        <div>
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
        <div>
          <input
            style={{ border: "2px solid #C0D3FA" }}
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
          <input
            type="file"
            className={style.input}
            id="pdfadress"
            name="pdfadress"
            onChange={handleInputChange}
          />
        </div>

        <div className={style.submit}>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Dashmagazines;
