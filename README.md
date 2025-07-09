Proyek "Toko informasi Game Rifqi" adalah sebuah implementasi Single-Page Application (SPA) yang dibangun dari dasar menggunakan Vue.js 3 dengan Composition API. Tujuan utamanya adalah untuk mensimulasikan lingkungan aplikasi e-commerce yang fungsional, dengan fokus pada dua alur pengguna yang berbeda: administrator dan konsumen. Aplikasi ini dirancang untuk menjadi reaktif, efisien, dan memiliki struktur kode yang terorganisir dengan baik.walaupun demikian website ini juga terdapat kekurangan dikarenakan tidak kesempurnaannya

Studi kasus yg saya buat  berfokus pada pembuatan prototipe aplikasi e-commerce yang fungsional untuk sebuah toko informasi game digital. Proyek ini tidak hanya mencakup aspek visual dan User Interface

Didalam Project ini terdapat arsitekturnya
Arsitektur aplikasi ini dirancang secara modular untuk memastikan setiap bagian memiliki tanggung jawab yang jelas, mudah dikelola, dan dapat dikembangkan lebih lanjut.

1.Framework Inti (Vue.js 3 & Vite): Inti dari aplikasi ini adalah Vue.js 3, dengan pemanfaatan Composition API secara penuh. Vue.js  dipilih karena kemampuannya untuk menganalisa logika komponen berdasarkan fitur, bukan berdasarkan opsi (data, methods, computed), sehingga menghasilkan kode yang lebih bersih dan mudah dipelihara. Seluruh lingkungan pengembangan didukung oleh Vite, yang menyediakan server pengembangan dengan Hot Module Replacement (HMR) super cepat dan proses build yang sangat teroptimasi.

2. Disini Fungsi Navigasi dan Routing (Vue Router): Vue Router adalah sebagai pustaka routing resmi untuk Vue, digunakan untuk menangani semua navigasi sisi klien. Implementasinya mencakup:

    a.Rute Statis & Dinamis: Konfigurasi rute statis untuk halaman seperti /login dan /cart, serta rute dinamis /game/:id untuk menangani tampilan detail produk yang tak terbatas jumlahnya hanya dengan satu komponen.

    b.Navigation Guard: Mekanisme keamanan diimplementasikan melalui router.beforeEach. Guard ini bertindak sebagai "penjaga gerbang" yang memeriksa setiap permintaan navigasi. Rute admin (/games) diberi metadata requiresAuth dan role: 'admin'. Sebelum memasuki rute ini, guard akan memverifikasi status login dan peran pengguna melalui authStore. Jika verifikasi gagal, pengguna akan dialihkan ke halaman lain, sehingga rute sensitif tetap aman.

3.Manajemen State Global (Pinia): Untuk data yang bersifat global (dapat diakses dan diubah oleh banyak komponen) Arsitektur state dibagi menjadi tiga store modular:

    a.authStore: Mengelola semua aspek autentikasi. Store ini menyimpan data user dan menangani logika login dan logout
    b.gameStore: Menjadi satu-satunya sumber kebenaran (single source of truth) untuk data game. Semua operasi CRUD (Create, Read, Update, Delete) dikelola melalui actions asinkron di dalam store ini.
    c.cartStore: Mengelola item di keranjang belanja. Store ini memiliki logika untuk mencegah duplikasi item (dengan menambah kuantitas) dan menyediakan getters reaktif (itemCount, totalPrice) yang secara otomatis menghitung ulang nilainya setiap kali ada perubahan pada item di keranjang.

4.Interaksi API (Axios & json-server): Simulasi backend dilakukan menggunakan json-server atau database palsu, yang menyajikan file statis db.json sebagai RESTful API yang lengkap. Komunikasi antara aplikasi Vue dan API ini ditangani oleh Axios, sebuah HTTP client berbasis Promise yang mempermudah penanganan permintaan asinkron.

5.Pengujian (Vitest): Untuk memastikan keandalan kode, Vitest diimplementasikan untuk pengujian unit. Pengujian difokuskan pada gameStore untuk memverifikasi logika bisnisnya secara terisolasi. Dengan teknik mocking pada axios (vi.mock), tes dapat dijalankan tanpa bergantung pada koneksi jaringan, memastikan bahwa yang diuji adalah murni logika internal dari store itu sendiri.

3. Alur Penggunaan Aplikasi (User Flow)
Berikut adalah skenario rute penggunaan aplikasi dari sudut pandang dua peran yang berbeda:

a. Alur User Biasa:

Kunjungan Awal: Pengguna pertama kali tiba di Halaman Beranda (/), muncul slider promosi dan daftar game populer yg di set awal sebanyak 8.

Eksplorasi Katalog: Pengguna mengklik menu "Katalog Game" dan diarahkan ke halaman /katalog-pengguna untuk melihat semua produk.

Melihat Detail: Tertarik pada sebuah game, pengguna mengklik kartu produk dan diarahkan ke halaman detail dinamis (/game/:id), di mana ia dapat melihat deskripsi lengkap dan informasi lainnya.

Menambah ke Keranjang: Dari halaman detail, pengguna mengklik tombol "Tambah ke Keranjang". Item ditambahkan ke cartStore, dan angka pada ikon keranjang di header akan bertambah.

Melihat Keranjang: Pengguna mengklik ikon keranjang di header dan diarahkan ke halaman /cart untuk meninjau semua item, melihat total harga, dan logo platform yang tersedia,ketika pengguna mengklik salah satu tombol platform,dia akan dilempar ke halaman platform itu.

b. Alur Administrator:

Akses Halaman Login: Admin membuka aplikasi dan mengklik tombol "Masuk", yang mengarahkannya ke halaman /login.

Proses Autentikasi: Admin memasukkan kredensial spesifik (admin@gmail.com dan password). authStore memvalidasi data ini.

Akses Halaman Admin: Setelah login berhasil, authStore menyimpan data admin (termasuk role: 'admin'). Pengguna secara otomatis diarahkan ke halaman Katalog Admin (/games) yang terproteksi. Tampilan header juga berubah, menampilkan menu "Katalog Admin" dan tombol "Keluar".

Manajemen Data (CRUD): Di halaman admin, admin dapat:

Menambah game baru melalui form modal.

Mengedit game yang ada dengan mengklik ikon edit.

Menghapus game dari daftar.

Logout: Setelah selesai, admin mengklik tombol "Keluar". authStore akan membersihkan sesi dari state dan localStorage, lalu mengarahkan admin kembali ke halaman login.




## 🚀 Fitur Utama

Aplikasi ini memiliki serangkaian fitur modern, antara lain:

* **Autentikasi Berbasis Peran:** Sistem login yang membedakan antara `admin` dan `user`.
* **Manajemen Produk (CRUD):** Admin dapat melakukan Create, Read, Update, dan Delete pada data game.
* **Katalog Produk:** Pengguna dapat melihat daftar game, halaman detail produk, dan menambahkan item ke keranjang.
* **Keranjang Belanja:** Fungsionalitas keranjang belanja yang persisten menggunakan Pinia dan `localStorage`.
* **Navigasi Dinamis:** Tampilan menu dan rute yang berubah sesuai dengan status login dan peran pengguna.
* **Unit Testing:** Pengujian unit pada state management (Pinia Store) menggunakan Vitest.

---

## 🛠️ Teknologi yang Digunakan

* **Framework:** Vue.js 3
* **Build Tool:** Vite
* **Routing:** Vue Router
* **State Management:** Pinia
* **HTTP Client:** Axios
* **Mock API:** json-server
* **Testing:** Vitest

---

## ⚙️ Cara Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/NAMA_USER_ANDA/NAMA_REPO_ANDA.git](https://github.com/NAMA_USER_ANDA/NAMA_REPO_ANDA.git)
    ```
    2.  **Masuk ke direktori proyek:**
    ```bash
    cd NAMA_REPO_ANDA
    ```

3.  **Install semua dependency:**
    ```bash
    npm install
    ```

4.  **Jalankan Mock API Server (di terminal pertama):**
    ```bash
    npm run api
    ```
    Server akan berjalan di `http://localhost:3000`.

5.  **Jalankan Aplikasi Vue (di terminal kedua):**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5174` atau port lain yang tersedia.

---

## 🔑 Kredensial Login

Anda dapat menggunakan kredensial berikut untuk mencoba peran yang berbeda:

* **Admin:**
    * **Email:** `admin@gmail.com`
    * **Password:** `password`
* **Pengguna Biasa:**
    * Bisa menggunakan email dan password apa saja.