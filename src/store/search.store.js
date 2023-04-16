import { defineStore } from "pinia";
export const useSearchStore = defineStore("store", {
  state: () => ({
    type: "",
    id: "R_kgDOG_HhTw",
  }),
  actions: {
    init(type, id) {
      this.type = type;
      this.id = id;
    },
  },
});
