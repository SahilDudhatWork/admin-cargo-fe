<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/manage-mode-of-transportation"
            >MODE OF TRANSPORTATION</nuxt-link
          >
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          EDIT MODE OF TRANSPORTATION
        </p>
      </div>

      <form
        class="space-y-4 md:space-y-6 mt-6"
        @submit.prevent="editModeOfTransportation"
      >
        <div
          class="grid xxxl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 !gap-y-4 gap-5"
        >
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Transportation *</label
            >
            <Dropdown
              :items="formatModeOfTransportation"
              :selectedLabel="selectedModeOfTransportationLabel"
              @getValue="getModeOfTransportionValue"
              :errors="errors?.selectedModeOfTransportationLabel"
              :isDisabled="true"
            />
            <span
              class="error-msg"
              v-if="errors?.selectedModeOfTransportationLabel"
              >{{ errors?.selectedModeOfTransportationLabel }}</span
            >
          </div>
          <div>
            <label
              for="title"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Title *</label
            >
            <input
              type="text"
              placeholder="Your Title"
              class="xl:w-[370px] text-gray-900 rounded-lg block w-full px-3 py-[17px]"
              v-model="modeOfTransportation.title"
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
              for="price"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Price *</label
            >
            <input
              type="text"
              placeholder="Your Price"
              class="xl:w-[370px] text-gray-900 rounded-lg block w-full px-3 py-[17px]"
              v-model="modeOfTransportation.price"
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
              for="email"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Description
            </label>
            <input
              type="text"
              placeholder="Your Description"
              class="xl:w-[370px] text-gray-900 rounded-lg block w-full px-3 py-[17px] border border-gray-300"
              v-model="modeOfTransportation.description"
            />
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
          >
            Update Mode Of Transportation
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
      modeOfTransportation: {
        title: "",
        price: "",
        description: "",
      },
      errors: {},
      modeOfTransporationList: [],
      selectedModeOfTransportationLabel: "Select option",
    };
  },
  computed: {
    formatModeOfTransportation() {
      return this.modeOfTransporationList.map((item) => {
        return {
          key: item._id,
          label: item?.title,
        };
      });
    },
  },
  methods: {
    ...mapActions({
      updateModeOfTransportation: "transitinfo/updateModeOfTransportation",
      fetchTransitInfo: "transitinfo/fetchTransitInfo",
      fetchSingleModeOfTransportation:
        "transitinfo/fetchSingleModeOfTransportation",
    }),
    getModeOfTransportionValue(item) {
      this.selectedModeOfTransportationLabel = item.label;
    },
    async validatePriceInput(event) {
      const validatedPrice = await this.$validatePrice(event.target.value);
      this.modeOfTransportation.price = validatedPrice;
    },
    async editModeOfTransportation() {
      try {
        this.errors = await this.$validateServices({
          form: this.modeOfTransportation,
          selectedModeOfTransportationLabel:
            this.selectedModeOfTransportationLabel,
        });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });

          return;
        }
        const res = await this.updateModeOfTransportation({
          transportationLabel: this.selectedModeOfTransportationLabel,
          data: this.modeOfTransportation,
          id: this.subId,
        });
        this.$toast.open({
          message: res.msg,
        });
        this.$router.push("/manage-mode-of-transportation");
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getSingleTransitInfo() {
      try {
        const res = await this.fetchSingleModeOfTransportation({
          id: this.subId,
          transportationLabel: this.selectedModeOfTransportationLabel,
        });
        this.modeOfTransportation = res.data;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getTransitInfo() {
      try {
        const res = await this.fetchTransitInfo();
        this.modeOfTransporationList = res?.data?.typeOfTransportation;
        const modeOfTransportation = res?.data?.modeOfTransportation;
        for (const key in modeOfTransportation) {
          const foundItem = modeOfTransportation[key].find(
            (item) => item._id === this.subId
          );
          if (foundItem) {
            this.selectedModeOfTransportationLabel = key;
            return;
          }
        }
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },
  async beforeMount() {
    await this.getTransitInfo();
    await this.getSingleTransitInfo();
  },
  async asyncData({ params }) {
    return {
      subId: params.pathMatch,
    };
  },
};
</script>
