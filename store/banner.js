import $axios from "@/plugins/axios";

export const state = () => ({});

export const actions = {
  async createBanner(ctx, payload) {
    try {
      const response = await $axios.post("v1/admin/banners", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchBanners(ctx, payload) {
    try {
      const response = await $axios.get("v1/admin/banners", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
