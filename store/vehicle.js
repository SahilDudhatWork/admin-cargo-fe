import $axios from "@/plugins/axios";

export const state = () => ({
  allVehicleData: [],
  singleVehicleData: {},
  vehiclePaginationData: {},
});

export const getters = {
  getAllVehicleData(state) {
    return state.allVehicleData;
  },
  getSingleVehicleData(state) {
    return state.singleVehicleData;
  },
  getVehiclePaginationData(state) {
    return state.vehiclePaginationData;
  },
};

export const mutations = {
  setAllVehicleData(state, payload) {
    state.allVehicleData = payload;
  },
  setSingleVehicleData(state, payload) {
    state.singleVehicleData = payload;
  },
  setVehiclePaginationData(state, payload) {
    state.vehiclePaginationData = payload;
  },
  toggleStatus(state, payload) {
    const userIndex = state.allVehicleData.findIndex(
      (user) => user._id === payload._id
    );
    if (state.allVehicleData[userIndex].status === "Active") {
      state.allVehicleData[userIndex].status = "Deactive";
    } else if (state.allVehicleData[userIndex].status === "Deactive") {
      state.allVehicleData[userIndex].status = "Active";
    }
  },
  removeVehicle(state, payload) {
    state.allVehicleData = state.allVehicleData.filter(
      (user) => user._id !== payload._id
    );
  },
};

export const actions = {
  async fetchAllVehicle(ctx, payload) {
    try {
      const sortBy = payload?.sortBy || "";
      const keyWord = payload?.keyWord || "";
      const page = payload?.page || "";
      const limit = payload?.limit || "";
      const carrierAccountId = payload?.carrierAccountId || "";

      const response = await $axios.get(
        `v1/admin/vehicle/fetch/${carrierAccountId}?&keyWord=${keyWord}&sortBy=${sortBy}&page=${page}&limit=${limit}`,
        payload
      );
      ctx.commit("setAllVehicleData", response.data.response);
      ctx.commit("setVehiclePaginationData", response.data?.pagination);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleVehicle(ctx, payload) {
    try {
      const response = await $axios.get(
        `v1/admin/vehicle/${payload.accountId}`
      );
      ctx.commit("setSingleVehicleData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchCarrierTransitInfo(ctx, payload) {
    try {
      const response = await $axios.get("v1/admin/vehicle/fetch/transitInfo");
      return response;
    } catch (error) {
      throw error;
    }
  },
  async setSingleVehicleData(ctx, payload) {
    try {
      ctx.commit("setSingleVehicleData", payload);
      return payload;
    } catch (error) {
      throw error;
    }
  },
  async updateVehicle(ctx, payload) {
    try {
      let accountId = payload._id;
      const response = await $axios.put(
        `v1/admin/vehicle/${accountId}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteVehicle(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/admin/vehicle/${payload._id}`,
        payload
      );
      ctx.commit("removeVehicle", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async createVehicle(ctx, payload) {
    try {
      const response = await $axios.post("v1/admin/vehicle", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateVehicleStatus(ctx, payload) {
    try {
      const response = await $axios.put(
        `v1/admin/vehicle/status/${payload._id}`,
        payload
      );
      ctx.commit("toggleStatus", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
