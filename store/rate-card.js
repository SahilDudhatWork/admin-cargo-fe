import $axios from "@/plugins/axios";

export const state = () => ({
  allCardData: [],
  singleCardData: {},
  cardPaginationData: {},
  allService: {},
});

export const getters = {
  getAllCardData(state) {
    return state.allCardData;
  },
  getSingleCardData(state) {
    return state.singleCardData;
  },
  getCardPaginationData(state) {
    return state.cardPaginationData;
  },
  getAllService(state) {
    return state.allService;
  },
};

export const mutations = {
  setAllCardData(state, payload) {
    state.allCardData = payload;
  },
  setSingleCardData(state, payload) {
    state.singleCardData = payload;
  },
  setCardPaginationData(state, payload) {
    state.cardPaginationData = payload;
  },
  setAllService(state, payload) {
    state.allService = payload;
  },
};

export const actions = {
  async fetchAllCard(ctx, payload) {
    try {
      const keyWord = payload?.keyWord || "";
      const page = payload?.page || "";
      const limit = payload?.limit || "";

      const response = await $axios.get(
        `v1/admin/rateCard?&keyWord=${keyWord}&page=${page}&limit=${limit}`,
        payload
      );
      ctx.commit("setAllCardData", response.data.response);
      ctx.commit("setCardPaginationData", response.data.pagination);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchAllService(ctx, payload) {
    try {
      const response = await $axios.get(
        "v1/admin/rateCard/fetch/All/Services",
        payload
      );
      ctx.commit("setAllService", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleCard(ctx, payload) {
    try {
      const response = await $axios.get(`v1/admin/rateCard/${payload._id}`);
      ctx.commit("setSingleCardData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateCard(ctx, payload) {
    try {
      const response = await $axios.put(
        `v1/admin/rateCard/${payload._id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async carrierAsign(ctx, payload) {
    try {
      const response = await $axios.put(
        `v1/admin/rateCard/carrierAssign/${payload.rateCardId}/${payload.carrierAccId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteCard(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/admin/rateCard/${payload._id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async createService(ctx, payload) {
    try {
      const response = await $axios.post("v1/admin/rateCard", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
