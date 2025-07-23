
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.camera.createMany({
    data: [
      { name: "Shop Floor A", location: "First Floor" },
      { name: "Vault", location: "Restricted Area" },
      { name: "Entrance", location: "Main Gate" },
    ]
  });

  const now = new Date();
  const baseTime = new Date(now.setFullYear(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0));

  const types = ["UNAUTHORIZED_ACCESS", "GUN_THREAT", "FACE_RECOGNIZED"];
  const videoUrl = "/videos/sample.mp4";

  for (let i = 0; i < 12; i++) {
    await prisma.incident.create({
      data: {
        cameraId: (i % 3) + 1,
        type: types[i % types.length],
        tsStart: new Date(baseTime.getTime() + i * 3600_000),
        tsEnd: new Date(baseTime.getTime() + i * 3600_000 + 600_000),
        thumbnailUrl: `/images/thumb${(i % 5) + 1}.jpg`,
        videoUrl: videoUrl,
        resolved: false,
      },
    });
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
