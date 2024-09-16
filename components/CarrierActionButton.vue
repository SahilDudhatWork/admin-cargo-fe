<template>
  <div>
    <div>
      <button
        :class="
          activeButton === 'all'
            ? 'bg-[#3683D5] text-white'
            : 'bg-[#E6F0FA] text-[#4B4B4B]'
        "
        class="rounded-lg font-medium text-[12px] py-[5px] px-3"
        @click="actionButton('all')"
      >
        All
      </button>
      <!-- <button
        :class="
          activeButton === 'recent'
            ? 'bg-[#3683D5] text-white'
            : 'bg-[#E6F0FA] text-[#4B4B4B]'
        "
        class="rounded-lg font-medium text-[12px] py-[5px] px-4"
        @click="actionButton('recent')"
      >
        Newly added Carriers
      </button> -->
      <button
        :class="
          activeButton === 'blocked'
            ? 'bg-[#3683D5] text-white'
            : 'bg-[#E6F0FA] text-[#4B4B4B]'
        "
        class="rounded-lg font-medium text-[12px] py-[5px] px-[15px]"
        @click="actionButton('blocked')"
      >
        Blocked Carriers
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeButton: "all",
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
