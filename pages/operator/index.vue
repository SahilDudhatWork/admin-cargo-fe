<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        OPERATORS
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
        placeholder="Search by operator name/ID"
        class="border border-gray-300 text-gray-900 rounded-lg block px-3 py-[14px] focus:outline-none mb-4 w-full"
        v-model="search"
        @keyup="searchText"
      />
    </div>
    <div class="mt-6">
      <OperatorActionButton @add="allActionButtons" />
    </div>
    <div>
      <OperatorTable
        :allData="allOperatorData"
        :paginationText="paginationText"
        @firstPage="firstPage"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @lastPage="lastPage"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      isModal: false,
      sortBy: "all",
      search: "",
    };
  },
  computed: {
    ...mapGetters({
      allOperatorData: "operator/getAllOperatorData",
      operatorPaginationData: "operator/getOperatorPaginationData",
    }),
    paginationText() {
      return this.generatePaginationText(this.operatorPaginationData);
    },
  },
  methods: {
    ...mapActions({
      fetchOperators: "operator/fetchOperators",
    }),
    async getAllOperator(payload) {
      let { sortBy, page, limit, keyWord } = payload;
      sortBy = sortBy || "";
      page = page || 1;
      limit = limit || 10;
      keyWord = keyWord || "";
      await this.fetchOperators({
        sortBy: sortBy,
        page: page,
        limit: limit,
        keyWord: keyWord,
      });
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
  },
  async mounted() {
    try {
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
  async created() {
    this.searchText = this.$lodash.debounce(async (payload) => {
      await this.getAllOperator({ keyWord: this.search, sortBy: this.sortBy });
    }, 1000);
  },
};
</script>
