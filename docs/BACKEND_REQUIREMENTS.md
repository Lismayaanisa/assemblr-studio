# Kebutuhan Backend: Login, Register, dan Setup Moment (Assemblr Studio)

Rangkuman ini hanya memuat apa yang **benar-benar tampil di UI dan dipakai alurnya**.
Sumbernya adalah `index.html`, `auth.js`, dan `app.js`. Saat ini prototype belum punya
backend sama sekali: semua data masih di sisi klien dan hanya demo. Variabel internal
yang tidak muncul di UI (state animasi, step stepper, dev hooks, data aset, teks copy)
sengaja tidak dimasukkan.

Tanda: **[Berfungsi]** = sudah ada alurnya di prototype. **[Tombol saja]** = tampil di
UI tapi prototype hanya menampilkan pesan "belum tersedia", jadi backend perlu
menyediakannya.

---

## 1. Alur singkat

```
Login / Register  →  Setup (name → source → phone → role → [age, khusus student] → goal → subject)
                  →  Try it  →  Finish  →  Welcome (carousel)
```

Setelah login/daftar berhasil, user langsung masuk ke Setup. Nama dari form daftar
dipakai untuk mengisi kolom nama di step pertama.

---

## 2. Autentikasi

### 2.1 Metode masuk dan daftar

| Metode | Tampil di | Status | Kebutuhan backend |
|---|---|---|---|
| Email/username + password | Tab Login | [Berfungsi] | Login dengan username **atau** email. Input yang mengandung `@` dianggap email. |
| Sign up with Email | Tab Register | [Berfungsi] | Registrasi (lihat 2.2). |
| Google | Login dan Register | [Berfungsi] (hanya ini yang lanjut ke Setup tanpa form) | OAuth Google. |
| Belajar.id (badge NEW) | Login dan Register | [Tombol saja] | SSO Belajar.id. |
| Facebook | Login dan Register | [Tombol saja] | OAuth Facebook. |
| Apple | Login dan Register | [Tombol saja] | Sign in with Apple. |
| Join by Code | Login dan Register | [Berfungsi] | Lihat 2.3. |
| Forgot password | Tab Login dan form Join by Code | [Tombol saja] | Alur reset kata sandi (lihat 2.4). |

### 2.2 Register dengan email

| Field | Aturan di UI |
|---|---|
| `full_name` | Wajib |
| `email` | Wajib, format email valid |
| `username` | Wajib. Harus unik (placeholder UI: `oliverbonnet`). |
| `password` | Wajib |
| `confirm_password` | Wajib, harus sama dengan password (validasi cukup di klien) |
| `newsletter_opt_in` | Checkbox opsional: "Subscribe to Assemblr email newsletter" |
| `terms_accepted` | Checkbox wajib: setuju syarat dan ketentuan |

Tombol SIGN UP nonaktif sampai semua yang wajib terisi. Teks syarat menaut ke
`https://edu.assemblrworld.com/en/tos` dan `.../en/privacy-policy`.

Backend perlu: cek email dan username sudah dipakai, simpan `terms_accepted` beserta
waktunya, dan simpan `newsletter_opt_in`.

### 2.3 Join by Code

Alurnya: masukkan kode → lihat pratinjau grup/kelas/tim → konfirmasi → form login atau
daftar → masuk ke Setup.

| Jenis kode | Format | Pratinjau yang ditampilkan | Form berikutnya |
|---|---|---|---|
| Group | `ACE-XXXX-YYYY` | "{Nama pemilik}'s Group" | Login (tab Login/Register tersedia) |
| Team | `ACE-XXXX-YYYY` | "{Nama pemilik}'s Group", tombol "Confirm & create my account" | Register |
| Class | 5 huruf (contoh `BNNZH`) | Nama kelas, nama guru, jumlah siswa + jumlah guru | Login |

Endpoint verifikasi kode perlu mengembalikan: `kind` (`group` / `team` / `class`), nama
pemilik atau nama kelas (dalam EN dan ID untuk kelas), nama guru, jumlah siswa, jumlah
guru. Kode tidak valid menampilkan pesan error.

Form setelah konfirmasi: `name` (hanya saat Register atau Reset), `username`, `password`.
Setelah berhasil, user ditandai bergabung lewat kode. Ini nanti mengisi pilihan
"Through my school" di step Age secara otomatis.

Kode demo di prototype (bukan data nyata): `ACE-DEWI-2026`, `ACE-LINCOLN-2026`, `BNNZH`.

### 2.4 Reset kata sandi (dari form Join by Code)

Field: `name`, `username`, `new_password`. UI meminta "nama dan nama pengguna yang sama
dengan akunmu". Tombol utama login juga punya tautan "Forgot password?" yang di
prototype hanya menampilkan pesan. Backend sebaiknya memilih satu mekanisme (email
reset atau verifikasi nama + username seperti form ini).

---

## 3. Data profil dari Setup

Semua field di bawah dikumpulkan di UI. Urutan sesuai layar.

| # | Step | Field | Tipe dan aturan | Wajib? |
|---|---|---|---|---|
| 1 | Name | `display_name` | Teks, maks. 40 karakter | Ya |
| 1 | Name | `avatar` | Salah satu dari 17 avatar bawaan **atau** unggahan gambar (`image/*`) dari user | Otomatis terisi avatar pertama |
| 2 | Source | `source` | Pilih satu: `google`, `youtube`, `tiktok`, `instagram`, `facebook`, `blog`, `events`, `people`, `other` | Ya |
| 2 | Source | `source_detail` | Teks. Untuk `events`: nama acara (opsional). Untuk `other`: **wajib** isi. | Bersyarat |
| 3 | Phone | `phone_country` | Kode negara dari 17 pilihan (lihat 3.1). Default Indonesia (+62). | Ya |
| 3 | Phone | `phone_number` | Hanya angka, 7 sampai 13 digit, **tanpa** angka 0 di depan dan tanpa kode negara | Ya |
| 3 | Phone | `whatsapp_marketing_consent` | Checkbox opsional, default tidak dicentang | Tidak |
| 4 | Role | `role` | Pilih satu: `student`, `educator`, `university`, `parent`, `lecturer`, `other` | Ya |
| 4 | Role | `role_other` | Teks, muncul jika `role = other` (contoh: "librarian or principal") | Bersyarat |
| 5 | Age | `age` | Bilangan bulat 4 sampai 99. **Hanya ditanya jika `role = student`.** | Ya, untuk student |
| 5 | Age | `join_via` | `school` / `guardian` / `own`. Hanya student. | Ya, untuk student |
| 5 | Age | `guardian_email` | Email valid. Lihat aturan di 3.2. | Bersyarat |
| 6 | Goal | `goal` | Satu id sesuai role (lihat 3.3) | Ya |
| 6 | Goal | `goal_detail` | Teks atau pilihan tambahan, tergantung goal (lihat 3.3) | Bersyarat |
| 7 | Subject | `subjects` | Daftar nilai (lihat 3.4). Student maks. 1, lainnya maks. 2. | Opsional |
| 7 | Subject | `subject_other` | Teks bebas jika memilih `Other` | Bersyarat |
| 7 | Subject | `grades` | Daftar nilai (lihat 3.4). Student maks. 1, lainnya maks. 2. | Opsional |
| 7 | Subject | `grade_other` | Teks bebas jika memilih `Other` | Bersyarat |

Tambahan di level akun yang berasal dari header UI:

| Field | Nilai | Catatan |
|---|---|---|
| `language` | `en` (US English) / `id` (Bahasa Indonesia) | Dipilih lewat dropdown bendera. Menentukan bahasa UI. |

### 3.1 Daftar kode negara untuk telepon (17)

Indonesia +62, Malaysia +60, Singapore +65, Philippines +63, Thailand +66, Vietnam +84,
Brunei +673, Timor-Leste +670, India +91, Saudi Arabia +966, United Arab Emirates +971,
Japan +81, South Korea +82, Australia +61, Netherlands +31, United Kingdom +44,
United States +1.

### 3.2 Aturan anak di bawah 13 tahun (hanya `role = student`)

Ini aturan produk yang terlihat di UI dan harus ditegakkan juga di backend:

| Kondisi | Aturan |
|---|---|
| `age < 13` | `projects_private = true` (hanya anak, orang tua/wali, dan guru yang bisa melihat). |
| `age < 13` | `marketing_allowed = false` dan `whatsapp_marketing_consent` dipaksa `false`. Tidak ada iklan. |
| `age < 13` | Opsi `join_via = own` ("On my own") **tidak boleh**. |
| `age >= 13` | `projects_private = false`. `marketing_allowed` mengikuti consent. |
| `age < 13`, atau `join_via = guardian` | `guardian_email` **wajib** dan valid. |
| `age >= 13` dan `join_via` bukan `guardian` | `guardian_email` tidak ditanya. |
| `join_via` | Terisi `school` otomatis jika user masuk lewat Join by Code. |

Pilihan "Same as the email I signed up with" hanya muncul jika user daftar atau masuk
dengan email. Itu hanya mengisi `guardian_email` dengan email akun. Backend cukup
menerima nilai emailnya.

### 3.3 Goal per role

Semua pertanyaan goal berjudul "What would you like to do?". Yang disimpan adalah `id`.
Kolom "Detail" adalah pertanyaan lanjutan yang muncul saat goal dipilih.

| Role | Goal id | Detail yang diminta |
|---|---|---|
| student | `assignment` | - |
| student | `exam` | Teks: "Who is organizing this?" |
| student | `competition` | Teks: "What is the event called?" |
| student | `learn-ar` | - |
| student | `explore` | - |
| student | `other` | Teks wajib: "What's your motivation?" |
| university | `assignment` | - |
| university | `thesis` | Teks: "What kind of research is this?" |
| university | `exam` | Teks: "Who is organizing this?" |
| university | `competition` | Teks: "What is the event called?" |
| university | `learn-ar` | - |
| university | `other` | Teks wajib: "What's your motivation?" |
| educator | `materials` | - |
| educator | `activity` | - |
| educator | `exam` | Teks: "Who is organizing this?" |
| educator | `introduce` | - |
| educator | `skills` | - |
| educator | `other` | Teks wajib: "What's your motivation?" |
| parent | `homework` | - |
| parent | `concepts` | - |
| parent | `fun` | - |
| parent | `kid-skills` | - |
| parent | `kid-ar` | - |
| parent | `other` | Teks wajib: "What's your motivation?" |
| lecturer | `research` | Teks: "What kind of research is this?" |
| lecturer | `train` | Pilihan: `Personal event` / `Institutional` / `Other` (jika Other, teks bebas) |
| lecturer | `introduce-uni` | - |
| lecturer | `programs` | - |
| lecturer | `explore` | - |
| lecturer | `other` | Teks wajib: "What's your motivation?" |
| other | `ar`, `content`, `pro`, `community`, `learn`, `personal` | - |
| other | `other` | Teks wajib: "What's your motivation?" |

Detail teks yang bukan "motivation" tidak wajib diisi.

### 3.4 Subject dan grade

Nilai `subjects` untuk role selain university dan lecturer:
`Science`, `Programming`, `Biology`, `Physics`, `Chemistry`, `Math`, `Design`,
`History`, `Language`, `Other`.

Untuk `university` dan `lecturer`, "subject" berubah menjadi **field**:
`Educational technology`, `Media and visual communication`, `Computer science`, `Other`.

Nilai `grades` bergantung pada role:

| Role | Pilihan grade |
|---|---|
| student, educator, parent, other | `Kindergarten`, `Grade 1` sampai `Grade 12`. Educator, parent, dan other juga punya `University` dan `Other`; student hanya `Other`. |
| university, lecturer | `Year 1`, `Year 2`, `Year 3`, `Year 4`, `Postgraduate`, `Other` |

Aturan jumlah pilihan: student 1 subject dan 1 grade; role lain maksimal 2 subject dan
maksimal 2 grade. Kedua pertanyaan opsional.

---

## 4. Konten "Try it" (rekomendasi berdasarkan jawaban)

Step ini menampilkan satu konten yang dipilih dari `role`, `goal`, `subjects`, dan
`age`. Saat ini aturannya ada di frontend. Jika tim ingin konten bisa diganti tanpa
rilis ulang, backend bisa menyediakan aturan yang sama.

| Role : goal | Judul | Konten |
|---|---|---|
| student: `assignment`, `exam`, `other` | Explore this project | Embed proyek Litosphere |
| student: `competition`, `explore` | Explore this project | Embed proyek Energy |
| student: `learn-ar` | Explore this AR tutorial | Video YouTube. Usia di bawah 5: video scene. Selain itu: video game camera. |
| educator: `materials` | Explore this interactive learning slide | Cover Topic Temperature |
| educator: `skills` | Explore this teaching inspiration | Halaman inspirasi menurut subject pertama: Math/Programming, Science/Biology/Physics/Chemistry, atau Language/History |
| university: `thesis` | Explore this project | Embed proyek Agriculture |
| university: `learn-ar` | Explore this AR tutorial | Video scene |
| parent: `kid-ar` | Explore this AR book | Cover AR book |
| parent: `kid-skills` | Explore coding with AR | Video game camera |
| lecturer: `research` | Explore this project | Embed proyek Energy |
| lecturer: `train` | Explore this AR tutorial | Video scene |
| lecturer: `programs` | Explore coding with AR | Cover AR coding |
| lecturer: `introduce-uni` | Explore this AR book | Cover AR book |
| lainnya | Explore this project | Embed proyek Litosphere |

Embed berasal dari `v2.editor.assemblrworld.com/Embed/{id}` dan video dari YouTube.
Tidak ada data user yang dikirim ke embed.

Tombol **Finish** pada step ini aktif langsung untuk embed proyek. Untuk video, slide,
halaman, dan AR book, Finish aktif setelah user membuka layar penuh. Ini hanya aturan
UI, backend tidak perlu menyimpannya.

---

## 5. Saat Finish

Finish memicu transisi lalu Welcome carousel. Welcome hanya menampilkan konten statis
yang dipilih dari `role` dan `goal`, tanpa input user.

Backend sebaiknya menerima **satu panggilan penyelesaian onboarding** di titik ini
dengan seluruh payload di bagian 3 (prototype saat ini tidak mengirim apa pun). Lihat
contoh di bagian 7.

---

## 6. Ringkasan endpoint yang dibutuhkan

Usulan minimal, diturunkan dari alur UI. Nama dan bentuknya bisa disesuaikan.

| Kebutuhan | Dipicu oleh | Catatan |
|---|---|---|
| Login (username atau email + password) | Tab Login | Mengembalikan sesi. |
| Register email | Form Sign up with Email | Cek unik email dan username. |
| OAuth Google | Tombol Google | Wajib. Belajar.id, Facebook, Apple bisa menyusul. |
| Verifikasi kode (group, team, class) | Join by Code | Mengembalikan data pratinjau. |
| Login/register lewat kode | Form setelah konfirmasi kode | Menghubungkan akun ke grup atau kelas. |
| Reset kata sandi | Forgot password | Mekanisme belum diputuskan. |
| Unggah avatar | Lingkaran upload di step Name | Gambar dari user, simpan dan kembalikan URL. |
| Simpan profil onboarding | Finish | Payload bagian 3 sekaligus. |
| Daftar opsi (opsional) | Setup | Source, role, goal, subject, grade, negara. Bisa tetap di frontend. |

---

## 7. Contoh payload penyelesaian onboarding

```json
{
  "display_name": "Dewi",
  "avatar": { "type": "preset", "id": 19 },
  "language": "id",
  "source": "events",
  "source_detail": "Webinar guru",
  "phone_country": "ID",
  "phone_number": "81234567890",
  "whatsapp_marketing_consent": true,
  "role": "educator",
  "goal": "exam",
  "goal_detail": "PPG",
  "subjects": ["Science"],
  "grades": ["Grade 7", "Grade 8"]
}
```

Contoh untuk student di bawah 13 tahun:

```json
{
  "display_name": "Raka",
  "avatar": { "type": "preset", "id": 9 },
  "language": "id",
  "source": "people",
  "phone_country": "ID",
  "phone_number": "81234567890",
  "whatsapp_marketing_consent": false,
  "role": "student",
  "age": 9,
  "join_via": "guardian",
  "guardian_email": "ibu.raka@email.com",
  "goal": "assignment",
  "subjects": ["Science"],
  "grades": ["Grade 3"],
  "projects_private": true,
  "marketing_allowed": false
}
```

---

## 8. Hal yang perlu diputuskan tim backend

- Mekanisme reset kata sandi yang dipakai (email atau nama + username).
- Aturan kekuatan kata sandi. UI belum menetapkan batas apa pun.
- Penyimpanan avatar unggahan: ukuran maksimum, format, dan moderasi gambar.
- Verifikasi nomor telepon (OTP) dan verifikasi `guardian_email` (izin orang tua) untuk
  anak di bawah 13. Prototype hanya mengumpulkan datanya, tidak memverifikasi.
- Apakah `projects_private` dan `marketing_allowed` dihitung di server dari `age`
  (disarankan) atau dikirim dari klien.
- Kapan Belajar.id, Facebook, dan Apple diaktifkan. Tombolnya sudah tampil di UI.
- Apakah aturan konten "Try it" (bagian 4) pindah ke server.
