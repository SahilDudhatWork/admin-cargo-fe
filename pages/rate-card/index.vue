<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        CARD
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
        placeholder="Search by card name/ID"
        class="border border-gray-300 text-gray-900 rounded-lg block px-3 py-[14px] focus:outline-none mb-4 w-full"
        v-model="search"
        @keyup="searchText"
      />
    </div>
    <div>
      <OptionList
        labelText="Card list"
        buttonText="Add Card"
        listWidth="90%"
        @add="addCard"
        :isAddBtn="checkPermission?.add"
      />
    </div>
    <div class="mt-4">
      <CardTable
        :allData="allCardData"
        @deleteItem="removeCard"
        @handleClick="editCard"
        :paginationText="paginationText"
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
  layout: "dashboard",
  data() {
    return {
      isModal: false,
      search: "",
    };
  },
  computed: {
    ...mapGetters({
      getSinglePermission: "auth/getSinglePermission",
      allCardData: "rate-card/getAllCardData",
      cardPaginationData: "rate-card/getCardPaginationData",
    }),
    checkPermission() {
      return this.getSinglePermission("Rate Card");
    },
    paginationText() {
      return this.generatePaginationText(this.cardPaginationData);
    },
  },
  methods: {
    ...mapActions({
      fetchAllCard: "rate-card/fetchAllCard",
      deleteCard: "rate-card/deleteCard",
    }),
    editCard(id) {
      this.$router.push(`rate-card/edit-card/${id}`);
    },
    addCard() {
      this.$router.push("rate-card/add-card");
    },
    closeModal() {
      this.isModal = false;
    },
    async handleDelete() {
      try {
        const res = await this.deleteCard({
          _id: this.rateCardId,
        });
        this.$toast.open({
          message: res.msg,
        });
        await this.getRateCard({
          page: 1,
          limit: this.cardPaginationData.limit,
        });
        this.isModal = false;
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    removeCard(id) {
      this.isModal = true;
      this.rateCardId = id;
    },
    async getRateCard(payload) {
      try {
        let { page, limit, keyWord } = payload;
        page = page || 1;
        limit = limit || 10;
        keyWord = keyWord || "";
        await this.fetchAllCard({
          page: page,
          limit: limit,
          keyWord: keyWord,
        });
      } catch (error) {
        console.log(error);
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
        await this.getRateCard({
          keyWord: this.search,
          page: 1,
          limit: this.cardPaginationData.limit,
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
        await this.getRateCard({
          keyWord: this.search,
          page: this.cardPaginationData?.total_page,
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
        await this.getRateCard({
          keyWord: this.search,
          page: this.cardPaginationData.current_page - 1,
          limit: this.cardPaginationData.limit,
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
        await this.getRateCard({
          keyWord: this.search,
          page: this.cardPaginationData.current_page + 1,
          limit: this.cardPaginationData.limit,
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
      await this.getRateCard({
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
      await this.getRateCard({ keyWord: this.search });
    }, 1000);
  },
};
</script>
