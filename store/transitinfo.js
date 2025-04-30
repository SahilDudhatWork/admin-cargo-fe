import $axios from "@/plugins/axios";

export const state = () => ({
  transitInfo: {},
});

export const getters = {
  getTransitInfo(state) {
    return state.transitInfo;
  },
};

export const mutations = {
  setTransitInfo(state, payload) {
    state.transitInfo = payload;
  },
};

export const actions = {
  // ----------TransitInfo --------------

  async createTransitInfo(ctx, payload) {
    try {
      const response = await $axios.post("/v1/admin/transitInfo", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async fetchTransitInfo(ctx, payload) {
    try {
      const response = await $axios.get("/v1/admin/transitInfo");
      ctx.commit("setTransitInfo", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ----------PortBridge --------------

  async fetchPortBridge(ctx, payload) {
    try {
      const response = await $axios.get(
        "/v1/admin/specialRequirements",
        payload,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async fetchSinglePortBridge(ctx, payload) {
    try {
      const response = await $axios.get(
        `/v1/admin/specialRequirements/${payload.id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updatePortBridge(ctx, payload) {
    try {
      const response = await $axios.put(
        `/v1/admin/specialRequirements/${payload._id}`,
        payload,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deletePortBridge(ctx, payload) {
    try {
      const response = await $axios.delete(
        `/v1/admin/specialRequirements/${payload.id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async createPortBridge(ctx, payload) {
    try {
      const response = await $axios.post(
        "/v1/admin/specialRequirements",
        payload,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ----------Service --------------
  async createService(ctx, payload) {
    try {
      const response = await $axios.post(
        `/v1/admin/transitInfo/typeOfService`,
        payload,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleService(ctx, payload) {
    try {
      const response = await $axios.get(
        `/v1/admin/transitInfo/typeOfService/${payload.id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateService(ctx, payload) {
    try {
      const response = await $axios.put(
        `/v1/admin/transitInfo/typeOfService/${payload._id}`,
        payload,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteService(ctx, payload) {
    try {
      const response = await $axios.delete(
        `/v1/admin/transitInfo/typeOfService/${payload.id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  // ----------Transportation --------------

  async createTransportation(ctx, payload) {
    try {
      const response = await $axios.post(
        `/v1/admin/transitInfo/typeOfTransportation`,
        payload,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleTransportation(ctx, payload) {
    try {
      const response = await $axios.get(
        `/v1/admin/transitInfo/typeOfTransportation/${payload.id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateTransportation(ctx, payload) {
    try {
      const response = await $axios.put(
        `/v1/admin/transitInfo/typeOfTransportation/${payload._id}`,
        payload,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteTransportation(ctx, payload) {
    try {
      const response = await $axios.delete(
        `/v1/admin/transitInfo/typeOfTransportation/${payload.id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  // ----------Mode Of Transportation --------------

  async createModeOfTransportation(ctx, { transportationLabel, data }) {
    try {
      const response = await $axios.post(
        `/v1/admin/transitInfo/modeOfTransportation/${transportationLabel}`,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleModeOfTransportation(ctx, { transportationLabel, id }) {
    try {
      const response = await $axios.get(
        `/v1/admin/transitInfo/modeOfTransportation/${transportationLabel}/${id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateModeOfTransportation(ctx, { transportationLabel, data, id }) {
    try {
      const response = await $axios.put(
        `/v1/admin/transitInfo/modeOfTransportation/${transportationLabel}/${id}`,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteModeOfTransportation(ctx, { transportationLabel, id }) {
    try {
      const response = await $axios.delete(
        `/v1/admin/transitInfo/modeOfTransportation/${transportationLabel}/${id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  // ---------- Special Requirements --------------

  async fetchSpecialRequirements(ctx, { type }) {
    try {
      const response = await $axios.get(`/v1/admin/commonRequirements/${type}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSpecialRequirementsDetails(ctx, { type, id }) {
    try {
      const response = await $axios.get(
        `/v1/admin/commonRequirements/${type}/${id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteSpecialRequirements(ctx, { type, id, requirementId }) {
    try {
      const response = await $axios.delete(
        `/v1/admin/commonRequirements/${type}/${id}/${requirementId}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateSpecialRequirements(ctx, { type, id, requirementId, data }) {
    try {
      const response = await $axios.put(
        `/v1/admin/commonRequirements/${type}/${id}/${requirementId}`,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async createSpecialRequirements(ctx, { type, id, data }) {
    try {
      const response = await $axios.post(
        `/v1/admin/commonRequirements/${type}/${id}`,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
