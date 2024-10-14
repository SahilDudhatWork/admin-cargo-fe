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
                class="pr-4 py-3 text-[#000000] font-normal text-[12px]"
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
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                User Info
              </th>
              <template v-if="isPending">
                <th
                  scope="col"
                  class="ml-6 pr-6 py-3 text-[#000000] font-normal text-[12px]"
                >
                  Actions
                </th>
              </template>
              <template v-else>
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
                class="px-3 py-3 rounded-tr-lg text-[#000000] font-normal text-[12px]"
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
              <td class="px-6 py-6">
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
                <td class="py-6">
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
      <AssignModal
        :isModal="isAssignCarrierModal"
        @handleAssign="handleAssignCarrier"
        @close="closeAssignCarrierModal"
        :buttonText="'Next'"
      >
        <template #content>
          <div>
            <h1 class="font-semibold text-lg text-[#3683D5]">Assign Carrier</h1>
            <div
              class="mt-5 grid grid-cols-2 gap-y-5 overflow-y-auto h-[480px]"
            >
              <AssignCarrier
                v-for="item in filteredCarrierData"
                :key="item._id"
                :allCarrierData="item"
                :isSelected="
                  selectedCarrier && selectedCarrier._id === item._id
                "
                @selectCarrier="selectCarrier(item)"
              />
            </div>
          </div>
        </template>
      </AssignModal>
      <AssignModal
        :isModal="isAssignOperatorModal"
        @handleAssign="handleAssignOperator"
        @close="closeAssignOperatorModal"
        :buttonText="'Next'"
        @backAssign="backAssignOperator"
        :isBackAssign="true"
      >
        <template #content>
          <div>
            <div class="mb-3">
              <label
                for="email"
                class="block mb-1 text-sm font-medium text-[#3683D5]"
                >Carrier Reference</label
              >
              <Dropdown
                :items="formatRef"
                :selectedLabel="selectedCarrierReference?.label || ''"
                @getValue="getCarrierReferenceValue"
                :errors="errors?.selectedCarrierReference"
              />
              <span class="error-msg" v-if="errors?.selectedCarrierReference">{{
                errors?.selectedCarrierReference
              }}</span>
            </div>
            <h1 class="font-semibold text-lg text-[#3683D5]">
              Assign Operator
            </h1>
            <div
              class="mt-5 grid grid-cols-2 gap-y-5 overflow-y-auto h-[480px]"
            >
              <AssignOperator
                v-for="item in allOperatorData"
                :key="item._id"
                :allOperatorData="item"
                :isSelected="
                  selectedOperator && selectedOperator._id === item._id
                "
                @selectOperator="selectOperator(item)"
              />
            </div>
          </div>
        </template>
      </AssignModal>
      <AssignModal
        :isModal="isAssignVehicleModal"
        @handleAssign="handleAssignVehicle"
        @close="closeAssignVehicleModal"
        @backAssign="backAssignVehicle"
        :isBackAssign="true"
      >
        <template #content>
          <div>
            <h1 class="font-semibold text-lg text-[#3683D5]">Assign Vehicle</h1>
            <div
              class="mt-5 grid grid-cols-2 gap-y-5 overflow-y-auto h-[480px]"
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
        </template>
      </AssignModal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
  },
  data() {
    return {
      isAssignOperatorModal: false,
      isAssignVehicleModal: false,
      isAssignCarrierModal: false,
      selectedOperator: null,
      selectedCarrier: null,
      selectedVehicle: null,
      selectedCarrierReference: "",
      errors: {},
      carrierReferenceData: [],
    };
  },
  computed: {
    ...mapGetters({
      allOperatorData: "operator/getAllOperatorData",
      allVehicleData: "vehicle/getAllVehicleData",
      allCarrierData: "carrier/getAllCarrierData",
      profileData: "auth/getUserProfile",
    }),
    filteredCarrierData() {
      return this.allCarrierData?.filter(
        (carrier) => carrier.verifyByAdmin === true
      );
    },
    formatRef() {
      return this.carrierReferenceData?.map((user) => {
        return {
          key: user._id,
          label: user?.contactName,
        };
      });
    },
    isPending() {
      return this.allData.some((item) => item.status === "Pending");
    },
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
      fetchAllOperator: "operator/fetchAllOperator",
      fetchAllCarrier: "carrier/fetchAllCarrier",
      fetchAllVehicle: "vehicle/fetchAllVehicle",
      updateService: "services/updateService",
      fetchCarrierReferences: "carrier/fetchCarrierReferences",
    }),
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    async acceptRequest(id) {
      this.movementId = id;
      this.isAssignCarrierModal = true;
      await this.getAllCarrier();
      this.selectedCarrier = null;
      this.selectedCarrierReference = null;
      this.selectedOperator = null;
      this.selectedVehicle = null;
    },
    getCarrierReferenceValue(item) {
      this.selectedCarrierReference = item;
    },
    selectCarrier(carrier) {
      this.selectedCarrier = carrier;
      this.selectedCarrirId = this.selectedCarrier?.accountId;
    },
    selectOperator(operator) {
      this.selectedOperator = operator;
    },
    selectVehicle(vehicle) {
      this.selectedVehicle = vehicle;
    },
    closeAssignCarrierModal() {
      this.isAssignCarrierModal = false;
      this.selectedOperator = null;
    },
    closeAssignOperatorModal() {
      this.isAssignOperatorModal = false;
      this.selectedOperator = null;
    },
    closeAssignVehicleModal() {
      this.isAssignVehicleModal = false;
      this.isAssignOperatorModal = false;
    },
    async backAssignVehicle() {
      this.isAssignOperatorModal = true;
      this.isAssignVehicleModal = false;
      await this.getAllOperator();
    },
    async backAssignOperator() {
      this.isAssignCarrierModal = true;
      this.isAssignOperatorModal = false;
      await this.getAllCarrier();
    },
    async handleAssignCarrier() {
      try {
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
        await this.getAllOperator();
        await this.getCarrierReference();
      } catch (error) {
        console.log(error);
      }
    },
    async handleAssignOperator() {
      try {
        const form = {
          selectedCarrierReference: this.selectedCarrierReference,
          selectedOperator: this.selectedOperator,
        };
        this.errors = await this.$validateServicesModal({
          form: form,
          fieldsToValidate: ["selectedCarrierReference", "selectedOperator"],
        });
        if (this.errors) {
          this.errors.forEach((item) => {
            this.errors.selectedCarrierReference =
              item.selectedCarrierReference;
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
        await this.getAllVehicle();
      } catch (error) {
        console.log(error);
      }
    },
    async handleAssignVehicle() {
      try {
        const form = {
          selectedVehicle: this.selectedVehicle,
        };
        this.errors = await this.$validateServicesModal({
          form: form,
          fieldsToValidate: ["selectedVehicle"],
        });
        if (this.errors) {
          this.errors.forEach((item) => {
            this.errors.selectedCarrierReference =
              item.selectedCarrierReference;
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
          carrierReference: this.selectedCarrierReference?.key,
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
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getAllOperator() {
      try {
        await this.fetchAllOperator({
          carrierAccountId: this.selectedCarrirId,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getAllVehicle() {
      try {
        await this.fetchAllVehicle({ carrierAccountId: this.selectedCarrirId });
      } catch (error) {
        console.log(error);
      }
    },
    async getCarrierReference() {
      try {
        const res = await this.fetchCarrierReferences({
          carrierAccountId: this.selectedCarrirId,
        });
        this.carrierReferenceData = res?.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllCarrier() {
      try {
        await this.fetchAllCarrier();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.error-msg {
  font-size: 14px;
  font-weight: 400;
  color: red;
}
</style>
