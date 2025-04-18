<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/manage-area">AREA</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          ADD AREA
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
            for="Price"
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
          @click="addArea"
          class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
        >
          Add Area
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
      createArea: "coordinate/createArea",
    }),
    async validatePriceInput(event) {
      const validatedPrice = await this.$validatePrice(event.target.value);
      this.area.price = validatedPrice;
    },
    async updateCoordinates(coordinates) {
      this.area.coordinates = coordinates.length > 0 ? coordinates : [];
    },
    async addArea() {
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
          price: this.area.price,
          coordinates: this.area.coordinates.map((location) => [
            location.lat,
            location.lng,
          ]),
        };
        const res = await this.createArea(data);
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

    async generatePolygon(center, radius) {
      const numPoints = 8; // Number of points in the polygon
      const coords = [];
      for (let i = 0; i < numPoints; i++) {
        const angle = (i * 360) / numPoints;
        const lat = center.lat + radius * Math.cos((angle * Math.PI) / 180);
        const lng = center.lng + radius * Math.sin((angle * Math.PI) / 180);
        coords.push({ lat, lng });
      }
      return coords;
    },
  },
  async mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const polygonCoords = await this.generatePolygon(userLocation, 0.03); // Adjust radius as needed
          this.area.coordinates = polygonCoords;
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  },
};
</script>
