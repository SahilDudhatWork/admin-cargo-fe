<template>
  <div>
    <div>
      <h1 class="text-[#B9B9B9] text-[10px] font-semibold mb-2">
        PICKUP LOCATIONS
      </h1>
    </div>
    <div>
      <LocationsCarousel :carouselItem="serviceSingleData?.pickUpAddressData" />
    </div>
    <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
    <div class="mt-3">
      <h1 class="text-[#B9B9B9] text-[10px] font-semibold mb-2">
        DROP LOCATIONS
      </h1>
    </div>
    <div>
      <LocationsCarousel :carouselItem="serviceSingleData?.dropAddressData" />
    </div>
    <div class="bg-[#E6E6E6] h-[1px] w-full mt-6"></div>
  </div>
</template>

<script>
export default {
  props: {
    serviceSingleData: {
      type: Object,
      required: true,
    },
  },
};
</script>
