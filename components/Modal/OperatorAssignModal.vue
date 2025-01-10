<template>
  <div>
    <AssignModal
      :isModal="isAssignOperatorModal"
      @handleAssign="
        $emit('handleAssignOperator', selectedOperator, carrierReferenceData)
      "
      @close="$emit('closeAssignOperatorModal')"
      :buttonText="'Next'"
      @backAssign="$emit('backAssignOperator')"
      :isBackAssign="true"
      :isDisabled="allOperatorData.length > 0 ? false : true"
      :isSelected="selectedOperator && selectedOperator != null ? true : false"
    >
      <template #content>
        <div>
          <div class="mb-3">
            <div>
              <label
                for="Carrier Reference"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Carrier Reference</label
              >
              <input
                type="text"
                placeholder="Carrier Reference"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] focus:outline-none border border-gray-300"
                v-model="carrierReferenceData"
              />
              <span class="error-msg" v-if="errors?.carrierReference">{{
                errors?.carrierReference
              }}</span>
            </div>
          </div>
          <div
            class="flex justify-between items-center mt-5 mb-6 sm:flex-row flex-col"
          >
            <h1 class="font-semibold text-lg text-[#3683D5]">
              Assign Operator
            </h1>
            <div
              v-if="allOperatorData?.length > 0"
              class="flex justify-end sm:gap-5 gap-2 items-center sm:mt-0 mt-3"
            >
              <span>{{ operatorPaginationText }}</span>
              <button
                class="p-1 rounded-lg"
                @click="firstPage"
                :disabled="operatorPaginationData.pre_page_url === null"
                :class="
                  operatorPaginationData.pre_page_url === null
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
                :disabled="operatorPaginationData.pre_page_url === null"
                :class="
                  operatorPaginationData.pre_page_url === null
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
                :disabled="operatorPaginationData.next_page_url === null"
                :class="
                  operatorPaginationData.next_page_url === null
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
                :disabled="operatorPaginationData.next_page_url === null"
                :class="
                  operatorPaginationData.next_page_url === null
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
            v-if="allOperatorData.length > 0"
            class="grid sm:grid-cols-2 grid-cols-1 xxl:gap-0 gap-3 !gap-y-5 overflow-y-auto sm:h-[480px] h-[350px]"
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
          <div v-else>
            <h1
              class="font-semibold text-xl text-[#989898] mt-5 flex justify-center mb-5"
            >
              This carrier doesn't have any operator.
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
    isAssignOperatorModal: {
      type: Boolean,
      default: false,
    },
    selectedCarrirId: {
      type: Number,
    },
    errors: {
      type: [Object, Array],
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      carrierReferenceData: this.carrierReference,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      allOperatorData: "operator/getAllOperatorData",
      operatorPaginationData: "operator/getOperatorPaginationData",
      selectedOperator: "services/getSelectedOperatorData",
      carrierReference: "services/getCarrierReferenceData",
    }),
    operatorPaginationText() {
      return this.generateOperatorPaginationText(this.operatorPaginationData);
    },
  },

  watch: {
    carrierReferenceData(value) {
      this.updateCarrierReference(value);
    },
  },
  methods: {
    ...mapActions({
      fetchAllOperator: "operator/fetchAllOperator",
      updateSelectedOperator: "services/updateSelectedOperator",
      updateCarrierReference: "services/updateCarrierReference",
    }),
    selectOperator(operator) {
      this.updateSelectedOperator(operator);
    },
    async prevPage() {
      try {
        await this.getOperatorById({
          carrierAccountId: this.selectedCarrirId,
          page: this.operatorPaginationData.current_page - 1,
          limit: this.operatorPaginationData.limit,
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
        await this.getOperatorById({
          carrierAccountId: this.selectedCarrirId,
          page: this.operatorPaginationData.current_page + 1,
          limit: this.operatorPaginationData.limit,
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
        await this.getOperatorById({
          carrierAccountId: this.selectedCarrirId,
          page: 1,
          limit: this.operatorPaginationData.limit,
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
        await this.getOperatorById({
          carrierAccountId: this.selectedCarrirId,
          page: this.operatorPaginationData?.total_page,
          limit: this.operatorPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    generateOperatorPaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);
      return `${start}-${end} of ${total}`;
    },
    async getOperatorById(payload) {
      try {
        this.isLoading = true;
        let { page, limit } = payload;
        page = page || 1;
        limit = limit || 10;
        await this.fetchAllOperator({
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
    this.carrierReferenceData = this.carrierReference || null;
    try {
      await this.getOperatorById({ carrierAccountId: this.selectedCarrirId });
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
