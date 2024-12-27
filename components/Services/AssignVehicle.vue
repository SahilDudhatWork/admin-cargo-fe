<template>
  <div>
    <div
      @click="$emit('selectVehicle')"
      class="xxl:w-[384px] w-full h-[84px] py-3 px-3 rounded-lg cursor-pointer"
      :class="
        isSelected ? 'border border-[#3683D5]' : 'border border-[#E7E7E7] '
      "
    >
      <div class="flex w-full justify-between">
        <div>
          <div class="flex gap-3">
            <h1 class="text-[#1E1E1E] font-medium text-sm">
              {{ allVehicleData?.usPlates }}
            </h1>
            <div>
              <h1
                :class="
                  allVehicleData?.status == 'Active'
                    ? 'bg-[#3ECC48]'
                    : 'bg-[#D1D1D1]'
                "
                class="text-[#FEFEFE] font-medium text-[10px] px-2.5 rounded py-[1px]"
              >
                {{
                  allVehicleData?.status == "Active" ? "AVAILABLE" : "INACTIVE"
                }}
              </h1>
            </div>
          </div>
          <p class="text-[#414141] font-light text-xs pb-1">Hologram Number</p>
          <div
            class="text-[#414141] font-light text-xs flex items-center gap-1"
          >
            <span> 12 Axes ★ Black </span>
            <div class="bg-[#1E1E1E] rounded-[4px] w-3 h-3"></div>
          </div>
        </div>
        <div class="mt-4">
          <img src="@/static/svg/dots.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    allVehicleData: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
