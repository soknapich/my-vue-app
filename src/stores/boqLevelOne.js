// stores/loading.js
import { defineStore } from "pinia";
import { getNext } from "@/apis/plan";
import {
  createBoqLevel1,
  updateBoqLevel1,
  deletBoqLevel1,
  copyBoqLevel1,
  copyAllBoqLevel1,
  copyMultipleBoqLevel1
} from "@/apis/boq-level-one";

export const useLevelOneStore = defineStore("boqLevelOne", {
  state: () => ({
    selected: null,
    houseId: null,
    openDailog: false,
    errors: [],
    items: [],
  }),
  actions: {

    async getAll(id) {
      const response = await getNext(`/boq-level-one?house_id=${id}`, {
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
      const response = await createBoqLevel1({
        params: data,
      }).catch((error) => {
        this.errors = error.response.data.errors;
      });

      if (response?.data?.status) {
        this.errors = [];
        await this.getAll(data.house_id);
      }
    },

    async update(data) {
      // alert(data);
      const response = await updateBoqLevel1(data.id, {
        params: data,
      }).catch((error) => {
        this.errors = error.response.data.errors;
      });

      if (response?.data?.status) {
        this.errors = [];
        await this.getAll(data.house_id);
      }
    },

    async delete(id, parent_id) {
      await deletBoqLevel1(id);
      // refresh list AFTER delete
      await this.getAll(parent_id);
    },

    async copyItem(id, parent_id) {
      await copyBoqLevel1(id);
      // refresh list AFTER delete
      await this.getAll(parent_id);
    },

    async copyAllItems(pid, hid, from_id) {
      await copyAllBoqLevel1({
        params: {
          plan_id: pid,
          to_house_id: hid,
          from_house_id: from_id
        }
      }
      );

      await this.getAll(from_id);
    },

    async copyMultipleItems(ids, parent_id) {
      //console.log({params: ids});
      await copyMultipleBoqLevel1(ids);
      await this.getAll(parent_id);
    },

  },
});
