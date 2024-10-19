<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/manage-area">AREA</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          EDIT AREA
        </p>
      </div>

      <div class="flex flex-col gap-y-4">
        <div>
          <GoogleMap
            :coordinates="area.coordinates"
            @updateCoordinates="updateCoordinates"
          />
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
            class="sm:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
            v-model="area.price"
            @input="validatePriceInput($event)"
            :class="
              errors?.price ? 'border border-red-600' : 'border border-gray-300'
            "
          />
          <span class="error-msg" v-if="errors?.price">{{
            errors?.price
          }}</span>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          @click="editArea"
          class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
        >
          Update Area
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      areaId: "",
      area: {
        price: "",
        coordinates: [
          {
            lat: 40.69209442187933,
            lng: -73.946228328125,
          },
          {
            lat: 40.68635722468208,
            lng: -73.9129260209961,
          },
          {
            lat: 40.696089089181726,
            lng: -73.8718989519043,
          },
          {
            lat: 40.71805072418504,
            lng: -73.84872466601563,
          },
          {
            lat: 40.75343045136421,
            lng: -73.87112647570801,
          },
          {
            lat: 40.75889182048494,
            lng: -73.94742995776367,
          },
          {
            lat: 40.73392189933422,
            lng: -73.9843371538086,
          },
          {
            lat: 40.70312182186371,
            lng: -73.96596938647461,
          },
        ],
      },
      errors: {},
    };
  },
  methods: {
    ...mapActions({
      updateArea: "coordinate/updateArea",
      fetchSingleArea: "coordinate/fetchSingleArea",
    }),
    async validatePriceInput(event) {
      const validatedPrice = await this.$validatePrice(event.target.value);
      this.area.price = validatedPrice;
    },
    async updateCoordinates(coordinates) {
      this.area.coordinates = coordinates.length > 0 ? coordinates : [];
    },
    async editArea() {
      try {
        this.errors = await this.$validateAreaPrice({ form: this.area });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }
        let data = {
          id: this.areaId,
          price: this.area.price,
          coordinates: this.area.coordinates.map((location) => [
            location.lat,
            location.lng,
          ]),
        };
        const res = await this.updateArea(data);
        this.$toast.open({
          message: res.msg,
        });
        this.$router.push("/manage-area");
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getArea() {
      try {
        const res = await this.fetchSingleArea({ id: this.areaId });
        if (res?.data?.coordinates && res?.data?.coordinates.length > 0) {
          let transformedCoordinates = res?.data?.coordinates.map((coord) => ({
            lat: coord[0],
            lng: coord[1],
          }));
          this.area.coordinates = transformedCoordinates;
          this.area.price = res.data?.price;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getArea();
  },
  async asyncData({ params }) {
    return {
      areaId: params.pathMatch,
    };
  },
};
</script>
