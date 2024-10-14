<template>
  <div>
    <div
      class="bg-[#F5F9FD] py-3 w-[326px] px-4 flex justify-between items-center rounded-lg"
    >
      <div>
        <h1 class="text-[#1E1E1E] font-medium text-xs">
          {{ title }}
        </h1>
        <p class="text-[#4B4B4B] font-light text-xs">
          {{ description }}
        </p>
      </div>
      <div>
        <label>
          <img src="@/static/svg/download.svg" alt="" class="cursor-pointer" />
          <input type="file" class="hidden" />
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>
