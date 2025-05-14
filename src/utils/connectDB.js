import mongoose from "mongoose";

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to DB");
}

export default connectDB;


// import mongoose from "mongoose";

// async function connectDB() {
//     if (mongoose.connections[0].readyState) return;
//     mongoose.set("strictQuery", false);
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("connected to DB");
// }

// export default connectDB;