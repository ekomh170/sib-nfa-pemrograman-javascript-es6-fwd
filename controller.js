// controller.js
// Controller: menghubungkan logic DataStore (modules/data-store.js) ke aplikasi
import DataStore from "./modules/data-store.js";

export default class DataController {
  #store;

  constructor(initialData = []) {
    this.#store = new DataStore(initialData);
  }

  // Melihat data
  lihat() {
    return this.#store.getAll();
  }

  // Menambah data
  tambah(...items) {
    return this.#store.add(...items);
  }

  // Menghapus data
  hapus({ email = null, index = null } = {}) {
    return this.#store.remove({ email, index });
  }
}
