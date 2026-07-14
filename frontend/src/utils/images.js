// High-quality handicraft images for decorative use
const craftImages = [
  "/uploads/12.jpg",
  "/uploads/13.jpg",
  "/uploads/09.jpg",
  "/uploads/10.jpg",
  "/uploads/11.jpg",
  "/uploads/14.jpg",
  "/uploads/15.jpg",
  "/uploads/16.jpg",
  "/uploads/20.jpg",
  "/uploads/17.jpg",
  "/uploads/19.jpg",
  "/uploads/18.jpg",
  "/uploads/08.jpg",
  "/uploads/21.jpg",
  "/uploads/22.jpg",
  "/uploads/07.jpg",
];

export function randomCraftImage() {
  return craftImages[Math.floor(Math.random() * craftImages.length)];
}

export function getJournalImages() {
  // Pick 3 unique images for journal cards
  const shuffled = [...craftImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}
