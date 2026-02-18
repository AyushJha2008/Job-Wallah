import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");

//multer is storage which helps in storing files