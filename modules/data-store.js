// modules/data-store.js
// Modul untuk menyimpan dan mengelola data array of object
export default class DataStore {
  #data = [];

  constructor(initialData = []) {
    this.#data = [...initialData];
  }

  getAll() {
    return [...this.#data];
  }

  add(...items) {
    items.forEach(it => {
      if (!it?.nama || !it?.umur || !it?.alamat || !it?.email) {
        throw new Error("Data tidak lengkap (butuh nama, umur, alamat, email)");
      }
    });
    this.#data.push(...items);
    return this.getAll();
  }

  remove({ email = null, index = null } = {}) {
    if (email) {
      const before = this.#data.length;
      this.#data = this.#data.filter(item => item.email !== email);
      return before !== this.#data.length;
    }
    if (Number.isInteger(index) && index >= 0 && index < this.#data.length) {
      this.#data.splice(index, 1);
      return true;
    }
    return false;
  }
}
