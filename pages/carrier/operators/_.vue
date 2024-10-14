<template>
  <div>
    <div class="flex items-center gap-3 mb-5">
      <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
        <nuxt-link to="/carrier">CARRIER</nuxt-link>
      </h1>
      <img src="@/static/svg/right-arrow.svg" alt="" />
      <h1 class="text-[#4B4B4B] font-normal text-[12px] cursor-pointer">
        OPERATOR
      </h1>
    </div>
    <div class="relative">
      <img
        src="@/static/svg/search.svg"
        alt=""
        class="absolute right-3 top-[18px] cursor-pointer"
      />
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search by user name/ID"
        class="border border-gray-300 text-gray-900 rounded-lg block px-3 py-[14px] focus:outline-none mb-4 w-full"
        v-model="search"
        @keyup="searchText"
      />
    </div>
    <div></div>
    <div class="mt-6">
      <OperatorActionButton @add="allActionButtons" />
    </div>
    <div>
      <OperatorTable
        :allData="allOperatorData"
        :paginationText="paginationText"
        @handleVerify="handleVerify"
        @deleteItem="removeOperator"
        @handleClick="editOperator"
        @firstPage="firstPage"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @lastPage="lastPage"
      />
      <DeleteAlertModal
        :isModal="isModal"
        @handleSubmit="handleDelete"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "operators",
  layout: "dashboard",
  data() {
    return {
      isModal: false,
      search: "",
      sortBy: "all",
      carrierAccountId: null,
    };
  },
  computed: {
    ...mapGetters({
      allOperatorData: "operator/getAllOperatorData",
      operatorPaginationData: "operator/getOperatorPaginationData",
      getSingleCarrierData: "carrier/getSingleCarrierData",
    }),
    paginationText() {
      return this.generatePaginationText(this.operatorPaginationData);
    },
  },
  methods: {
    ...mapActions({
      fetchAllOperator: "operator/fetchAllOperator",
      deleteOperator: "operator/deleteOperator",
    }),
    generatePaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);

      return `${start}-${end} of ${total}`;
    },
    async firstPage() {
      try {
        await this.getAllOperator({
          sortBy: this.sortBy,
          keyWord: this.search,
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
        await this.getAllOperator({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: this.operatorPaginationData?.total_page,
          limit: 10,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async prevPage() {
      try {
        await this.getAllOperator({
          sortBy: this.sortBy,
          keyWord: this.search,
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
        await this.getAllOperator({
          sortBy: this.sortBy,
          keyWord: this.search,
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
    closeModal() {
      this.isModal = false;
    },
    addOperator() {
      // this.$router.push("/operator/add-operator");
    },
    async getAllOperator(payload) {
      let { sortBy, page, limit, keyWord } = payload;
      sortBy = sortBy || "";
      page = page || 1;
      limit = limit || 10;
      keyWord = keyWord || "";
      await this.fetchAllOperator({
        sortBy: sortBy,
        page: page,
        limit: limit,
        keyWord: keyWord,
        carrierAccountId: this.carrierAccountId,
      });
    },
    async removeOperator(id) {
      this.isModal = true;
      this.selectedId = id;
    },
    editOperator(item) {
      // this.$router.push(`operator/edit-operator/${item.accountId}`);
    },
    async handleVerify(item) {
      console.log("handleSubmit", item);
    },
    async handleDelete() {
      try {
        const response = await this.deleteOperator({
          accountId: this.selectedId,
        });
        this.$toast.open({
          message: response.msg,
        });
        this.isModal = false;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async allActionButtons(type) {
      try {
        this.sortBy = type;
        await this.getAllOperator({
          keyWord: this.search,
          sortBy: this.sortBy,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },
  async mounted() {
    try {
      this.carrierAccountId = this.$route.params?.id || null;
      if (!this.carrierAccountId) {
        return this.$router.push("/carrier");
      } else {
        await this.getAllOperator({
          keyWord: this.search,
          sortBy: this.sortBy,
        });
      }
    } catch (error) {
      console.log(error);
      this.$toast.open({
        message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
        type: "error",
      });
      return this.$router.push("/carrier");
    }
  },
  async created() {
    this.searchText = this.$lodash.debounce(async (payload) => {
      await this.getAllOperator({ keyWord: this.search, sortBy: this.sortBy });
    }, 1000);
  },
};
</script>
