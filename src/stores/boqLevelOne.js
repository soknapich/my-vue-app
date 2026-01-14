// stores/loading.js
import { defineStore } from 'pinia'
import { getNext } from "@/apis/plan";

export const useLevelOneStore = defineStore('boqLevelOne', {
  state: () => ({
    selected: null,
    items: []
  }),
  actions: {
    async getAll(id) {
      const response = await getNext(`/boq-level-one?house_id=${id}`, {
        params: {
          per_page: 20,
          order_field: 'id',
          order_by: 'desc'
        }
      });

      if (response.data?.status) {
        const result = response.data.data;
        this.items = result;
      }

    }
  }
})
