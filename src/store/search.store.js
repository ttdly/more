import { defineStore } from "pinia";
export const useSearchStore = defineStore("store", {
  state: () => ({
    type: "",
    id: "",
  }),
  actions: {
    init(type, id) {
      this.type = type;
      this.id = id;
    },
  },
});
