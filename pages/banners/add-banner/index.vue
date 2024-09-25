<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/banners">BANNERS</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          ADD BANNER
        </p>
      </div>
      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="addBanner">
        <div class="w-full">
          <div class="flex gap-8 gap-y-2">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Role *</label
              >
              <Dropdown
                :items="userList"
                :selectedLabel="selectedUserLabel"
                @getValue="getBannerValue"
              />
              <span class="error-msg" v-if="errors?.selectedUserLabel">{{
                errors?.selectedUserLabel
              }}</span>
            </div>
            <div class="flex flex-col gap-y-2">
              <div
                v-for="(banner, index) in banner"
                :key="index"
                class="grid grid-cols-3 gap-y-4 gap-6"
              >
                <div>
                  <inputFile
                    item-label="Banner file *"
                    :fileData="banner.bannerImage"
                    :itemPlaceholder="''"
                    :file="
                      typeof banner.bannerImage == 'object'
                        ? banner.bannerImage?.name
                        : banner.bannerImage
                    "
                    @handleFileChange="
                      (event) => uploadBannerImage(event, index)
                    "
                  />
                  <span class="error-msg" v-if="errors?.bannerImage">{{
                    errors?.bannerImage
                  }}</span>
                </div>
                <div>
                  <label
                    for="banner-link"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                    >Banner link</label
                  >
                  <input
                    type="text"
                    name="UserDetails"
                    id="UserDetails"
                    placeholder="User Details"
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] focus:outline-none border border-gray-300"
                    v-model="banner.bannerLink"
                  />
                </div>
                <div>
                  <div
                    v-if="index == 0"
                    class="mt-9 cursor-pointer"
                    @click="newBanner"
                  >
                    <span
                      class="text-3xl font-bold bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] text-white rounded-full pb-1.5 w-10 flex items-center justify-center"
                      >+</span
                    >
                  </div>
                  <div
                    v-else
                    class="mt-6 cursor-pointer"
                    @click="removeBanner(banner)"
                  >
                    <span
                      class="text-3xl font-bold bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] text-white rounded-full pb-1.5 w-10 flex items-center justify-center"
                      >-</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <button
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 mr-40"
            >
              Add Banner
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      userList: [
        {
          label: "User",
        },
        {
          label: "Carrier",
        },
        {
          label: "Operator",
        },
      ],
      errors: {},
      selectedUserLabel: "Select option",
      banner: [
        {
          bannerLink: "",
          bannerImage: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      createBanner: "banner/createBanner",
    }),
    getBannerValue(item) {
      this.selectedUserLabel = item.label;
      this.role = item.label;
    },
    async uploadBannerImage(event, index) {
      try {
        const file = event.target.files[0];
        this.banner[index].bannerImage = file;
      } catch (error) {
        console.log(error);
      }
    },
    newBanner() {
      this.banner.push({
        bannerLink: "",
        bannerImage: null,
      });
    },
    removeBanner(banner) {
      const index = this.banner.indexOf(banner);
      if (index !== -1) {
        this.banner.splice(index, 1);
      }
    },
    async addBanner() {
      try {
        this.errors = await this.$validateBannerForm({
          form: this.banner,
          selectedUserLabel: this.selectedUserLabel,
        });
        if (this.errors) {
          this.errors.forEach((item) => {
            this.errors.selectedUserLabel = item.selectedUserLabel;
          });
        }
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }
        const formData = new FormData();
        formData.append("role", this.selectedUserLabel);
        this.banner.forEach((item, index) => {
          formData.append(`banners[${index}].image`, item.bannerImage);
          formData.append(`banners[${index}].link`, item.bannerLink);
        });

        const res = await this.createBanner(formData);
        this.$toast.open({
          message: res.msg,
        });
        this.$router.push("/banners");
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
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
