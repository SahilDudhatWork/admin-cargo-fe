<template>
  <div>
    <AssignModal
      :isModal="isAssignVehicleModal"
      @handleAssign="$emit('handleAssignVehicle', selectedVehicle)"
      @close="$emit('closeAssignVehicleModal')"
      @backAssign="$emit('backAssignVehicle')"
      :isSelected="selectedVehicle && selectedVehicle != null ? true : false"
      selectedOperator
      :isBackAssign="true"
      :isDisabled="allVehicleData.length > 0 ? false : true"
    >
      <template #content>
        <div>
          <div
            class="flex justify-between items-center mt-5 mb-6 sm:flex-row flex-col"
          >
            <h1 class="font-semibold text-lg text-[#3683D5]">Assign Vehicle</h1>
            <div
              v-if="allVehicleData?.length > 0"
              class="flex justify-end sm:gap-5 gap-2 sm:mt-0 mt-3 items-center"
            >
              <span>{{ vehiclePaginationText }}</span>
              <button
                class="p-1 rounded-lg"
                @click="firstPage"
                :disabled="vehiclePaginationData.pre_page_url === null"
                :class="
                  vehiclePaginationData.pre_page_url === null
                    ? 'bg-[#89abcf]'
                    : 'bg-[#3683D5]'
                "
              >
                <svg
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                  fill="#ffffff"
                >
                  <path
                    d="M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z"
                  ></path>
                </svg>
              </button>
              <button
                @click="prevPage"
                class="p-[9px] rounded-lg"
                :disabled="vehiclePaginationData.pre_page_url === null"
                :class="
                  vehiclePaginationData.pre_page_url === null
                    ? 'bg-[#89abcf]'
                    : 'bg-[#3683D5]'
                "
              >
                <svg
                  class="w-3.5 h-3.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                  stroke="#ffffff"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>

              <button
                @click="nextPage"
                class="p-[9px] rounded-lg"
                :disabled="vehiclePaginationData.next_page_url === null"
                :class="
                  vehiclePaginationData.next_page_url === null
                    ? 'bg-[#89abcf]'
                    : 'bg-[#3683D5]'
                "
              >
                <svg
                  class="w-3.5 h-3.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                  stroke="#ffffff"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>

              <button
                @click="lastPage"
                class="p-1 rounded-lg"
                :disabled="vehiclePaginationData.next_page_url === null"
                :class="
                  vehiclePaginationData.next_page_url === null
                    ? 'bg-[#89abcf]'
                    : 'bg-[#3683D5]'
                "
              >
                <svg
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                  fill="#ffffff"
                >
                  <path
                    d="M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div
            class="overflow-y-auto sm:max-h-[260px] max-h-[160px]"
            v-if="allVehicleData.length > 0"
          >
            <div
              class="grid sm:grid-cols-2 grid-cols-1 !gap-y-5 xl:gap-0 gap-3"
            >
              <AssignVehicle
                v-for="item in allVehicleData"
                :key="item._id"
                :allVehicleData="item"
                :isSelected="
                  selectedVehicle && selectedVehicle._id === item._id
                "
                @selectVehicle="selectVehicle(item)"
              />
            </div>
          </div>
          <div v-else>
            <h1
              class="font-semibold text-xl text-[#989898] mt-5 flex justify-center mb-5"
            >
              This carrier doesn't have any vehicle.
            </h1>
          </div>
        </div>
      </template>
    </AssignModal>
    <loading
      :active="isLoading"
      :is-full-page="true"
      color="#007BFF"
      loader="bars"
      :height="70"
      :width="70"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    isAssignVehicleModal: {
      type: Boolean,
      default: false,
    },
    selectedCarrirId: {
      type: Number,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      allVehicleData: "vehicle/getAllVehicleData",
      vehiclePaginationData: "vehicle/getVehiclePaginationData",
      selectedVehicle: "services/getSelectedVehicleData",
    }),
    vehiclePaginationText() {
      return this.generateVehiclePaginationText(this.vehiclePaginationData);
    },
    formatRef() {
      return this.carrierReferenceData?.map((user) => {
        return {
          key: user._id,
          label: user?.contactName,
        };
      });
    },
  },
  methods: {
    ...mapActions({
      fetchAllVehicle: "vehicle/fetchAllVehicle",
      fetchCarrierReferences: "vehicle/fetchCarrierReferences",
      updateSelectedVehicle: "services/updateSelectedVehicle",
    }),
    selectVehicle(vehicle) {
      this.updateSelectedVehicle(vehicle);
    },
    async prevPage() {
      try {
        await this.getVehicleById({
          carrierAccountId: this.selectedCarrirId,
          page: this.vehiclePaginationData.current_page - 1,
          limit: this.vehiclePaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async nextPage() {
      try {
        await this.getVehicleById({
          carrierAccountId: this.selectedCarrirId,
          page: this.vehiclePaginationData.current_page + 1,
          limit: this.vehiclePaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async firstPage() {
      try {
        await this.getVehicleById({
          carrierAccountId: this.selectedCarrirId,
          page: 1,
          limit: this.vehiclePaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async lastPage() {
      try {
        await this.getVehicleById({
          carrierAccountId: this.selectedCarrirId,
          page: this.vehiclePaginationData?.total_page,
          limit: this.vehiclePaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    generateVehiclePaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);
      return `${start}-${end} of ${total}`;
    },
    async getVehicleById(payload) {
      try {
        this.isLoading = true;
        let { page, limit } = payload;
        page = page || 1;
        limit = limit || 10;
        await this.fetchAllVehicle({
          carrierAccountId: this.selectedCarrirId,
          page: page,
          limit: limit,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async mounted() {
    try {
      await this.getVehicleById({ carrierAccountId: this.selectedCarrirId });
    } catch (error) {
      console.log(error);
      this.$toast.open({
        message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
        type: "error",
      });
    }
  },
};
</script>
