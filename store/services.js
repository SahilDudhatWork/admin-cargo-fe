import $axios from "@/plugins/axios";

export const state = () => ({
  temporarySelected: {
    selectedCarrierData: null,
    selectedOperatorData: null,
    carrierReferenceData: "",
    selectedVehicleData: null,
  },
});

export const getters = {
  getSelectedCarrierData(state) {
    return state.temporarySelected.selectedCarrierData;
  },
  getSelectedOperatorData(state) {
    return state.temporarySelected.selectedOperatorData;
  },
  getSelectedVehicleData(state) {
    return state.temporarySelected.selectedVehicleData;
  },
  getCarrierReferenceData(state) {
    return state.temporarySelected.carrierReferenceData;
  },
};

export const mutations = {
  setSelectedCarrierData(state, payload) {
    state.temporarySelected.selectedCarrierData = payload;
  },
  setSelectedOperatorData(state, payload) {
    state.temporarySelected.selectedOperatorData = payload;
  },
  setSelectedVehicleData(state, payload) {
    state.temporarySelected.selectedVehicleData = payload;
  },
  setCarrierReferenceData(state, payload) {
    state.temporarySelected.carrierReferenceData = payload;
  },
};

export const actions = {
  updateSelectedCarrier({ commit }, operatorData) {
    commit("setSelectedCarrierData", operatorData);
  },
  updateSelectedOperator({ commit }, operatorData) {
    commit("setSelectedOperatorData", operatorData);
  },
  updateSelectedVehicle({ commit }, vehicleData) {
    commit("setSelectedVehicleData", vehicleData);
  },
  updateCarrierReference({ commit }, carrierReferenceData) {
    commit("setCarrierReferenceData", carrierReferenceData);
  },
  async fetchAllServices(ctx, payload) {
    try {
      const sortBy = payload?.sortBy || "";
      const keyWord = payload?.keyWord || "";
      const page = payload?.page || "";
      const limit = payload?.limit || "";

      const response = await $axios.get(
        `v1/admin/services?&keyWord=${keyWord}&sortBy=${sortBy}&page=${page}&limit=${limit}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleService(ctx, payload) {
    try {
      const response = await $axios.get(
        `v1/admin/services/${payload.id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateService(ctx, { formData, id }) {
    try {
      const response = await $axios.put(`v1/admin/services/${id}`, formData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async validateCarrierReference(ctx, payload) {
    try {
      const response = await $axios.post(
        "v1/admin/services/reference/validate",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchLocation(ctx, payload) {
    try {
      const response = await $axios.get(
        `/v1/common/locat/operator/${payload.id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchActivity(ctx, payload) {
    try {
      const startDate = payload?.startDate || "";
      const endDate = payload?.endDate || "";
      const response = await $axios.get(
        `/v1/admin/activity/dashboard?startDate=${startDate}&endDate=${endDate}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
