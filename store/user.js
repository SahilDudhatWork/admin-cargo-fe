import $axios from "@/plugins/axios";

export const state = () => ({
  allUserData: [],
  singleUserData: [],
});

export const getters = {
  getAllUserData(state) {
    return state.allUserData;
  },
  getSingleUserData(state) {
    return state.singleUserData;
  },
};

export const mutations = {
  setAllUserData(state, payload) {
    state.allUserData = payload;
  },
  setSingleUserData(state, payload) {
    state.singleUserData = payload;
  },
  toggleBlock(state, payload) {
    const userIndex = state.allUserData.findIndex(
      (user) => user._id === payload._id
    );
    state.allUserData[userIndex].isBlocked =
      !state.allUserData[userIndex].isBlocked;
  },
  userVerify(state, payload) {
    const userIndex = state.allUserData.findIndex(
      (user) => user._id === payload._id
    );
    state.allUserData[userIndex].verifyByAdmin = true;
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
      const response = await $axios.get("v1/admin/common/user", payload);
      ctx.commit("setAllUserData", response.data.Response.response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleUser(ctx, payload) {
    try {
      const response = await $axios.get(`v1/admin/common/user/${payload.id}`);
      ctx.commit("setSingleUserData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateUser(ctx, payload) {
    try {
      const response = await $axios.put(
        `v1/admin/common/user/${payload.get("id")}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteUser(ctx, payload) {
    console.log(payload, "payload");

    try {
      const response = await $axios.delete(
        `v1/admin/common/user/${payload.id}`,
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
      const response = await $axios.post("v1/admin/common/user", payload);
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
  async userVeryfication(ctx, payload) {
    try {
      ctx.commit("userVerify", payload);
      return payload;
    } catch (error) {
      throw error;
    }
  },
};