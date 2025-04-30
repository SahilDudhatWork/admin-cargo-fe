<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/port-bridge">PORT & BRIDGE</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          ADD PORT & BRIDGE
        </p>
      </div>

      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="addPortBridge">
        <!-- <div
          v-for="(item, index) in formData?.requirements"
          :key="index"
          class="grid xxxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-5 gap-y-4"
        > -->
        <div
          class="grid xxxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-5 gap-y-4"
        >
          <div>
            <label
              for="Port & Bridge"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Port & Bridge *</label
            >
            <input
              type="text"
              placeholder="Your Post & Bridge"
              class="xxxl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
              v-model="formData.port_bridge"
              :class="
                errors?.port_bridge
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
            />
            <span class="error-msg" v-if="errors?.port_bridge">
              {{ errors?.port_bridge }}
            </span>
          </div>
        </div>

        <div class="flex justify-start">
          <button
            class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center sm:mr-40"
          >
            Add Port & Bridge
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
      formData: {
        port_bridge: "",
        requirements: [],
        // requirements: [
        //   {
        //     type: "",
        //     price: "",
        //   },
        // ],
      },
      errors: {},
    };
  },
  methods: {
    ...mapActions({
      createPortBridge: "transitinfo/createPortBridge",
      fetchTransitInfo: "transitinfo/fetchTransitInfo",
    }),
    // newPortBridge() {
    //   this.formData.requirements.push({
    //     price: "",
    //     type: "",
    //   });
    // },
    removePortBridge(item) {
      const index = this.formData.requirements.indexOf(item);
      if (index !== -1) {
        this.formData.requirements.splice(index, 1);
      }
    },
    // async validatePriceInput(event, index) {
    //   const validatedPrice = await this.$validatePrice(event.target.value);
    //   this.formData.requirements[index].price = validatedPrice;
    // },
    async addPortBridge() {
      try {
        this.errors = await this.$validatePortBridge({
          form: this.formData,
        });

        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }

        const res = await this.createPortBridge(this.formData);
        this.$toast.open({
          message: res.msg,
        });
        this.$router.push("/port-bridge");
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
