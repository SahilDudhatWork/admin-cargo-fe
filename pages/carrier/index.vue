<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        CARRIER
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
        placeholder="Search by carrier name/ID"
        class="border border-gray-300 text-gray-900 rounded-lg block px-3 py-[14px] focus:outline-none mb-4 w-full"
        v-model="search"
        @keyup="searchText"
      />
    </div>
    <div>
      <OptionList
        labelText="Carrier list"
        buttonText="Add Carrier"
        listWidth="91%"
        @add="addCarrier"
        :isAddBtn="checkPermission?.add"
      />
    </div>
    <div class="mt-6">
      <CarrierActionButton @add="allActionButtons" />
    </div>
    <div>
      <CarrierTable
        :allData="allCarrierData"
        :paginationText="paginationText"
        @deleteItem="removeCarrier"
        @handleClick="editCarrier"
        @firstPage="firstPage"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @lastPage="lastPage"
        :isEditBtn="checkPermission?.edit"
        :isDeleteBtn="checkPermission?.delete"
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
      allCarrierData: "carrier/getAllCarrierData",
      carrierPaginationData: "carrier/getCarrierPaginationData",
      getSinglePermission: "auth/getSinglePermission",
    }),
    paginationText() {
      return this.generatePaginationText(this.carrierPaginationData);
    },
    checkPermission() {
      return this.getSinglePermission("Carrier");
    },
  },
  methods: {
    ...mapActions({
      fetchAllCarrier: "carrier/fetchAllCarrier",
      deleteCarrier: "carrier/deleteCarrier",
    }),
    async allActionButtons(type) {
      try {
        this.sortBy = type;

        const res = await this.getAllCarrier({
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
    async getAllCarrier(payload) {
      let { sortBy, page, limit, keyWord } = payload;
      sortBy = sortBy || "";
      page = page || 1;
      limit = limit || 10;
      keyWord = keyWord || "";
      await this.fetchAllCarrier({
        sortBy: sortBy,
        page: page,
        limit: limit,
        keyWord: keyWord,
      });
    },
    editCarrier(item) {
      this.$router.push(`carrier/edit-carrier/${item.accountId}`);
    },
    addCarrier() {
      this.$router.push("/carrier/add-carrier");
    },
    closeModal() {
      this.isModal = false;
    },
    generatePaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);

      return `${start}-${end} of ${total}`;
    },
    async prevPage() {
      try {
        await this.getAllCarrier({
          sortBy: this.sortBy,
          keyWord: this.search,
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
    async nextPage() {
      try {
        await this.getAllCarrier({
          sortBy: this.sortBy,
          keyWord: this.search,
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
    async firstPage() {
      try {
        await this.getAllCarrier({
          sortBy: this.sortBy,
          keyWord: this.search,
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
    async lastPage() {
      try {
        await this.getAllCarrier({
          sortBy: this.sortBy,
          keyWord: this.search,
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
    async handleDelete() {
      try {
        const response = await this.deleteCarrier({
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
    removeCarrier(id) {
      this.isModal = true;
      this.selectedId = id;
    },
  },
  async mounted() {
    try {
      await this.getAllCarrier({
        sortBy: this.sortBy,
        keyWord: this.search,
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
      await this.getAllCarrier({ keyWord: this.search, sortBy: this.sortBy });
    }, 1000);
  },
};
</script>
