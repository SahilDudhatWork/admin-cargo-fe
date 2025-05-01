<template>
  <div style="z-index: 999" class="fixed top-0 w-full lef-0">
    <div class="fixed inset-0 mt-10" v-if="isModal">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 transition-opacity" @click="closeModal">
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div
          class="max-w-4xl lg:mx-auto z-50 bg-white rounded-lg w-[864px] py-1 px-3 mx-3 h-auto"
        >
          <div
            class="flex flex-col items-end my-1 cursor-pointer"
            @click="closeModal"
          >
            <img src="@/static/Images/close.webp" alt="" />
          </div>
          <div>
            <slot name="content"></slot>
          </div>
          <div class="flex justify-end gap-3 mt-3 mb-2 mr-5">
            <button
              v-if="isBackAssign"
              type="submit"
              @click="$emit('backAssign')"
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[20px] w-[120px] py-[7px] text-center focus:outline-none"
            >
              Back
            </button>
            <button
              type="submit"
              :disabled="isDisabled || !isSelected"
              @click="$emit('handleAssign')"
              :class="
                isDisabled || !isSelected
                  ? 'bg-[#82b5d4] cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#0464CB] to-[#2AA1EB]'
              "
              class="text-white font-medium rounded-lg text-[20px] w-[120px] py-[7px] text-center focus:outline-none"
            >
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    isModal: {
      type: Boolean,
      required: true,
    },
    isBackAssign: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      default: "Assign",
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
