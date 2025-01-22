<template>
  <div>
    <div>
      <h1 class="text-[#B9B9B9] text-[10px] font-semibold mb-4">
        AMOUNT DETAILS
      </h1>
      <div>
        <p class="text-[#1E1E1E] font-medium text-sm">
          {{ serviceSingleData?.amountDetails?.price
          }}{{ serviceSingleData?.amountDetails?.currency }}
        </p>
        <p class="text-[#B9B9B9] font-normal text-[10px]">
          Payment Mode: {{ serviceSingleData?.amountDetails?.paymentMode }}
        </p>
      </div>
    </div>
    <div class="mt-3 grid grid-cols-3 gap-y-5">
      <div>
        <p class="text-[#1E1E1E] font-medium text-sm">Drive Type</p>
        <p class="text-[#686868] font-light text-[10px] pt-0.5">
          {{ serviceSingleData?.typeOfTransportation?.title }}
        </p>
      </div>
      <div>
        <p class="text-[#1E1E1E] font-medium text-sm">Container Type</p>

        <p class="text-[#686868] font-light text-[10px] pt-0.5">
          {{ serviceSingleData?.modeOfTransportation?.title }}
        </p>
      </div>
      <div>
        <p class="text-[#1E1E1E] font-medium text-sm">Special Requirement</p>
        <div
          class="flex flex-wrap gap-2 mt-1"
          v-if="
            serviceSingleData?.specialRequirements &&
            serviceSingleData?.specialRequirements.length
          "
        >
          <p
            class="bg-[#0060C91A] px-2.5 rounded-[100px] flex items-center py-[2px]"
            v-for="(item, index) in serviceSingleData?.specialRequirements"
            :key="index"
          >
            <span class="text-[#0060C9] text-[10px] font-semibold">
              {{ item?.type }}
            </span>
          </p>
        </div>
        <div v-else>
          <p class="text-[#686868] font-light text-[10px] pt-0.5">N/A</p>
        </div>
      </div>
      <div>
        <p class="text-[#1E1E1E] font-medium text-sm">Bridge of crossing</p>
        <div v-if="serviceSingleData?.port_BridgeOfCrossing">
          <p class="text-[#686868] font-light text-[10px] pt-0.5">
            {{ serviceSingleData?.port_BridgeOfCrossing }}
          </p>
        </div>
        <div v-else>
          <p class="text-[#686868] font-light text-[10px] pt-0.5">N/A</p>
        </div>
      </div>
      <div v-if="serviceSingleData?.programming !== 'Instant'">
        <p class="text-[#1E1E1E] font-medium text-sm">Scheduled Time</p>
        <div v-if="serviceSingleData?.schedule">
          <p class="text-[#686868] font-light text-[10px] pt-0.5">
            {{ serviceSingleData?.schedule?.date }}
            {{ serviceSingleData?.schedule?.time }}
          </p>
        </div>
        <div>
          <p class="text-[#686868] font-light text-[10px] pt-0.5">N/A</p>
        </div>
      </div>
      <div>
        <p class="text-[#1E1E1E] font-medium text-sm">Quantity</p>
        <div
          v-if="
            serviceSingleData?.quantityForChains !== null ||
            serviceSingleData?.quantityForStraps !== null ||
            serviceSingleData?.quantityForTarps !== null
          "
        >
          <p class="text-[#686868] font-light text-[10px]">
            {{ serviceSingleData?.quantityForChains }}xChains,
            {{ serviceSingleData?.quantityForStraps }}xStraps,
            {{ serviceSingleData?.quantityForTarps }}xTarps
          </p>
        </div>
        <div v-else>
          <p class="text-[#686868] font-light text-[10px]">N/A</p>
        </div>
      </div>
    </div>
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
