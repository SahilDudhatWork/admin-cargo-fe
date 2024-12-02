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
        listWidth="91%"
        @add="addBanner"
        :isAddBtn="checkPermission?.add"
      />
    </div>
    <div>
      <BannerTable
        :allData="bannerData"
        @handleClick="editBanner"
        :isEditBtn="checkPermission?.edit"
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
      sortBy: "all",
      bannerData: [],
    };
  },
  computed: {
    ...mapGetters({
      getSinglePermission: "auth/getSinglePermission",
    }),
    checkPermission() {
      return this.getSinglePermission("Banners");
    },
  },
  methods: {
    ...mapActions({
      fetchBanners: "banner/fetchBanners",
    }),
    editBanner(item) {
      this.$router.push(`banners/edit-banner/${item._id}`);
    },
    async getAllBanners() {
      const res = await this.fetchBanners();
      this.bannerData = res.data;
    },
    async allActionButtons(type) {
      try {
        this.sortBy = type;
        await this.getAllBanners();
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    addBanner() {
      this.$router.push("/banners/add-banner");
    },
  },
  async mounted() {
    try {
      await this.getAllBanners();
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
