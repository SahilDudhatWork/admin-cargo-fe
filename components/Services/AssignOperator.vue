<template>
  <div>
    <div
      @click="$emit('selectOperator')"
      class="xxl:w-[384px] w-full h-[184px] py-3 px-3 rounded-lg cursor-pointer"
      :class="
        isSelected ? 'border border-[#3683D5]' : 'border border-[#E7E7E7] '
      "
    >
      <div class="flex gap-3 mt-2">
        <div>
          <img src="@/static/Images/truck-circle-img.webp" alt="" />
        </div>
        <div class="flex w-full justify-between">
          <div>
            <div class="flex gap-3">
              <h1 class="text-[#1E1E1E] font-medium text-sm">
                {{ allOperatorData?.operatorName }}
              </h1>
              <div>
                <h1
                  :class="
                    allOperatorData?.status == 'Active'
                      ? 'bg-[#3ECC48]'
                      : 'bg-[#D1D1D1]'
                  "
                  class="text-[#FEFEFE] font-medium text-[10px] px-2.5 rounded py-[1px]"
                >
                  {{
                    allOperatorData?.status == "Active"
                      ? "AVAILABLE"
                      : "INACTIVE"
                  }}
                </h1>
              </div>
            </div>
            <p class="text-[#414141] font-light text-xs">
              + {{ allOperatorData?.countryCode }}
              {{ allOperatorData?.operatorNumber }}
            </p>
          </div>
        </div>
      </div>
      <div class="bg-[#EEEEEE] h-[1px] w-full mt-5 mb-5"></div>
      <div class="grid grid-cols-2">
        <div>
          <h1 class="text-[#989898] font-normal text-xs">License Number</h1>

          <p class="text-[#1E1E1E] font-light text-xs">
            {{ allOperatorData?.mxDriversLicense }}
          </p>
        </div>
        <div>
          <h1 class="text-[#989898] font-normal text-xs">License validity</h1>

          <p class="text-[#1E1E1E] font-light text-xs">
            {{
              $moment(allOperatorData?.mxDriversLicenseExpirationDate).format(
                "DD-MM-YYYY"
              )
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    allOperatorData: {
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
