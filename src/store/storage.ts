import { createMMKV } from "react-native-mmkv";
import type { StateStorage } from "zustand/middleware";

const storage = createMMKV({
  id: 'ae-mobil-storage',
});

export const mmkvStateStorage: StateStorage = {
  getItem: (name) => storage.getString(name) ?? null,
  removeItem: (name) => {
    storage.remove(name);
  },
  setItem: (name, value) => {
    storage.set(name, value);
  },
};
