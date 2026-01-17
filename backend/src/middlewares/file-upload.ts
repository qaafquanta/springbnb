import multer from "multer";
import path from "path";

export const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const uniqueName = `PROPERTY-${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),

  fileFilter(req, file, cb) {
    const allowTypes = /jpg|jpeg|png|svg|webp|gif|avif/;
    const extName = path.extname(file.originalname);
    const isTypeValid = allowTypes.test(extName);

    if (isTypeValid) {
      cb(null, true);
    } else {
      cb(new Error("Only image file are allowed"));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
});
