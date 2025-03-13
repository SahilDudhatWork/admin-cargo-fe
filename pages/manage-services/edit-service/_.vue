<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/manage-services">SERVICES</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          EDIT SERVICE
        </p>
      </div>

      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="editService">
        <div
          class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 !gap-y-4 gap-5"
        >
          <div>
            <label
              for="Title"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Title *</label
            >
            <input
              type="text"
              placeholder="Your Title"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
              v-model="typeOfService.title"
              :class="
                errors?.title
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
            />
            <span class="error-msg" v-if="errors?.title">{{
              errors?.title
            }}</span>
          </div>

          <div>
            <label
              for="Price"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Price *</label
            >
            <input
              type="text"
              placeholder="Your Price"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
              v-model="typeOfService.price"
              @input="validatePriceInput($event)"
              :class="
                errors?.price
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
            />
            <span class="error-msg" v-if="errors?.price">{{
              errors?.price
            }}</span>
          </div>
          <div>
            <label
              for="Description"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Description
            </label>
            <input
              type="text"
              placeholder="Your Description"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] border border-gray-300"
              v-model="typeOfService.description"
            />
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
          >
            Update Service
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
      typeOfService: {
        title: "",
        price: "",
        description: "",
      },
      errors: {},
    };
  },
  methods: {
    ...mapActions({
      updateService: "transitinfo/updateService",
      fetchSingleService: "transitinfo/fetchSingleService",
    }),
    async editService() {
      try {
        this.errors = await this.$validateServices({
          form: this.typeOfService,
        });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });

          return;
        }
        const res = await this.updateService(this.typeOfService);
        this.$toast.open({
          message: res.msg,
        });
        this.$router.push("/manage-services");
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async validatePriceInput(event) {
      const validatedPrice = await this.$validatePointPrice(event.target.value);
      this.typeOfService.price = validatedPrice;
    },
    async getTransitInfo() {
      try {
        const res = await this.fetchSingleService({ id: this.subId });
        this.typeOfService = res?.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getTransitInfo();
  },
  async asyncData({ params }) {
    return {
      subId: params.pathMatch,
    };
  },
};
</script>
