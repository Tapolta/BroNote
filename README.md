# 📝 BroNote

**BroNote** adalah aplikasi pencatat pribadi sederhana yang memanfaatkan teknologi web modern untuk mencatat ide, tugas, dan pikiran sehari-hari. Dilengkapi fitur tag berwarna, pencarian, dan filter berdasarkan tanggal — semuanya disimpan langsung di browser kamu via `localStorage`.

![Screenshot](./screenshots/main-view.png) <!-- (optional) tambahkan folder "screenshots" dan simpan gambar di sana -->

## ✨ Fitur

- 🗂 Membuat, mengedit, dan menghapus catatan
- 🔖 Sistem tag warna-warni yang bisa dikustomisasi
- 📅 Filter catatan berdasarkan tanggal dan tag
- 🔍 Pencarian cepat
- 💾 Penyimpanan lokal tanpa backend (menggunakan `localStorage`)
- 🎨 Desain bersih dengan TailwindCSS

## 🚀 Teknologi yang Digunakan

- ⚛️ [React](https://reactjs.org/)
- 💨 [Tailwind CSS](https://tailwindcss.com/)
- 🧠 State disimpan di `localStorage`
- 📝 Markdown editor: [React MDE](https://github.com/Ionaru/react-mde) + [Showdown](https://github.com/showdownjs/showdown)

## 🛠 Cara Menjalankan Proyek

```bash
# Clone repo
git clone https://github.com/Tapolta/BroNote.git
cd BroNote

# Install dependencies
npm install

# Jalankan aplikasi
npm run dev
