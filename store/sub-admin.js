import $axios from "@/plugins/axios";

export const state = () => ({
  allSubAdminData: [],
  singleSubAdminData: [],
});

export const getters = {
  getAllSubAdminData(state) {
    return state.allSubAdminData;
  },
  getSingleSubAdminData(state) {
    return state.singleSubAdminData;
  },
};

export const mutations = {
  setAllSubAdminData(state, payload) {
    state.allSubAdminData = payload;
  },
  setSingleSubAdminData(state, payload) {
    state.singleSubAdminData = payload;
  },
  removeSubAdmin(state, payload) {
    state.allSubAdminData = state.allSubAdminData.filter(
      (admin) => admin._id !== payload._id
    );
  },
};

export const actions = {
  async fetchAllSubAdmin(ctx, payload) {
    try {
      const response = await $axios.get("v1/admin/sub/admin", payload);
      ctx.commit("setAllSubAdminData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleSubAdmin(ctx, payload) {
    try {
      const response = await $axios.get(`v1/admin/sub/admin/${payload.id}`);
      ctx.commit("setSingleSubAdminData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateSubAdmin(ctx, payload) {
    try {
      const response = await $axios.put(
        `v1/admin/sub/admin/${payload._id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteSubAdmin(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/admin/sub/admin/${payload.id}`,
        payload
      );
      ctx.commit("removeSubAdmin", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async CreateSubAdmin(ctx, payload) {
    try {
      const response = await $axios.post("v1/admin/sub/admin", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
