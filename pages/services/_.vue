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

        <div
          class="mt-4 bg-[#F7F7F7] px-2 rounded-lg py-2"
          v-if="serviceSingleData?.qrCode && serviceSingleData?.qrCode.length"
        >
          <p class="text-[#1E1E1E] font-normal text-xs">
            You received an <span class="font-semibold">QR code</span> from
            carrier for further verification with user.
          </p>
          <div class="flex flex-wrap gap-4 mt-3">
            <div v-for="(doc, key) in serviceSingleData?.qrCode" :key="key">
              <img
                v-if="
                  fileTypes[doc] === 'application/pdf' ||
                  fileTypes[doc] === 'pdf'
                "
                src="@/static/svg/pdf.svg"
                alt="PDF Preview"
                class="mt-2 w-[100px] h-[100px] cursor-pointer"
                @click="downloadFileItem(doc)"
              />
              <img
                v-else-if="
                  fileTypes[doc] === 'application/msword' ||
                  fileTypes[doc] === 'doc' ||
                  fileTypes[doc] === 'document'
                "
                src="@/static/svg/doc.svg"
                alt="DOC Preview"
                class="mt-2 w-[100px] h-[100px] cursor-pointer"
                @click="downloadFileItem(doc)"
              />

              <img
                v-else-if="
                  fileTypes[doc] === 'image' ||
                  fileTypes[doc] === 'jpg' ||
                  fileTypes[doc] === 'jpeg' ||
                  fileTypes[doc] === 'png' ||
                  fileTypes[doc] === 'gif' ||
                  fileTypes[doc] === 'webp'
                "
                :src="doc"
                alt="Image Preview"
                class="mt-2 w-[100px] h-[100px] cursor-pointer"
                @click="downloadFileItem(doc)"
              />
            </div>
          </div>
        </div>
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
    <div class="mt-7">
      <p
        class="text-[#000000] font-bold text-lg mb-2"
        v-if="!location?.lat && !location?.long"
      >
        Operator location is waiting for assignment
      </p>
      <GoogleMapMarker
        v-if="loaded"
        :addressDetails="location"
        height="300px"
        :isMarkerEnabled="false"
        :isShowMarker="location?.lat && location?.long ? true : false"
        :pickUpAddressData="serviceSingleData?.pickUpAddressData"
        :dropAddressData="serviceSingleData?.dropAddressData"
      />
      <div class="bg-[#E6E6E6] h-[1px] w-full mt-7"></div>
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
      location: {},
      fileTypes: {},
      loaded: false,
    };
  },
  watch: {
    serviceSingleData: {
      deep: true,
      handler(item) {
        this.checkFileTypes(item.qrCode);
      },
    },
  },
  methods: {
    ...mapActions({
      fetchSingleService: "services/fetchSingleService",
      fetchLocation: "services/fetchLocation",
    }),
    downloadFileItem(doc) {
      const baseUrl = "https://cargo-storage-bucket.s3.us-east-1.amazonaws.com";
      if (doc.startsWith(baseUrl)) {
        const fileName = doc.split("/").pop();
        this.$downloadFile({ src: doc, name: fileName });
      }
    },
    getFileTypeFromUrl(url) {
      const extension = url.split(".").pop().toLowerCase();
      const fileTypes = {
        pdf: "pdf",
        doc: "document",
        docx: "document",
        jpg: "image",
        jpeg: "image",
        png: "image",
        gif: "image",
        webp: "image",
        mp4: "video",
        mp3: "audio",
        txt: "text",
      };
      return fileTypes[extension] || "unknown";
    },
    async checkFileTypes(urls) {
      for (let url of urls) {
        const fileType = this.getFileTypeFromUrl(url);
        this.$set(this.fileTypes, url, fileType);
      }
    },
    async getSingleTransitInfo() {
      try {
        const res = await this.fetchSingleService({
          id: this.movementId,
        });
        this.serviceSingleData = res.data;
        this.loaded = true;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getLocation() {
      try {
        const accountId = this.serviceSingleData?.operatorData?.accountId;
        if (!accountId) {
          return;
        }
        const res = await this.fetchLocation({
          id: accountId,
        });
        this.location = res?.data;
      } catch (error) {
        console.log(error, "error");
      }
    },
  },
  async beforeMount() {
    await this.getSingleTransitInfo();
    await this.getLocation();
  },
  async asyncData({ params }) {
    return {
      movementId: params.pathMatch,
    };
  },
};
</script>
