// const express = require("express");
// const router = express.Router();

// router.get("/test", (req, res) => {
//     res.json({
//         success: true,
//         message: "Upload route is working!"
//     });
// });

// module.exports = router;


const express = require("express");
const router = express.Router();

const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const r2 = require("../config/r2Client");
const { v4: uuid } = require("uuid");
const { addRow } = require("../services/googleSheet");


// Test Route
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Upload route is working!"
    });
});

// Generate Upload URL
router.post("/presign", async (req, res) => {
    try {

        const { fileName, fileType } = req.body;

        if (!fileName || !fileType) {
            return res.status(400).json({
                success: false,
                message: "fileName and fileType are required"
            });
        }

        const key = `${uuid()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
            ContentType: fileType
        });

        const uploadUrl = await getSignedUrl(r2, command, {
            expiresIn: 300
        });

        res.json({
            success: true,
            uploadUrl,
            key
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});


router.post("/confirm", async (req, res) => {
    console.log("========== CONFIRM API HIT ==========");
    console.log(req.body);
    try {

        console.log("Received Quote:");
        console.log(req.body);

        await addRow(req.body);

        // For now just return success.
        // Later we'll save everything to Google Sheets.

        res.json({
            success: true,
            message: "Quote received successfully."
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

module.exports = router;