<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/securing-equipment">SECURING EQUIPMENT</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          ADD SECURING EQUIPMENT
        </p>
      </div>

      <form
        class="space-y-4 md:space-y-6 mt-6"
        @submit.prevent="addSecuringEquipment"
      >
        <div class="grid grid-cols-3 !gap-y-4 gap-5">
          <div>
            <label
              for="chains"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Chains *</label
            >
            <input
              type="text"
              placeholder="Your Chains"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
              v-model="securingEquipment.chains"
              @input="validateChainsInput($event)"
              :class="
                errors?.chains
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
            />
            <span class="error-msg" v-if="errors?.chains">{{
              errors?.chains
            }}</span>
          </div>

          <div>
            <label
              for="tarps"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Tarps *</label
            >
            <input
              type="text"
              placeholder="Your Tarps"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
              v-model="securingEquipment.tarps"
              @input="validateTarpsInput($event)"
              :class="
                errors?.tarps
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
            />
            <span class="error-msg" v-if="errors?.tarps">{{
              errors?.tarps
            }}</span>
          </div>
          <div>
            <label
              for="straps"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Straps *
            </label>
            <input
              type="text"
              placeholder="Your Straps"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
              v-model="securingEquipment.straps"
              @input="validateStrapsInput($event)"
              :class="
                errors?.straps
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
            />
            <span class="error-msg" v-if="errors?.straps">{{
              errors?.straps
            }}</span>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 mr-40"
          >
            Add Securing Equipment
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
      securingEquipment: {
        chains: "",
        tarps: "",
        straps: "",
      },
      errors: {},
    };
  },
  methods: {
    ...mapActions({
      createTransitInfo: "transitinfo/createTransitInfo",
    }),
    async validateChainsInput(event) {
      const validatedChains = await this.$validatePrice(event.target.value);
      this.securingEquipment.chains = validatedChains;
    },
    async validateTarpsInput(event) {
      const validatedTarps = await this.$validatePrice(event.target.value);
      this.securingEquipment.tarps = validatedTarps;
    },
    async validateStrapsInput(event) {
      const validatedStraps = await this.$validatePrice(event.target.value);
      this.securingEquipment.straps = validatedStraps;
    },
    async addSecuringEquipment() {
      try {
        this.errors = await this.$validateSecuringEquipment({
          form: this.securingEquipment,
        });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });

          return;
        }
        const res = await this.createTransitInfo({
          securingEquipment: this.securingEquipment,
        });
        this.$toast.open({
          message: res.msg,
        });
        this.$router.push("/securing-equipment");
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
