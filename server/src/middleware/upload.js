import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({ url: process.env.CLOUDINARY_URL });

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "zenx/images",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ quality: "auto" }]
  }
});

const proofStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "zenx/proofs",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
    resource_type: "auto"
  }
});

export const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export const proofUpload = multer({
  storage: proofStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

export default { imageUpload, proofUpload };
