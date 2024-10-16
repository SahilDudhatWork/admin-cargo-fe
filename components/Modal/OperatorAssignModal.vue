<template>
  <div>
    <AssignModal
      :isModal="isAssignOperatorModal"
      @handleAssign="
        $emit(
          'handleAssignOperator',
          selectedOperator,
          selectedCarrierReference
        )
      "
      @close="$emit('closeAssignOperatorModal')"
      :buttonText="'Next'"
      @backAssign="$emit('backAssignOperator')"
      :isBackAssign="true"
      :isDisabled="allOperatorData.length > 0 ? false : true"
      :isSelected="selectedOperator"
    >
      <template #content>
        <div>
          <div class="mb-3">
            <label
              for="email"
              class="block mb-1 font-semibold text-lg text-[#3683D5]"
              >Carrier Reference</label
            >
            <div v-if="formatRef?.length > 0">
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
            <div v-else>
              <h1
                class="font-semibold text-xl text-[#989898] mt-5 flex justify-center mb-5"
              >
                This carrier doesn't have any reference.
              </h1>
            </div>
          </div>
          <div class="flex justify-between items-center mt-5 mb-6">
            <h1 class="font-semibold text-lg text-[#3683D5]">
              Assign Operator
            </h1>
            <div
              v-if="allOperatorData?.length > 0"
              class="flex justify-end gap-5 items-center"
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
            class="grid grid-cols-2 gap-y-5 overflow-y-auto h-[480px]"
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
      selectedOperator: null,
      selectedCarrierReference: "",
      carrierReferenceData: [],
    };
  },
  computed: {
    ...mapGetters({
      allOperatorData: "operator/getAllOperatorData",
      operatorPaginationData: "operator/getOperatorPaginationData",
    }),
    operatorPaginationText() {
      return this.generateOperatorPaginationText(this.operatorPaginationData);
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
      fetchAllOperator: "operator/fetchAllOperator",
      fetchCarrierReferences: "carrier/fetchCarrierReferences",
    }),
    getCarrierReferenceValue(item) {
      this.selectedCarrierReference = item;
    },
    selectOperator(operator) {
      this.selectedOperator = operator;
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
  },
  async mounted() {
    try {
      await this.getOperatorById({ carrierAccountId: this.selectedCarrirId });
      await this.getCarrierReference({
        carrierAccountId: this.selectedCarrirId,
      });
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
