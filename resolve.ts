import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PATCH") {
    const updated = await prisma.incident.update({
      where: { id: parseInt(id as string) },
      data: { resolved: true },
    });
    res.status(200).json(updated);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
