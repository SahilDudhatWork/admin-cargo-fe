<template>
  <div>
    <div class="mt-6">
      <div class="relative overflow-x-auto">
        <table class="w-full text-left rtl:text-right">
          <thead class="bg-[#F4F4F4]">
            <tr>
              <th
                scope="col"
                class="pl-3 py-3 rounded-tl-lg text-[#000000] font-normal text-[12px]"
              >
                Sr. no
              </th>
              <th
                scope="col"
                class="pr-4 px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Movement ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Amount
              </th>
              <th
                scope="col"
                class="sm:px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                User Info
              </th>
              <template v-if="sortBy === 'Pending'">
                <th
                  scope="col"
                  class="ml-6 px-6 sm:pr-6 py-3 text-[#000000] font-normal text-[12px]"
                >
                  Actions
                </th>
              </template>
              <template v-if="sortBy !== 'Pending'">
                <th
                  scope="col"
                  class="ml-6 pr-6 py-3 text-[#000000] font-normal text-[12px]"
                >
                  Operator Info
                </th>
                <th
                  scope="col"
                  class="ml-6 pr-6 py-3 text-[#000000] font-normal text-[12px]"
                >
                  Vehicle Info
                </th>
              </template>
              <th
                scope="col"
                class="sm:px-3 py-3 rounded-tr-lg text-[#000000] font-normal text-[12px]"
              >
                Data Links
              </th>
            </tr>
          </thead>
          <tbody v-if="allData?.length > 0">
            <tr
              class="bg-white border-b cursor-pointer"
              v-for="(item, index) in allData"
              :key="index"
            >
              <td class="pl-3">#</td>
              <th
                scope="row"
                class="pr-4 text-[#000000] font-normal text-[12px]"
              >
                <span class="border-b border-black">{{
                  item?.movementId
                }}</span>
              </th>

              <td class="px-6 py-6">
                <span
                  class="text-[#FEFEFE] font-medium text-[10px] py-0.5 px-3.5 bg-[#FFAA00] rounded"
                  >{{ formatStatus(item) }}</span
                >
              </td>
              <td class="px-6 py-6">
                <div class="flex flex-col">
                  <span class="text-[#000000] font-normal text-xs pt-1"
                    >{{ item?.amountDetails?.price
                    }}{{ item?.amountDetails?.currency }}</span
                  >
                  <span class="text-[#989898] font-normal text-[10px] pt-1">{{
                    item?.amountDetails?.paymentMode
                  }}</span>
                </div>
              </td>
              <td class="sm:px-6 py-6">
                <div class="flex flex-col">
                  <span class="text-[#000000] font-normal text-xs pt-1">{{
                    item?.userReference?.contactName
                  }}</span>
                  <span class="text-[#989898] font-normal text-[10px] pt-1"
                    >+{{ item?.userReference?.countryCode }}
                    {{ item?.userReference?.contactNo }}</span
                  >
                </div>
              </td>
              <template v-if="item?.status == 'Pending'">
                <td class="px-6 py-6">
                  <span
                    class="text-[#2AA1EB] font-normal text-xs border-b border-[#2AA1EB]"
                    @click="acceptRequest(item?.movementId)"
                    >Accept Request</span
                  >
                </td>
              </template>
              <template v-else>
                <td>
                  <div class="flex flex-col">
                    <span class="text-[#000000] font-normal text-xs pt-1">{{
                      item?.operatorData?.operatorName
                    }}</span>
                    <span class="text-[#989898] font-normal text-[10px] pt-1"
                      >+{{ item?.operatorData?.countryCode }}
                      {{ item?.operatorData?.operatorNumber }}</span
                    >
                  </div>
                </td>
                <td>
                  <div class="flex flex-col">
                    <span class="text-[#000000] font-normal text-xs pt-1">{{
                      item?.vehicleData?.vehicleName
                    }}</span>
                    <span class="text-[#989898] font-normal text-[10px] pt-1">{{
                      item?.vehicleData?.mxPlates
                    }}</span>
                  </div>
                </td>
              </template>
              <td class="px-6 py-6">
                <button
                  @click="$emit('handleSeeMoreClick', item?.movementId)"
                  class="text-[#2AA1EB] font-light text-xs border-b border-[#2AA1EB]"
                >
                  see more
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td
                colspan="8"
                class="text-xl font-medium text-gray-400 text-center py-10"
              >
                No records available
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="allData?.length > 0"
          class="mt-4 flex justify-end gap-5 items-center mb-10"
        >
          <span>{{ paginationText }}</span>
          <button
            class="p-1 rounded-lg"
            @click="$emit('firstPage')"
            :disabled="servicesPaginationData.pre_page_url === null"
            :class="
              servicesPaginationData.pre_page_url === null
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
            @click="$emit('prevPage')"
            class="p-[9px] rounded-lg"
            :disabled="servicesPaginationData.pre_page_url === null"
            :class="
              servicesPaginationData.pre_page_url === null
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
            @click="$emit('nextPage')"
            class="p-[9px] rounded-lg"
            :disabled="servicesPaginationData.next_page_url === null"
            :class="
              servicesPaginationData.next_page_url === null
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
            @click="$emit('lastPage')"
            class="p-1 rounded-lg"
            :disabled="servicesPaginationData.next_page_url === null"
            :class="
              servicesPaginationData.next_page_url === null
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
    </div>
    <div>
      <CarrierAssignModal
        v-if="isAssignCarrierModal"
        :isAssignCarrierModal="isAssignCarrierModal"
        @handleAssignCarrier="handleAssignCarrier"
        @closeAssignCarrierModal="closeAssignCarrierModal"
      />
      <OperatorAssignModal
        v-if="isAssignOperatorModal"
        :isAssignOperatorModal="isAssignOperatorModal"
        @handleAssignOperator="handleAssignOperator"
        @closeAssignOperatorModal="closeAssignOperatorModal"
        @backAssignOperator="backAssignOperator"
        :selectedCarrirId="selectedCarrirId"
        :errors="errors"
      />
      <VehicleAssignModal
        v-if="isAssignVehicleModal"
        :isAssignVehicleModal="isAssignVehicleModal"
        @handleAssignVehicle="handleAssignVehicle"
        @closeAssignVehicleModal="closeAssignVehicleModal"
        @backAssignVehicle="backAssignVehicle"
        :selectedCarrirId="selectedCarrirId"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    allData: {
      type: Array,
      required: true,
    },
    servicesPaginationData: {
      type: Object,
      required: true,
    },
    paginationText: {
      type: String,
      default: "",
    },
    sortBy: {
      type: String,
      default: "Pending",
    },
  },
  data() {
    return {
      isAssignOperatorModal: false,
      isAssignVehicleModal: false,
      isAssignCarrierModal: false,
      errors: {},
    };
  },
  computed: {
    formatStatus() {
      return (item) => {
        if (!item) return "";

        if (item.status === "Pending") {
          return "PENDING";
        } else if (item.status === "InProgress") {
          return "IN-PROGRESS";
        } else if (item.status === "Completed") {
          return "COMPLETED";
        } else {
          return item.status;
        }
      };
    },
  },
  methods: {
    ...mapActions({
      updateService: "services/updateService",
      updateSelectedCarrier: "services/updateSelectedCarrier",
      updateSelectedOperator: "services/updateSelectedOperator",
      updateCarrierReference: "services/updateCarrierReference",
      updateSelectedVehicle: "services/updateSelectedVehicle",
      fetchAllServices: "services/fetchAllServices",
    }),

    generateCarrierPaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);
      return `${start}-${end} of ${total}`;
    },

    async acceptRequest(id) {
      this.movementId = id;
      this.isAssignCarrierModal = true;
      document.body.style.overflow = "hidden";
      this.updateSelectedCarrier(null);
      this.updateSelectedOperator(null);
      this.updateCarrierReference("");
      this.updateSelectedVehicle(null);
    },
    closeAssignCarrierModal() {
      this.isAssignCarrierModal = false;
      this.selectedOperator = null;
      document.body.style.overflow = "";
    },
    closeAssignOperatorModal() {
      this.isAssignOperatorModal = false;
      this.selectedOperator = null;
      document.body.style.overflow = "";
    },
    closeAssignVehicleModal() {
      this.isAssignVehicleModal = false;
      this.isAssignOperatorModal = false;
      document.body.style.overflow = "";
    },
    async backAssignVehicle() {
      this.isAssignOperatorModal = true;
      this.isAssignVehicleModal = false;
    },
    async backAssignOperator() {
      this.isAssignCarrierModal = true;
      this.isAssignOperatorModal = false;
    },
    async handleAssignCarrier(item) {
      try {
        this.selectedCarrier = item;
        this.selectedCarrirId = this.selectedCarrier?.accountId;
        const form = {
          selectedCarrier: this.selectedCarrier,
        };
        this.errors = await this.$validateServicesModal({
          form: form,
          fieldsToValidate: ["selectedCarrier", "selectedCarrier"],
        });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }
        this.isAssignCarrierModal = false;
        this.isAssignOperatorModal = true;
      } catch (error) {
        console.log(error);
      }
    },
    async handleAssignOperator(selectedOperator, carrierReference) {
      try {
        this.updateCarrierReference(carrierReference);
        this.carrierReference = carrierReference;
        this.selectedOperator = selectedOperator;
        const form = {
          carrierReference: this.carrierReference,
          selectedOperator: this.selectedOperator,
        };
        this.errors = await this.$validateServicesModal({
          form: form,
          fieldsToValidate: ["carrierReference", "selectedOperator"],
        });
        if (this.errors) {
          this.errors.forEach((item) => {
            this.errors.carrierReference = item.carrierReference;
          });
        }
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }
        this.isAssignVehicleModal = true;
        this.isAssignOperatorModal = false;
      } catch (error) {
        console.log(error);
      }
    },
    async handleAssignVehicle(selectedVehicle) {
      try {
        this.selectedVehicle = selectedVehicle;
        const form = {
          selectedVehicle: this.selectedVehicle,
        };
        this.errors = await this.$validateServicesModal({
          form: form,
          fieldsToValidate: ["selectedVehicle"],
        });
        if (this.errors) {
          this.errors.forEach((item) => {
            this.errors.carrierReference = item.carrierReference;
          });
        }
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }
        const formData = {
          carrierId: this.selectedCarrier?._id,
          operatorId: this.selectedOperator?._id,
          vehicleId: this.selectedVehicle?._id,
          carrierReference: this.carrierReference,
        };
        const res = await this.updateService({
          formData: formData,
          id: this.movementId,
        });
        this.$toast.open({
          message: res.msg,
        });
        this.isAssignCarrierModal = false;
        this.isAssignVehicleModal = false;
        this.isAssignOperatorModal = false;
        document.body.style.overflow = "";
        this.$emit("serviceUpdated");
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },
};
</script>
