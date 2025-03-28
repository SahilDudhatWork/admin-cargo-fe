<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/port-bridge">PORT & BRIDGE</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          EDIT PORT & BRIDGE
        </p>
      </div>

      <form
        class="space-y-4 md:space-y-6 mt-6"
        @submit.prevent="editPortBridge"
      >
        <div
          v-for="(item, index) in formData?.requirements"
          :key="index"
          class="grid xxxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-5 gap-y-4"
        >
          <div>
            <div v-if="index === 0">
              <label
                for="Port & Bridge"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Port & Bridge *</label
              >
              <input
                type="text"
                placeholder="Your Post & Bridge"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                v-model="formData.post_bridge"
                :class="
                  errors?.post_bridge
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
              />
              <span class="error-msg" v-if="errors?.post_bridge">{{
                errors?.post_bridge
              }}</span>
            </div>
          </div>
          <div>
            <label
              for="Requirement"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Requirement *
            </label>
            <input
              type="text"
              placeholder="Your Requirement"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] border border-gray-300"
              v-model="formData.requirements[index].type"
              :class="
                errors[`type${index}`]
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
            />
            <span class="error-msg" v-if="errors[`type${index}`]">{{
              errors[`type${index}`]
            }}</span>
          </div>
          <div class="flex lg:flex-row flex-col gap-5 gap-y-5">
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
                v-model="formData.requirements[index].price"
                @input="validatePriceInput($event, index)"
                :class="
                  errors[`price${index}`]
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
              />
              <span class="error-msg" v-if="errors[`price${index}`]">{{
                errors[`price${index}`]
              }}</span>
            </div>
            <div class="flex lg:justify-normal justify-center">
              <div
                v-if="index == 0"
                class="mt-9 cursor-pointer"
                @click="newPortBridge"
              >
                <span
                  class="text-3xl font-bold bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] text-white rounded-full pb-1.5 w-10 flex items-center justify-center"
                  >+</span
                >
              </div>
              <div
                v-else
                class="mt-6 cursor-pointer"
                @click="removePortBridge(item)"
              >
                <span
                  class="text-3xl font-bold bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] text-white rounded-full pb-1.5 w-10 flex items-center justify-center"
                  >-</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
          >
            Update Port & Bridge
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
        post_bridge: "",
        requirements: [
          {
            type: "",
            price: "",
          },
        ],
      },
      errors: {},
    };
  },
  methods: {
    ...mapActions({
      updatePortBridge: "transitinfo/updatePortBridge",
      fetchSinglePortBridge: "transitinfo/fetchSinglePortBridge",
    }),
    newPortBridge() {
      this.formData.requirements.push({
        price: "",
        type: "",
      });
    },
    removePortBridge(item) {
      const index = this.formData.requirements.indexOf(item);
      if (index !== -1) {
        this.formData.requirements.splice(index, 1);
      }
    },
    async validatePriceInput(event, index) {
      const validatedPrice = await this.$validatePrice(event.target.value);
      this.formData.requirements[index].price = validatedPrice;
    },
    async editPortBridge() {
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

        this.formData.requirements = this.formData.requirements.map(
          (requirement) => ({
            ...requirement,
            price: parseFloat(requirement.price),
          })
        );
        const res = await this.updatePortBridge(this.formData);
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
    async getportBridge() {
      try {
        const res = await this.fetchSinglePortBridge({
          id: this.portBridgeId,
        });
        this.formData = res.data;
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },
  async mounted() {
    await this.getportBridge();
  },
  async asyncData({ params }) {
    return {
      portBridgeId: params.pathMatch,
    };
  },
};
</script>
