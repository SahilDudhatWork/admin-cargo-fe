import $axios from "@/plugins/axios";

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async fetchCoordinates(ctx, payload) {
    try {
      const response = await $axios.get(
        "v1/admin/settings/coordinates",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateCoordinates(ctx, payload) {
    try {
      const response = await $axios.put(
        "v1/admin/settings/coordinates",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
