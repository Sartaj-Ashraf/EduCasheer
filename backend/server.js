import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { app } from "./src/app.js";
const port =process.env.PORT || 5000
dotenv.config({
    path:"./env"
});



connectDB()
.then(()=>{
    app.listen(port, () => {
                console.log(`Server running on port https://localhost:${port}`); 
            });
})
.catch(err=>{
    console.error("MongoDb connection failed",err)
})






// DB Connection setting
// (async()=>{
// try {
//     await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//     app.on("Error",(error)=>{
//         console.log("App error ", error)
//     })
//     app.listen(port, () => {
//         console.log(`Server running on port https://localhost:${port}`); 
//     });
// } catch (error) {
//     console.error("ERROR", error)
//     throw new error("ERROR Connecting DB")
// }
// })();


