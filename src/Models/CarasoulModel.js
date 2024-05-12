import mongoose from "mongoose";

const CarasoulSchema = new mongoose.Schema({
  _id: Number,
  bg_color: String,
  text: String,
  Title: String,
  image: { type: Buffer, required: true },
  address : String,
});

// const Magazine = mongoose.models.Magazine ? mongoose.model.Magazine : mongoose.model("Magazine", MagazineSchema);
const Carasoul =
  mongoose.models.Carasoul || mongoose.model("Carasoul", CarasoulSchema);

console.log(mongoose.models);

export default Carasoul;
