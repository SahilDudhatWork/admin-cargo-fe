import $axios from "@/plugins/axios";

export const state = () => ({
  allUserData: [],
  singleUserData: [],
  userPaginationData: {},
});

export const getters = {
  getAllUserData(state) {
    return state.allUserData;
  },
  getSingleUserData(state) {
    return state.singleUserData;
  },
  getUserPaginationData(state) {
    return state.userPaginationData;
  },
};

export const mutations = {
  setAllUserData(state, payload) {
    state.allUserData = payload;
  },
  setSingleUserData(state, payload) {
    state.singleUserData = payload;
  },
  setUserPaginationData(state, payload) {
    state.userPaginationData = payload;
  },
  toggleBlock(state, payload) {
    const userIndex = state.allUserData.findIndex(
      (user) => user._id === payload._id
    );
    state.allUserData[userIndex].isBlocked =
      !state.allUserData[userIndex].isBlocked;
  },
  userVerification(state, payload) {
    const userIndex = state.allUserData.findIndex(
      (user) => user._id === payload._id
    );
    state.allUserData[userIndex].verifyByAdmin =
      !state.allUserData[userIndex].verifyByAdmin;
  },
  removeUser(state, payload) {
    state.allUserData = state.allUserData.filter(
      (user) => user._id !== payload.id
    );
  },
};

export const actions = {
  async fetchAllUser(ctx, payload) {
    try {
      const sortBy = payload?.sortBy || "";
      const page = payload?.page || "";
      const limit = payload?.limit || "";

      const response = await $axios.get(
        `v1/admin/module/user?&sortBy=${sortBy}&page=${page}&limit=${limit}`,
        payload
      );
      ctx.commit("setAllUserData", response.data.Response.response);
      ctx.commit("setUserPaginationData", response.data.Response.pagination);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleUser(ctx, payload) {
    try {
      const response = await $axios.get(`v1/admin/module/user/${payload.id}`);
      ctx.commit("setSingleUserData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async setSingleUserData(ctx, payload) {
    try {
      ctx.commit("setSingleUserData", payload);
      return payload;
    } catch (error) {
      throw error;
    }
  },
  async updateUser(ctx, payload) {
    try {
      const response = await $axios.put(
        `v1/admin/module/user/${payload.get("id")}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteUser(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/admin/module/user/${payload.id}`,
        payload
      );
      ctx.commit("removeUser", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async CreateUser(ctx, payload) {
    try {
      const response = await $axios.post("v1/admin/module/user", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async userAddToBlock(ctx, payload) {
    try {
      ctx.commit("toggleBlock", payload);
      return payload;
    } catch (error) {
      throw error;
    }
  },
  async userVerified(ctx, payload) {
    try {
      const response = await $axios.post(
        `v1/admin/module/verify/user/${payload._id}`
      );
      ctx.commit("userVerification", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async userUnVerify(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/admin/module/unverify/user/${payload._id}`
      );
      ctx.commit("userVerification", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
