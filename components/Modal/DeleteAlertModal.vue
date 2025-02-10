<template>
  <div style="z-index: 999" class="fixed top-0 w-full lef-0">
    <div class="fixed inset-0" v-if="isModal">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 transition-opacity" @click="closeModal">
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div class="max-w-4xl mx-auto z-50 bg-white rounded-md">
          <div
            class="flex items-center justify-between my-1 border-b border-gray-200"
          >
            <div class="flex items-center gap-1 mx-2">
              <svg
                class="text-gray-400 w-6 h-6 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p class="text-[#111111] font-normal text-lg">Delete Item</p>
            </div>
            <svg
              @click="closeModal"
              aria-hidden="true"
              class="text-gray-400 w-8 h-8 mb-3.5 mr-2 mt-2 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div class="flex overflow-hidden w-[33rem] flex-col">
            <div>
              <svg
                class="text-gray-400 w-11 h-11 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div class="flex-3 justify-center mt-3">
              <p
                class="text-[#111111] font-normal text-lg flex justify-center mb-3"
              >
                Are you sure you want to delete this item?
              </p>
              <div
                class="flex gap-3 justify-end border-t border-gray-200 pt-5 mb-4"
              >
                <button
                  @click="closeModal"
                  type="button"
                  class="border border-gray-400 text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400 font-medium !rounded-xl text-lg px-5 py-2 text-center"
                >
                  No, cancel
                </button>
                <button
                  @click="handleSubmit"
                  type="button"
                  class="mx-5 text-white bg-gradient-to-r from-red-600 to-red-500 font-medium rounded-lg text-lg px-5 py-2 text-center"
                >
                  Yes, I'm sure
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
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleSubmit() {
      this.$emit("handleSubmit");
    },
  },
};
</script>
