const express = require("express");
const router = express.Router();
const { updateProfile,
    deleteProfile,
    searchProfile,
    getUserById
} = require("../controllers/userController");



router.put("/:userId", updateProfile);
router.delete("/:userId", deleteProfile);
router.get("/search", searchProfile);
router.get("/:userId", getUserById);

module.exports = router;
