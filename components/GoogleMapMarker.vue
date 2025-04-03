<template>
  <div>
    <GmapMap
      :center="getMapLocation"
      :zoom="12"
      map-style-id="roadmap"
      map-type-id="terrain"
      ref="mapRef"
      :style="{ width: '100%', height: height }"
      :options="mapOptions"
      @dragend="getAddress"
      @click="handleMapClick"
      @center_changed="checkCenter"
    >
      <GmapMarker
        v-if="isShowMarker"
        :position="marker.position"
        :clickable="isMarkerEnabled"
        :draggable="isMarkerEnabled"
        @dragend="getUpdatedLocation"
      />
      <GmapMarker
        v-if="dropAddressData && dropAddressData.length"
        v-for="(address, index) in dropAddressData"
        :icon="redMarker"
        :key="`drop-${index}`"
        :position="{
          lat: parseFloat(address.addressDetails.lat),
          lng: parseFloat(address.addressDetails.long),
        }"
        :clickable="false"
        :draggable="false"
      />
      <GmapMarker
        v-if="pickUpAddressData && pickUpAddressData.length"
        v-for="(address, index) in pickUpAddressData"
        :icon="greenMarker"
        :key="`pick-${index}`"
        :position="{
          lat: parseFloat(address.addressDetails.lat),
          lng: parseFloat(address.addressDetails.long),
        }"
        :clickable="false"
        :draggable="false"
      />
    </GmapMap>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  props: {
    addressDetails: {
      type: Object,
      default: () => ({}),
    },
    height: {
      type: String,
      default: "242px",
    },
    isMarkerEnabled: {
      type: Boolean,
      default: true,
    },
    isShowMarker: {
      type: Boolean,
      default: true,
    },
    dropAddressData: {
      type: Array,
      default: () => [],
    },
    pickUpAddressData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      marker: { position: { lat: 40.73061, lng: -73.935242 } },

      mapOptions: {
        disableDefaultUI: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        keyboardShortcuts: false,
        zoomControl: false,
      },
      address: "",
      geocoder: null,

      getMapLocation: { lat: 40.73061, lng: -73.935242 },
      latLng: "",
      greenMarker: {
        url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        scaledSize: { width: 40, height: 40 }, // Adjust size if needed
      },
      redMarker: {
        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: { width: 40, height: 40 }, // Adjust size if needed
      },
    };
  },
  watch: {
    addressDetails: {
      immediate: true,
      handler(newValue) {
        if (newValue.lat && newValue.long) {
          const location = {
            lat: parseFloat(newValue.lat),
            lng: parseFloat(newValue.long),
          };
          this.getMapLocation = location;
          this.marker.position = location;

          if (this.$refs.mapRef?.panTo) {
            this.$refs.mapRef.panTo(location);
          }
        }
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.geocoder = new google.maps.Geocoder();
    }, 1000);
  },
  methods: {
    checkCenter(latLng) {
      if (!this.isMarkerEnabled) return;
      this.latLng = latLng;
      this.marker.position = { lat: latLng.lat(), lng: latLng.lng() };
    },
    async handleMapClick(e) {
      console.log("handleMapClick", e);
    },
    getUpdatedLocation(e) {
      this.marker.position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      this.latLng = this.marker.position;
      this.getAddress();
    },
    async getAddress(setAddress = true) {
      try {
        const resultTypes = [
          { type: "street_address", location_type: "ROOFTOP" },
          { type: "premise", location_type: "ROOFTOP" },
          { type: "street_address", location_type: "RANGE_INTERPOLATED" },
          { type: "route", location_type: "ROOFTOP" },
          { type: "premise", location_type: "RANGE_INTERPOLATED" },
          { type: "route", location_type: "RANGE_INTERPOLATED" },
          { type: "intersection", location_type: "ROOFTOP" },
          { type: "intersection", location_type: "RANGE_INTERPOLATED" },
        ];
        this.geocoder.geocode({ location: this.latLng }, (results, status) => {
          if (status === "OK") {
            let formattedAddress, addressComponents;
            for (let i = 0; i < resultTypes.length; i++) {
              const resultType = resultTypes[i];
              const result = results.find((result) => {
                const addressType = result.types.includes(resultType.type);
                const locationType =
                  result.geometry.location_type === resultType.location_type;
                return addressType && locationType;
              });
              if (result) {
                formattedAddress = result.formatted_address;
                addressComponents = result.address_components;
                break;
              }
            }
            if (!formattedAddress || !addressComponents) {
              formattedAddress = results[0].formatted_address;
              addressComponents = results[0].address_components;
            }
            if (setAddress) {
              const postalCode =
                addressComponents.find((component) =>
                  component.types.includes("postal_code")
                )?.long_name || "";

              this.address = formattedAddress;
              this.$emit("updateAddress", {
                address: this.address,
                postalCode: postalCode,
                lat: this.marker.position.lat,
                long: this.marker.position.lng,
              });
            } else {
              this.address = "";
            }
          } else {
            console.log("Geocoder failed due to: " + status);
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>
