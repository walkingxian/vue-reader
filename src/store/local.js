const STORAGE_KEY = 'vue_reader_' // 为了避免重名，这里添加一个前缀

export default {
  fetch(key) {
    var val = window.localStorage.getItem(STORAGE_KEY + key);
    return val?JSON.parse(val):null;
  },
  save(key, val) {
    window.localStorage.setItem(STORAGE_KEY + key, JSON.stringify(val))
  }
}