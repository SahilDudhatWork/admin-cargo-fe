<template>
  <div>
    <VueSlickCarousel v-if="carouselItem.length" v-bind="settings">
      <div
        class="w-[360px] overflow-hidden"
        v-for="(item, key) in carouselItem"
        :key="key"
      >
        <div
          class="flex gap-4 mt-2 mr-3 py-3 h-[84px] px-3 bg-[#F7F7F7] rounded"
        >
          <div class="overflow-hidden text-ellipsis">
            <h1 class="text-xs text-[#151515] font-normal line-clamp-2">
              {{
                String(item?.addressDetails?.buildinName).length > 100
                  ? String(item?.addressDetails?.buildinName).substring(
                      0,
                      100
                    ) + "..."
                  : item?.addressDetails?.buildinName
              }}
            </h1>
            <p class="text-xs font-light text-[#686868] line-clamp-1">
              {{ item?.addressDetails?.laneNumber }},
              {{ item?.addressDetails?.postalCode }}
              {{
                String(item?.addressDetails?.additionalDetails).length > 100
                  ? String(item?.addressDetails?.additionalDetails).substring(
                      0,
                      100
                    ) + "..."
                  : item?.addressDetails?.additionalDetails
              }}
            </p>
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
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        swipeToSlide: true,
        centerMode: true,
        centerPadding: "0px",
        infinite: true,
        arrows: true,
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
