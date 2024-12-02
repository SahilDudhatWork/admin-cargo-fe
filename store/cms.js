import $axios from "@/plugins/axios";

export const store = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async fetchAllCms(ctx, payload) {
    try {
      const response = await $axios.get("v1/admin/guidelinePages", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async fetchSingleCms(ctx, payload) {
    try {
      const response = await $axios.get(
        `/v1/admin/guidelinePages/${payload.id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async createCms(ctx, payload) {
    try {
      const response = await $axios.post("v1/admin/guidelinePages", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updateCms(ctx, payload) {
    try {
      const response = await $axios.put(
        `/v1/admin/guidelinePages/${payload._id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteCms(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/admin/guidelinePages/${payload.id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
