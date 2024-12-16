<template>
  <div>
    <div class="flex items-center gap-3 mb-5">
      <h1 class="text-[#4B4B4B] font-normal text-[12px] cursor-pointer">
        <nuxt-link to="/services">SERVICES</nuxt-link>
      </h1>
      <img src="@/static/svg/right-arrow.svg" alt="" />
      <h1 class="text-[#4B4B4B] font-normal text-[12px] cursor-pointer">
        {{ serviceSingleData.movementId }}
      </h1>
    </div>
    <div v-if="$checkUserUpload(serviceSingleData?.status)">
      <h1 class="text-[#B9B9B9] font-semibold text-[10px] mb-5">UPDATES</h1>
      <div class="flex items-center gap-4">
        <p class="text-[#1E1E1E] font-medium text-[10px]">
          User’s details info uploaded
        </p>
        <p class="text-[#3683D5] font-normal text-[10px]">view details</p>
      </div>
      <div class="mt-4 mb-4">
        <button
          class="text-[#FFFFFF] font-semibold text-sm rounded-md px-5 py-2 bg-gradient-to-r from-[#0464CB] to-[#2AA1EB]"
        >
          Generate Invoice
        </button>
      </div>
      <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    </div>
    <div class="mt-5">
      <AmountDetails :serviceSingleData="serviceSingleData" />
    </div>
    <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    <div>
      <div class="mt-5" v-if="serviceSingleData?.userData">
        <UserInfo :serviceSingleData="serviceSingleData" />
      </div>
      <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    </div>
    <div class="mt-5" v-if="serviceSingleData?.carrierData">
      <div class="mt-5">
        <CarrierInfo :serviceSingleData="serviceSingleData" />
      </div>
      <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    </div>
    <div class="mt-5" v-if="serviceSingleData?.vehicleData">
      <div class="mt-5">
        <VehicleRequest :serviceSingleData="serviceSingleData" />
      </div>
      <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    </div>
    <div class="mt-5">
      <ServiceDetails :serviceSingleData="serviceSingleData" />
    </div>
    <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    <div class="mt-5" v-if="serviceSingleData?.operatorData">
      <div>
        <OperatorInfo :serviceSingleData="serviceSingleData" />
      </div>
      <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    </div>
    <div class="mt-5">
      <Locations :serviceSingleData="serviceSingleData" />
    </div>
    <div
      class="mt-5"
      v-if="$checkProofOfPhotography(serviceSingleData?.status)"
    >
      <ProofOfPhotography :serviceSingleData="serviceSingleData" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      serviceSingleData: {},
    };
  },
  methods: {
    ...mapActions({
      fetchSingleService: "services/fetchSingleService",
    }),
    async getSingleTransitInfo() {
      try {
        const res = await this.fetchSingleService({
          id: this.movementId,
        });
        this.serviceSingleData = res.data;
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
    await this.getSingleTransitInfo();
  },
  async asyncData({ params }) {
    return {
      movementId: params.pathMatch,
    };
  },
};
</script>
