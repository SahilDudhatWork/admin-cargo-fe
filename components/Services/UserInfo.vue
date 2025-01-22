<template>
  <div>
    <div>
      <h1 class="text-[#B9B9B9] text-[10px] font-semibold mb-2">USER INFO</h1>
      <div class="grid grid-cols-3">
        <div>
          <p class="text-[#1E1E1E] font-medium text-sm">
            {{ serviceSingleData?.userData?.contactName }}
          </p>
          <p class="text-[#686868] font-normal text-xs">
            (+{{ serviceSingleData?.userData?.countryCode }}
            {{ serviceSingleData?.userData?.contactNumber }})
          </p>
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
