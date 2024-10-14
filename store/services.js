import $axios from "@/plugins/axios";

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async fetchAllServices(ctx, payload) {
    try {
      const sortBy = payload?.sortBy || "";
      const keyWord = payload?.keyWord || "";
      const page = payload?.page || "";
      const limit = payload?.limit || "";

      const response = await $axios.get(
        `v1/admin/services?&keyWord=${keyWord}&sortBy=${sortBy}&page=${page}&limit=${limit}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleService(ctx, payload) {
    try {
      const response = await $axios.get(
        `v1/admin/services/${payload.id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateService(ctx, { formData, id }) {
    try {
      const response = await $axios.put(`v1/admin/services/${id}`, formData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
