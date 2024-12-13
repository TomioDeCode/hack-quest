export const cryptoData = [
  {
    id: "crypto-1",
    title: "MOD26 Cipher",
    description:
      "Pesan berikut telah dienkripsi menggunakan MOD26 cipher dengan shift 3. Angka-angka yang dienkripsi: 7 0 3 3 9 14 15 15 3 18 0 19 4 Dekripsi: Kurangi setiap angka dengan 3, lalu ambil hasilnya mod 26.",
    flag: "CTF{EXAAGLMMAPXQB}",
    file: "",
    url: "",
    hint: "Angka pertama adalah 7. Setelah mengurangi 3, hasilnya adalah 4, yang berarti huruf 'E'. Dekripsi seluruh rangkaian angka untuk mendapatkan pesan tersembunyi",
  },
  {
    id: "crypto-2",
    title: "The Numbers",
    description:
      "Seseorang meninggalkan pesan terenkripsi berupa angka yang merepresentasikan posisi huruf dalam alfabet. Berikut angkanya: 3 20 6 8 5 18 5 5 14 20 5 18 19 Dekripsi pesan ini!",
    flag: "CTF{HEREENTERS}",
    file: "",
    url: "",
    hint: "Angka pertama adalah 3, yang berarti huruf ke-3 dalam alfabet (yaitu 'C'). Dekripsi seluruh rangkaian angka untuk mendapatkan pesan tersembunyi",
  },
  {
    id: "crypto-3",
    title: "Caesar Shift",
    description:
      "Pesan berikut dienkripsi menggunakan cipher Caesar dengan geseran sebesar 5. Untuk mendekripsi pesan ini, kalian perlu menggeser setiap huruf kembali sebanyak 5 posisi dalam alfabet.\n\nBerikut adalah pesan yang kalian temukan:\n\n'Jgqi gwtqi jshwduy' \n\nTugas kalian adalah mendekripsi pesan tersebut.",
    flag: "CTF{Ebli_brold_encrypt}",
    file: "",
    url: "",
    hint: "Pesan ini menggunakan cipher Caesar dengan geseran 5. Cobalah untuk menggeser setiap huruf mundur sebanyak 5 langkah",
  },
  // {
  //   id: "crypto-4",
  //   title: "Reverse Alphabet",
  //   description:
  //     "Pesan berikut telah dienkripsi dengan membalik urutan alfabet. Yaitu, A menjadi Z, B menjadi Y, C menjadi X, dan seterusnya. Untuk mendekripsi pesan ini, kalian perlu mengganti setiap huruf dengan pasangan terbaliknya dalam alfabet.\n\nBerikut adalah rangkaian huruf yang kalian temukan:\n\n'Zmbgsrmt' \n\nTugas kalian adalah untuk mendekripsi pesan ini.",
  //   flag: "CTF{Encrypted}",
  //   file: "",
  //   url: "",
  //   hint: "Pesan ini dienkripsi dengan membalik urutan alfabet. Gantilah setiap huruf dengan pasangan terbaliknya dalam alfabet",
  // },
  // {
  //   id: "crypto-5",
  //   title: "XOR Cipher",
  //   description:
  //     "Pesan berikut telah dienkripsi menggunakan cipher XOR dengan kunci 23. Tugas kalian adalah untuk mendekripsi pesan ini dengan melakukan operasi XOR antara setiap karakter dengan angka kunci 23.\n\nBerikut adalah pesan terenkripsi dalam bentuk hexadecimal:\n\n'47 49 4b 44' \n\nTugas kalian adalah untuk mendekripsi pesan tersebut.",
  //   flag: "CTF{XORexample}",
  //   file: "",
  //   url: "",
  //   hint: "Pesan ini dienkripsi menggunakan cipher XOR dengan kunci 23. Lakukan operasi XOR antara setiap karakter dengan kunci 23 untuk mendekripsi pesan",
  // },
];
