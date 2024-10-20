/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// middlewares/multer.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (_req: any, file: any) => {
    return {
      folder: "fixed-products",
      format: (file.originalname.match(/\.(jpg|jpeg|png)$/i) ? "jpeg" : "png"),
      public_id: `${Date.now()}-${file.originalname}`,
      allowed_formats: ["jpg", "jpeg", "png"],
    };
  },
});

const upload = multer({
  storage,
  limits: { files: 5 }, // maximum of 5 images
  fileFilter: (_req: any, file: any, cb: any) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

export default upload;
