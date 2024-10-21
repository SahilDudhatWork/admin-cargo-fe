<template>
  <div>
    <div
      @click="$emit('selectCarrier')"
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
                {{ allCarrierData?.contactName }}
              </h1>
              <div>
                <h1
                  @click.stop="$emit('handleVerify', allCarrierData)"
                  :class="
                    allCarrierData?.verifyByAdmin
                      ? 'bg-[#3ECC48]'
                      : 'bg-[#D1D1D1]'
                  "
                  class="text-[#FEFEFE] font-medium text-[10px] px-2.5 rounded py-[1px]"
                >
                  {{ allCarrierData?.verifyByAdmin ? "Verified" : "Verify" }}
                </h1>
              </div>
            </div>
            <p class="text-[#414141] font-light text-xs">
              {{ allCarrierData?.email }}
            </p>
            <p class="text-[#414141] font-light text-xs">
              + {{ allCarrierData?.countryCode }}
              {{ allCarrierData?.contactNumber }}
            </p>
          </div>
          <div class="mt-4">
            <img src="@/static/svg/dots.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="bg-[#EEEEEE] h-[1px] w-full mt-5 mb-5"></div>
      <div class="grid grid-cols-2">
        <div>
          <h1 class="text-[#989898] font-normal text-xs">Company Name</h1>

          <p class="text-[#1E1E1E] font-light text-xs">
            {{ allCarrierData?.companyName }}
          </p>
        </div>
        <div>
          <h1 class="text-[#989898] font-normal text-xs">Created Date</h1>

          <p class="text-[#1E1E1E] font-light text-xs">
            {{ $moment(allCarrierData?.createdAt).format("DD-MM-YYYY") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    allCarrierData: {
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
