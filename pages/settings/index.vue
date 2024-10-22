<template>
  <div>
    <form
      class="space-y-4 md:space-y-6 mt-6 xxxl:w-[70%]"
      @submit.prevent="editSetting"
    >
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-y-4 gap-4">
        <div class="flex gap-2 sm:flex-row flex-col">
          <label
            for="Base Price"
            class="block text-sm font-normal text-[#4B4B4B] mt-4"
            >Base Price :</label
          >
          <div>
            <input
              type="text"
              placeholder="Base Price"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] focus:outline-none"
              :class="
                errors?.basePrice
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
              v-model="formData.basePrice"
            />
            <span class="error-msg" v-if="errors?.basePrice">{{
              errors?.basePrice
            }}</span>
          </div>
        </div>
        <div class="flex gap-2 sm:flex-row flex-col">
          <label
            for="Additional Price"
            class="block text-sm font-normal text-[#4B4B4B] mt-4"
            >Additional Price :</label
          >
          <div>
            <input
              type="text"
              placeholder="Additional Price"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] focus:outline-none"
              :class="
                errors?.additionalPrice
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
              v-model="formData.additionalPrice"
            />
            <span class="error-msg" v-if="errors?.additionalPrice">{{
              errors?.additionalPrice
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
        >
          Update Settings
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      formData: {
        basePrice: "",
        additionalPrice: "",
      },
      errors: {},
    };
  },
  methods: {
    ...mapActions({
      fetchCoordinates: "settings/fetchCoordinates",
      updateCoordinates: "settings/updateCoordinates",
    }),
    async editSetting() {
      try {
        this.errors = await this.$validateSettingPrice({
          form: this.formData,
        });

        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }

        const res = await this.updateCoordinates({
          coordinates: this.formData,
        });
        this.$toast.open({
          message: res.msg,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getCoordinates() {
      try {
        const res = await this.fetchCoordinates();
        this.formData = res?.data?.coordinates;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getCoordinates();
  },
};
</script>
