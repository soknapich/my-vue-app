// stores/loading.js
import { defineStore } from "pinia";
import { getNext, createItem, deletItem } from "@/apis/plan";

export const useBoqItemStore = defineStore("boqItem", {
  state: () => ({
    selected: null,
    items: [],
  }),
  actions: {
    async getAll(id) {
      const response = await getNext(`/boq-item?level_id=${id}`, {
        params: {
          per_page: 20,
          order_field: "id",
          order_by: "desc",
        },
      });
      if (response.data.status) {
        const result = response.data.data;
        this.items = result;
      }
    },

    async create(data) {
      //console.log(data);
      const response = await createItem({
        params: data,
      });

      if (response.data?.status) {
        await this.getAll(data.level_id);
      }
    },

    async delete(id, parent_id) {
      await deletItem(id);
      // refresh list AFTER delete
      await this.getAll(parent_id);
    },
  },
});
