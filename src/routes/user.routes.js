const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const { me, listUsers, changeRole } = require("../controllers/user.controller");

// Any logged-in user
router.get("/me", requireAuth, me);

// Admin-only
router.get("/", requireAuth, requireRole("admin"), listUsers);
router.patch("/:id/role", requireAuth, requireRole("admin"), changeRole);

module.exports = router;