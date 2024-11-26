export const challenges = [
  {
    id: "1",
    title: "File Signature Analysis",
    description:
      "Sebuah file memiliki signature hex berikut: 89 50 4E 47 0D 0A 1A 0A. Tentukan tipe file tersebut.",
    flag: "PNG",
    hint: "File signatures sering disebut sebagai 'magic numbers' dan digunakan untuk mengidentifikasi tipe file.",
  },
  {
    id: "2",
    title: "Scan Surprise",
    description:
      "Sebuah gambar JPG bernama 'hidden_message.jpg' diduga menyembunyikan pesan rahasia. Gunakan tool steganography untuk mengekstrak pesan tersebut. Flag adalah pesan yang ditemukan.",
    flag: "CTF{ST3G0_M4ST3R}",
    hint: "Tools seperti steghide atau online steganography decoder bisa membantu mengekstrak pesan tersembunyi dari gambar.",
  },
];
