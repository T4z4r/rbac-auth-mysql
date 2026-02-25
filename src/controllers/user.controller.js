const prisma = require("../utils/prisma");

// GET /users/me (any logged-in user)
async function me(req, res) {
  const userId = Number(req.user.sub);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, status: true, createdAt: true, updatedAt: true },
  });

  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json(user);
}

// GET /users (admin only)
async function listUsers(req, res) {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return res.json(users);
}

// PATCH /users/:id/role (admin only)
async function changeRole(req, res) {
  const id = Number(req.params.id);
  const { role } = req.body;

  const allowed = ["user", "manager", "admin"];
  if (!allowed.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, name: true, email: true, role: true, status: true },
  });

  return res.json({ message: "Role updated", user: updated });
}

module.exports = { me, listUsers, changeRole };