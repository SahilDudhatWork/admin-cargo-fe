import $axios from "@/plugins/axios";

export const state = () => ({});

export const actions = {
  async createArea(ctx, payload) {
    try {
      const response = await $axios.post("v1/admin/coordinates", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchAreas(ctx, payload) {
    try {
      const page = payload?.page || "";
      const limit = payload?.limit || "";

      const response = await $axios.get(
        `v1/admin/coordinates?page=${page}&limit=${limit}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleArea(ctx, payload) {
    try {
      const response = await $axios.get(`v1/admin/coordinates/${payload.id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateArea(ctx, payload) {
    try {
      const response = await $axios.put(
        `v1/admin/coordinates/${payload.id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteArea(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/admin/coordinates/${payload.id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
