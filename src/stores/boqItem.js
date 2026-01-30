// stores/loading.js
import { defineStore } from "pinia";
import { getNext, createItem, updateItem, deletItem, copyItem, updateActualItem } from "@/apis/plan";

export const useBoqItemStore = defineStore("boqItem", {
  state: () => ({
    selected: null,
    errors: [],
    errors1: [],
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
      const response = await createItem({
        params: data,
      }).catch((error) => {
        this.errors = error.response.data.errors;
      });

      if (response?.data?.status) {
        this.errors = [];
        await this.getAll(data.level_id);
      }
    },

    async update(data) {
      // alert(data);
      const response = await updateItem(data.id, {
        params: data,
      }).catch((error) => {
        this.errors = error.response.data.errors;
      });

      if (response?.data?.status) {
        this.errors = [];
        await this.getAll(data.level_id);
      }
    },

    async delete(id, parent_id) {
      await deletItem(id);
      // refresh list AFTER delete
      await this.getAll(parent_id);
    },

    async copyItem(id, parent_id) {
      await copyItem(id);
      await this.getAll(parent_id);
    },

    async updateActual(data) {
      //alert(data);
      const response = await updateActualItem(data.id, {
        params: data,
      }).catch((error) => {
        this.errors1 = error.response.data.errors;
      });

      if (response?.data?.status) {
        this.errors1 = [];
        await this.getAll(data.level_id);
      }
    },

  },
});
