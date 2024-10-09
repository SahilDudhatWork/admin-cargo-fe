import $axios from "@/plugins/axios";

export const state = () => ({
  allOperatorData: [],
  singleOperatorData: {},
  operatorPaginationData: {},
});

export const getters = {
  getAllOperatorData(state) {
    return state.allOperatorData;
  },
  getSingleOperatorData(state) {
    return state.singleOperatorData;
  },
  getOperatorPaginationData(state) {
    return state.operatorPaginationData;
  },
};

export const mutations = {
  setAllOperatorData(state, payload) {
    state.allOperatorData = payload;
  },
  setSingleOperatorData(state, payload) {
    state.singleOperatorData = payload;
  },
  setOperatorPaginationData(state, payload) {
    state.operatorPaginationData = payload;
  },
  removeOperator(state, payload) {
    state.allOperatorData = state.allOperatorData.filter(
      (user) => user.accountId !== payload.accountId
    );
  },
};

export const actions = {
  async fetchAllOperator(ctx, payload) {
    try {
      const sortBy = payload?.sortBy || "";
      const keyWord = payload?.keyWord || "";
      const page = payload?.page || "";
      const limit = payload?.limit || "";
      const carrierAccountId = payload?.carrierAccountId || "";

      const response = await $axios.get(
        `v1/admin/operator/fetch/${carrierAccountId}?&keyWord=${keyWord}&sortBy=${sortBy}&page=${page}&limit=${limit}`,
        payload
      );
      ctx.commit("setAllOperatorData", response.data.response);
      ctx.commit("setOperatorPaginationData", response.data?.pagination);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleOperator(ctx, payload) {
    try {
      const response = await $axios.get(
        `v1/admin/operator/${payload.accountId}`
      );
      ctx.commit("setSingleOperatorData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async setSingleOperatorData(ctx, payload) {
    try {
      ctx.commit("setSingleOperatorData", payload);
      return payload;
    } catch (error) {
      throw error;
    }
  },
  async updateOperator(ctx, payload) {
    try {
      let accountId = payload.accountId;
      const response = await $axios.put(
        `v1/admin/operator/${accountId}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteOperator(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/admin/operator/${payload.accountId}`,
        payload
      );
      ctx.commit("removeOperator", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async createOperator(ctx, payload) {
    try {
      const response = await $axios.post("v1/admin/operator", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
