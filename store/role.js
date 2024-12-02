import $axios from "@/plugins/axios";

export const state = () => ({
  allRoleData: [],
  singleRoleData: [],
});

export const getters = {
  getAllRoleData(state) {
    return state.allRoleData;
  },
  getSingleRoleData(state) {
    return state.singleRoleData;
  },
};

export const mutations = {
  setAllRoleData(state, payload) {
    state.allRoleData = payload;
  },
  setSingleRoleData(state, payload) {
    state.singleRoleData = payload;
  },
  removeRole(state, payload) {
    state.allRoleData = state.allRoleData.filter(
      (role) => role._id !== payload._id
    );
  },
};

export const actions = {
  async fetchAllRoles(ctx, payload) {
    try {
      const response = await $axios.get("v1/admin/roles", payload);
      ctx.commit("setAllRoleData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async fetchAllMenuAccess(ctx, payload) {
    try {
      const response = await $axios.get("v1/admin/menu/access", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleRole(ctx, payload) {
    try {
      const response = await $axios.get(`v1/admin/roles/${payload.id}`);
      ctx.commit("setSingleRoleData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateRole(ctx, { id, payload }) {
    try {
      const response = await $axios.put(`v1/admin/roles/${id}`, payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteRole(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/admin/roles/${payload.id}`,
        payload
      );
      ctx.commit("removeRole", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async createRole(ctx, payload) {
    try {
      const response = await $axios.post("v1/admin/roles", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
