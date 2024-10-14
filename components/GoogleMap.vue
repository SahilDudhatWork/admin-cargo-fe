<template>
  <div>
    <GmapMap
      :center="getMapLocation"
      :zoom="12"
      map-style-id="roadmap"
      map-type-id="terrain"
      ref="map"
      style="width: 100%; height: 400px"
      :options="mapOptions"
    >
      <GmapPolygon
        ref="polygon"
        v-if="polygonPaths.length"
        :paths="polygonPaths"
        :editable="true"
        :draggable="true"
        @paths_changed="updatePolygonPaths"
      />
    </GmapMap>
  </div>
</template>
<script>
export default {
  props: {
    coordinates: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      mapOptions: {
        disableDefaultUI: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        keyboardShortcuts: false,
        zoomControl: true,
      },
      geocoder: null,
      polygonPaths: this.coordinates,
      getMapLocation: { lat: 40.73061, lng: -73.935242 },
      drawingManager: null, // Drawing manager instance
    };
  },
  watch: {
    coordinates: {
      immediate: true,
      handler(newCoords) {
        this.polygonPaths = newCoords;
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.geocoder = new google.maps.Geocoder();
    }, 1000);
  },
  methods: {
    updatePolygonPaths(event) {
      let paths = [];
      for (let i = 0; i < event.getLength(); i++) {
        let path = [];
        for (let j = 0; j < event.getAt(i).getLength(); j++) {
          let point = event.getAt(i).getAt(j);
          path.push({ lat: point.lat(), lng: point.lng() });
        }
        paths.push(path);
      }
      this.polygonPaths = paths[0];
      this.$emit("updateCoordinates", this.polygonPaths);
    },
  },
};
</script>
