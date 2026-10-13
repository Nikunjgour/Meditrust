import multer from "multer"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Temp dir for incoming uploads (cleaned up after Cloudinary upload).
// Resolved from this file so it works no matter where the server is started from.
const uploadDir = path.join(__dirname, "..", "..", "uploads")

// Multer never creates the destination folder itself, so ensure it exists.
fs.mkdirSync(uploadDir, { recursive: true })


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        let fileName = crypto.randomUUID() + "." + file.originalname.split(".")[1]
        cb(null, fileName)
    }
})


const upload = multer({ storage: storage })


export default upload