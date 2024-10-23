<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/banners">BANNERS</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          EDIT BANNER
        </p>
      </div>
      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="editBanner">
        <div class="w-full">
          <div
            class="grid xxxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-5 gap-y-4"
            v-for="(item, index) in banner"
            :key="index"
          >
            <div>
              <div v-if="index === 0">
                <label
                  for="email"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Banner *</label
                >
                <Dropdown
                  :items="userList"
                  :selectedLabel="selectedUserLabel"
                  @getValue="getBannerValue"
                  :errors="errors?.selectedUserLabel"
                />
                <span class="error-msg" v-if="errors?.selectedUserLabel">{{
                  errors?.selectedUserLabel
                }}</span>
              </div>
            </div>

            <div>
              <inputFile
                item-label="Banner file *"
                :fileData="item.image"
                :errors="errors[`image${index}`]"
                :itemPlaceholder="''"
                :file="
                  typeof item.image == 'object' ? item.image?.name : item.image
                "
                @handleFileChange="(event) => uploadBannerImage(event, index)"
              />
              <span v-if="errors[`image${index}`]" class="error-msg">
                {{ errors[`image${index}`] }}
              </span>
            </div>
            <div class="flex lg:flex-row flex-col gap-5 gap-y-5">
              <div>
                <label
                  for="banner-link"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Banner link</label
                >
                <input
                  type="text"
                  name="banner-link"
                  id="banner-link"
                  placeholder="Banner link"
                  class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] focus:outline-none border border-gray-300"
                  v-model="item.link"
                />
              </div>
              <div class="flex lg:justify-normal justify-center">
                <div
                  v-if="index == 0"
                  class="mt-9 cursor-pointer"
                  @click="addNewBanner"
                >
                  <span
                    class="text-3xl font-bold bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] text-white rounded-full pb-1.5 w-10 flex items-center justify-center"
                    >+</span
                  >
                </div>
                <div
                  v-else
                  class="mt-6 cursor-pointer"
                  @click="removeBanner(item)"
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
            class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
          >
            Update Banner
          </button>
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
      bannerId: "",
      selectedUserLabel: "Select option",
      banner: [
        {
          link: "",
          image: null,
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      updateBanner: "banner/createBanner",
      fetchSingleBanner: "banner/fetchSingleBanner",
    }),
    getBannerValue(item) {
      this.selectedUserLabel = item.label;
      this.role = item.label;
    },
    async uploadBannerImage(event, index) {
      try {
        const file = event.target.files[0];
        if (file) {
          this.$set(this.banner, index, { ...this.banner[index], image: file });
        }
      } catch (error) {
        console.log(error);
      }
    },
    addNewBanner() {
      this.banner.push({
        link: "",
        image: null,
      });
    },
    removeBanner(banner) {
      const index = this.banner.indexOf(banner);
      if (index !== -1) {
        this.banner.splice(index, 1);
      }
    },
    async editBanner() {
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

        const fetchImageAsBlob = async (url) => {
          const response = await fetch(url);
          const blob = await response.blob();
          return blob;
        };

        await Promise.all(
          this.banner.map(async (item, index) => {
            if (typeof item.image === "string") {
              const imageBlob = await fetchImageAsBlob(item.image);

              const fileName = item.image.split("/").pop();

              formData.append(`banners[${index}].image`, imageBlob, fileName);
            } else if (item.image instanceof File) {
              formData.append(`banners[${index}].image`, item.image);
            } else {
              console.error(
                `Expected a string (URL) or File for item.image but received:`,
                item.image
              );
              return;
            }
            formData.append(`banners[${index}].link`, item.link);
          })
        );

        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        const res = await this.updateBanner(formData);
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
    async getSingleBanner() {
      try {
        const res = await this.fetchSingleBanner({ id: this.bannerId });
        this.banner = res?.data?.banners || [];
        this.selectedUserLabel = res?.data?.role || "";
      } catch (error) {}
    },
  },
  async beforeMount() {
    this.bannerId = this.$route.params?.pathMatch || null;
    if (!this.bannerId) {
      this.$router.push("/banners");
    }
    await this.getSingleBanner();
  },
};
</script>
