import $axios from "@/plugins/axios";

export const state = () => ({
  allCarrierData: [],
  singleCarrierData: [],
  carrierPaginationData: {},
});

export const getters = {
  getAllCarrierData(state) {
    return state.allCarrierData;
  },
  getSingleCarrierData(state) {
    return state.singleCarrierData;
  },
  getCarrierPaginationData(state) {
    return state.carrierPaginationData;
  },
};

export const mutations = {
  setAllCarrierData(state, payload) {
    state.allCarrierData = payload;
  },
  setSingleCarrierData(state, payload) {
    state.singleCarrierData = payload;
  },
  setCarrierPaginationData(state, payload) {
    state.carrierPaginationData = payload;
  },
  toggleBlock(state, payload) {
    const carrierIndex = state.allCarrierData.findIndex(
      (user) => user._id === payload._id
    );
    state.allCarrierData[carrierIndex].isBlocked =
      !state.allCarrierData[carrierIndex].isBlocked;
  },
  carrierVerification(state, payload) {
    const carrierIndex = state.allCarrierData.findIndex(
      (user) => user._id === payload._id
    );
    state.allCarrierData[carrierIndex].verifyByAdmin =
      !state.allCarrierData[carrierIndex].verifyByAdmin;
  },
  removeUser(state, payload) {
    state.allCarrierData = state.allCarrierData.filter(
      (user) => user._id !== payload.id
    );
  },
};

export const actions = {
  async fetchAllCarrier(ctx, payload) {
    try {
      const sortBy = payload?.sortBy || "";
      const page = payload?.page || "";
      const limit = payload?.limit || "";
      const response = await $axios.get(
        `v1/admin/module/carrier?&sortBy=${sortBy}&page=${page}&limit=${limit}`,
        payload
      );
      ctx.commit("setAllCarrierData", response.data.Response.response);
      ctx.commit("setCarrierPaginationData", response.data.Response.pagination);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleCarrier(ctx, payload) {
    try {
      const response = await $axios.get(
        `v1/admin/module/carrier/${payload.id}`
      );
      ctx.commit("setSingleCarrierData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async setSingleCarrierData(ctx, payload) {
    try {
      ctx.commit("setSingleCarrierData", payload);
      return payload;
    } catch (error) {
      throw error;
    }
  },
  async updateCarrier(ctx, payload) {
    try {
      const response = await $axios.put(
        `v1/admin/module/carrier/${payload.get("id")}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteCarrier(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/admin/module/carrier/${payload.id}`,
        payload
      );
      ctx.commit("removeUser", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async CreateCarrier(ctx, payload) {
    try {
      const response = await $axios.post("v1/admin/module/carrier", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  //   async userAddToBlock(ctx, payload) {
  //     try {
  //       ctx.commit("toggleBlock", payload);
  //       return payload;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  async carrierVerified(ctx, payload) {
    try {
      const response = await $axios.post(
        `v1/admin/module/verify/carrier/${payload._id}`
      );
      ctx.commit("carrierVerification", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async carrierUnVerify(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/admin/module/unverify/carrier/${payload._id}`
      );
      ctx.commit("carrierVerification", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
