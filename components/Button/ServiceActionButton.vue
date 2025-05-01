<template>
  <div>
    <div>
      <button
        :class="
          activeButton === 'Pending'
            ? 'bg-[#3683D5] text-white'
            : 'bg-[#E6F0FA] text-[#4B4B4B]'
        "
        @click="actionButton('Pending')"
        class="rounded-lg font-medium text-[12px] py-[5px] px-3"
      >
        Requests
      </button>
      <button
        :class="
          activeButton === 'InProgress'
            ? 'bg-[#3683D5] text-white'
            : 'bg-[#E6F0FA] text-[#4B4B4B]'
        "
        @click="actionButton('InProgress')"
        class="rounded-lg font-medium text-[12px] py-[5px] px-[15px]"
      >
        In-Progress
      </button>
      <button
        :class="
          activeButton === 'Completed'
            ? 'bg-[#3683D5] text-white'
            : 'bg-[#E6F0FA] text-[#4B4B4B]'
        "
        @click="actionButton('Completed')"
        class="rounded-lg font-medium text-[12px] py-[5px] px-[15px]"
      >
        Completed
      </button>
      <button
        :class="
          activeButton === 'Verified'
            ? 'bg-[#3683D5] text-white'
            : 'bg-[#E6F0FA] text-[#4B4B4B]'
        "
        @click="actionButton('Verified')"
        class="rounded-lg font-medium text-[12px] py-[5px] px-[15px]"
      >
        Verified
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeButton: "Pending",
    };
  },
  methods: {
    actionButton(type) {
      this.activeButton = type;
      this.$emit("add", type);
    },
  },
};
</script>
