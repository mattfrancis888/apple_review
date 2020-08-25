import axios from "axios";
//Used for onine JSON-store database
const streams = axios.create({
    // .. where we make our configurations
    baseURL: "https://apple-review-backend.vercel.app/",
});

export default streams;
