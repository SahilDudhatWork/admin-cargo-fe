<template>
  <div>
    <VueSlickCarousel v-if="carouselItem.length" v-bind="settings">
      <div class="w-[360px]" v-for="(item, key) in carouselItem" :key="key">
        <div
          class="flex gap-4 mt-2 mr-3 py-3 h-[84px] px-3 bg-[#F7F7F7] rounded"
        >
          <div>
            <h1 class="text-xs text-[#151515] font-normal">
              {{ item?.addressDetails?.laneNumber }},
              {{ item?.addressDetails?.postalCode }}
              {{ item?.addressDetails?.additionalDetails }}
            </h1>
            <p class="text-xs font-light text-[#686868]">
              {{ item?.addressDetails?.buildinName }}
            </p>
            <p class="text-xs font-light text-[#686868] pt-1">items: Chains</p>
          </div>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  props: {
    carouselItem: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      settings: {
        focusOnSelect: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchThreshold: 1,
        dots: false,
        swipeToSlide: true,
        centerMode: true,
        centerPadding: "0px",
        infinite: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 1,
            },
          },
        ],
      },
    };
  },
};
</script>
