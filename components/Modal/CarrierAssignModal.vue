<template>
  <div>
    <AssignModal
      :isModal="isAssignCarrierModal"
      @handleAssign="$emit('handleAssignCarrier', selectedCarrier)"
      @close="$emit('closeAssignCarrierModal')"
      :isDisabled="allCarrierData.length > 0 ? false : true"
      :buttonText="'Next'"
      :isSelected="selectedCarrier && selectedCarrier != null ? true : false"
    >
      <template #content>
        <div>
          <div
            class="flex justify-between items-center mt-5 mb-6 sm:flex-row flex-col"
          >
            <h1 class="font-semibold text-lg text-[#3683D5]">Assign Carrier</h1>
            <div
              v-if="allCarrierData?.length > 0"
              class="flex justify-end sm:gap-5 gap-2 sm:mt-0 mt-3 items-center"
            >
              <span>{{ carrierPaginationText }}</span>
              <button
                class="p-1 rounded-lg"
                :class="
                  carrierPaginationData.pre_page_url === null
                    ? 'bg-[#89abcf]'
                    : 'bg-[#3683D5]'
                "
                @click="carrierFirstPage"
                :disabled="carrierPaginationData.pre_page_url === null"
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
                @click="carrierPrevPage"
                :class="
                  carrierPaginationData.pre_page_url === null
                    ? 'bg-[#89abcf]'
                    : 'bg-[#3683D5]'
                "
                class="p-[9px] rounded-lg"
                :disabled="carrierPaginationData.pre_page_url === null"
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
                @click="carrierNextPage"
                class="p-[9px] rounded-lg"
                :class="
                  carrierPaginationData.next_page_url === null
                    ? 'bg-[#89abcf]'
                    : 'bg-[#3683D5]'
                "
                :disabled="carrierPaginationData.next_page_url === null"
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
                @click="carrierLastPage"
                class="p-1 rounded-lg"
                :class="
                  carrierPaginationData.next_page_url === null
                    ? 'bg-[#89abcf]'
                    : 'bg-[#3683D5]'
                "
                :disabled="carrierPaginationData.next_page_url === null"
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
            class="grid sm:grid-cols-2 grid-cols-1 !gap-y-5 xxl:gap-0 gap-3 overflow-y-auto sm:max-h-[260px] max-h-[160px]"
            v-if="allCarrierData.length > 0"
          >
            <AssignCarrier
              v-for="item in allCarrierData"
              :key="item._id"
              :allCarrierData="item"
              :isSelected="selectedCarrier && selectedCarrier._id === item._id"
              @selectCarrier="selectCarrier(item)"
              @handleVerify="handleVerify"
            />
          </div>
          <div v-else>
            <h1
              class="font-semibold text-xl text-[#989898] mt-5 flex justify-center mb-5"
            >
              You don't have any carrier
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
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    isAssignCarrierModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      allCarrierData: "carrier/getAllCarrierData",
      carrierPaginationData: "carrier/getCarrierPaginationData",
      selectedCarrier: "services/getSelectedCarrierData",
    }),
    carrierPaginationText() {
      return this.generateCarrierPaginationText(this.carrierPaginationData);
    },
  },
  methods: {
    ...mapActions({
      fetchAllCarrier: "carrier/fetchAllCarrier",
      carrierUnVerify: "carrier/carrierUnVerify",
      carrierVerified: "carrier/carrierVerified",
      updateSelectedCarrier: "services/updateSelectedCarrier",
    }),
    async handleVerify(item) {
      try {
        if (item.verifyByAdmin) {
          try {
            const res = await this.carrierUnVerify(item);
            this.$toast.open({
              message: res.msg,
            });
          } catch (error) {
            console.log(error);
            this.$toast.open({
              message:
                error?.response?.data?.msg || this.$i18n.t("errorMessage"),
              type: "error",
            });
          }
        } else {
          try {
            const res = await this.carrierVerified(item);
            this.$toast.open({
              message: res.msg,
            });
          } catch (error) {
            console.log(error);
            this.$toast.open({
              message:
                error?.response?.data?.msg || this.$i18n.t("errorMessage"),
              type: "error",
            });
          }
        }
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    selectCarrier(carrier) {
      this.updateSelectedCarrier(carrier);
      this.selectedCarrirId = this.selectedCarrier?.accountId;
    },
    async carrierPrevPage() {
      try {
        await this.getAllCarrier({
          page: this.carrierPaginationData.current_page - 1,
          limit: this.carrierPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async carrierNextPage() {
      try {
        await this.getAllCarrier({
          page: this.carrierPaginationData.current_page + 1,
          limit: this.carrierPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async carrierFirstPage() {
      try {
        await this.getAllCarrier({
          page: 1,
          limit: this.carrierPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async carrierLastPage() {
      try {
        await this.getAllCarrier({
          page: this.carrierPaginationData?.total_page,
          limit: this.carrierPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    generateCarrierPaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);
      return `${start}-${end} of ${total}`;
    },
    async getAllCarrier(payload) {
      try {
        this.isLoading = true;
        let { page, limit } = payload;
        page = page || 1;
        limit = limit || 10;
        const res = await this.fetchAllCarrier({
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
      await this.getAllCarrier({ sortBy: "all" });
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
