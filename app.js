// app.js
// Contoh penggunaan controller dan render data ke DOM menggunakan map()
import { orang } from "./data.js";
import DataController from "./controller.js";

// Inisialisasi controller dengan 10 data awal
const controller = new DataController(orang);

// Helper: render ke tabel menggunakan map()
function renderTable(rows) {
  const tbody = document.querySelector("#tbody");
  tbody.innerHTML = rows
    .map((o, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${o.nama}</td>
        <td>${o.umur}</td>
        <td>${o.alamat}</td>
        <td>${o.email}</td>
      </tr>
    `)
    .join("");
}

function syncView() {
  const data = controller.lihat();
  renderTable(data);
  console.table(data); // juga tampil di console untuk verifikasi
}


// 1) Tampilkan data awal
syncView();

// 2) Tambahkan minimal 2 data (push)
controller.tambah(
  { nama: "Eko Muchamad Haryono", umur: 22, alamat: "Kab Bogor", email: "ekomh13@example.com" },
  { nama: "Okta Nur", umur: 23, alamat: "Bandung", email: "okta@example.com" }
);
syncView();

// 3) Hapus satu data (contoh by email)
controller.hapus({ email: "budi@example.com" });
syncView();

// Opsi: Form tambah & hapus interaktif
document.querySelector("#form-add")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    controller.tambah({
      nama: fd.get("nama"),
      umur: Number(fd.get("umur")),
      alamat: fd.get("alamat"),
      email: fd.get("email")
    });
    e.target.reset();
    syncView();
  } catch (err) {
    alert(err.message);
  }
});

document.querySelector("#form-del")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const email = fd.get("emailDel");
  const ok = controller.hapus({ email });
  if (!ok) alert("Data dengan email tsb tidak ditemukan.");
  e.target.reset();
  syncView();
});
