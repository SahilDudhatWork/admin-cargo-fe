<template>
  <div>
    <div class="flex items-center gap-3 mb-5">
      <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
        <nuxt-link to="/rate-card">CARD</nuxt-link>
      </h1>
      <img src="@/static/svg/right-arrow.svg" alt="" />
      <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
        ADD CARD
      </p>
    </div>

    <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="addCard">
      <div
        class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 !gap-y-4 gap-5"
      >
        <div>
          <label class="block mb-2 text-sm font-normal text-[#4B4B4B]">
            Card Name
          </label>
          <input
            type="text"
            placeholder="Your Card Name"
            class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
            v-model="formData.cardName"
            :class="
              errors?.cardName
                ? 'border border-red-600'
                : 'border border-gray-300'
            "
          />

          <span class="error-msg" v-if="errors?.cardName">{{
            errors?.cardName
          }}</span>
        </div>

        <template v-for="(services, category) in localServices">
          <div
            :key="category + '-heading'"
            class="col-span-full text-lg font-semibold text-[#1E1E1E] mt-4 capitalize"
          >
            {{ formatCategory(category) }}
          </div>

          <div v-for="(service, index) in services" :key="service._id">
            <label
              :for="`service-${category}-${index}`"
              class="block text-sm text-gray-700 mb-1"
            >
              {{ service.title }}
            </label>
            <input
              :id="`service-${category}-${index}`"
              type="text"
              v-model="service.price"
              :placeholder="`Enter price`"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] border border-gray-300"
              @input="validatePriceInput($event, index, category)"
            />
          </div>
        </template>
      </div>

      <div class="flex justify-center">
        <button
          class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
          type="submit"
        >
          Add Card
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      formData: {
        cardName: "",
      },
      errors: {},
      localServices: this.allServices,
    };
  },

  computed: {
    ...mapGetters({
      allServices: "rate-card/getAllService",
    }),
  },
  watch: {
    allServices: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.localServices = JSON.parse(JSON.stringify(newVal));
      },
    },
  },
  methods: {
    ...mapActions({
      fetchAllService: "rate-card/fetchAllService",
      createService: "rate-card/createService",
    }),
    async validatePriceInput(event, index, category) {
      let validatedPrice = await this.$validateDecimalNumber(
        event.target.value
      );
      this.localServices[category][index].price = validatedPrice;
    },
    async addCard() {
      try {
        this.errors = await this.$validateRateCard({
          form: this.formData,
        });

        if (Object.keys(this.errors).length > 0) {
          return;
        }

        const payload = {
          cardName: this.formData.cardName,
        };

        for (const category in this.localServices) {
          payload[category] = this.localServices[category].map((service) => ({
            _id: service._id,
            price: service.price ? Number(service.price) : 0,
          }));
        }

        const res = await this.createService(payload);
        this.$toast.open({
          message: res.msg,
        });
        this.$router.push("/rate-card");
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    formatCategory(key) {
      return key
        .replace(/_/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b\w/g, (l) => l.toUpperCase());
    },
    async getAllServices() {
      try {
        await this.fetchAllService();
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getAllServices();
  },
};
</script>
