<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        <nuxt-link to="/banners">BANNERS</nuxt-link>
      </h1>
    </div>
    <div>
      <OptionList
        labelText="Banner list"
        buttonText="Add Banner"
        listWidth="87%"
        @add="addBanner"
      />
    </div>
    <div class="mt-6">
      <BannersActionButton @add="allActionButtons" />
    </div>
    <div>
      <BannerTable :allData="bannerData" />
      <DeleteAlertModal
        :isModal="isModal"
        @handleSubmit="handleSubmit"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      isModal: false,
      selectedItem: null,
      sortBy: "all",
      bannerData: [],
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      fetchBanners: "banner/fetchBanners",
    }),
    handleSubmit() {
      console.log("handleSubmit");
    },
    async getAllBanners(payload) {
      let { sortBy, page, limit, keyWord } = payload;
      sortBy = sortBy || "";
      page = page || 1;
      limit = limit || 10;
      keyWord = keyWord || "";
      const res = await this.fetchBanners({
        sortBy: sortBy,
        page: page,
        limit: limit,
        keyWord: keyWord,
      });
      this.bannerData = res.data;
    },
    async allActionButtons(type) {
      try {
        this.sortBy = type;
        const res = await this.getAllBanners({
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
    closeModal() {
      this.isModal = false;
    },
    addBanner() {
      this.$router.push("/banners/add-banner");
    },
  },
  async mounted() {
    try {
      const res = await this.getAllBanners({
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
};
</script>
