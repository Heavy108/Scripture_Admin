import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongodb connected sucessfully");
    });

    connection.on("error", (err) => {
      console.log(
        "Mongodb connection error . Please make sure mongobd is running " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something Went wrong!");
    console.log(error);
  }
}
