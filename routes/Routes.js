const express = require("express");
const router = express.Router();
const { contact } = require("../controllers/contact");
const { home } = require("../controllers/home");

router.post("/contact", contact);
router.get("/", home);
module.exports = router;
