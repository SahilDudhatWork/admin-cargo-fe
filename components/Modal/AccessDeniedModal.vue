<template>
  <div style="z-index: 999" class="fixed top-0 w-full lef-0">
    <div class="fixed inset-0 mt-10" v-if="isModal">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 transition-opacity" @click="closeModal">
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div class="max-w-4xl mx-auto z-50 bg-white rounded-md">
          <div
            class="flex flex-col items-end mx-2 my-1 cursor-pointer"
            @click="closeModal"
          >
            <img src="@/static/Images/close.webp" alt="" />
          </div>
          <div class="flex overflow-hidden px-5 w-[42rem]">
            <div>
              <img src="@/static/Images/cancle.webp" class="object-cover" />
            </div>
            <div class="flex-3">
              <h1 class="text-[2rem] font-semibold text-[#3683D5]">
                Access Denied
              </h1>
              <p class="text-[#111111] font-normal text-xl max-w-[400px]">
                Seems your request denied by the carrier, thanks for being
                patience. Try contacting to carrier.
              </p>
              <div class="flex gap-3 mt-5 mb-8">
                <button
                  type="submit"
                  class="w-full text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[20px] px-5 py-[13px] text-center"
                >
                  Continue
                </button>
                <button
                  type="submit"
                  class="w-full border border-[#0464CB] text-transparent bg-clip-text bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium !rounded-xl text-[20px] px-5 py-[13px] text-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModal: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
