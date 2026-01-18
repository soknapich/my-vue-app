// stores/loading.js
import { defineStore } from "pinia";
import { getNext } from "@/apis/plan";
import {
  createBoqLevel2,
  updateBoqLevel2,
  deletBoqLevel2,
  copyBoqLevel2
} from "@/apis/boq-level-two";

export const useLevelTwoStore = defineStore("boqItems", {
  state: () => ({
    selected: null,
    levelId: null,
    errors: [],
    items: [],
  }),
  actions: {

    async getAll(id) {
      const response = await getNext(`/boq-level-two?parent_id=${id}`, {
        params: {
          per_page: 20,
          order_field: "id",
          order_by: "desc",
        },
      });
      if (response.data?.status) {
        const result = response.data.data;
        this.items = result;
      }
    },

    async create(data) {
      const response = await createBoqLevel2({
        params: data,
      }).catch((error) => {
        this.errors = error.response.data.errors;
      });

      if (response?.data?.status) {
        this.errors = [];
        await this.getAll(data.parent_id);
      }
    },

    async update(data) {
        // alert(data);
        const response = await updateBoqLevel2(data.id, {
          params: data,
        }).catch((error) => {
          this.errors = error.response.data.errors;
        });
  
        if (response?.data?.status) {
          this.errors = [];
          await this.getAll(data.parent_id);
        }
    },

    async delete(id, levelId) {
      await deletBoqLevel2(id);
      // refresh list AFTER delete
      await this.getAll(levelId);
    },

    async copyItem(id, levelId) {
      await copyBoqLevel2(id);
      // refresh list AFTER delete
      await this.getAll(levelId);
    },


  },
});
