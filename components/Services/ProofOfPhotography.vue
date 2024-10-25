<template>
  <div>
    <div>
      <h1 class="text-[#B9B9B9] font-semibold text-[10px]">
        Proof Of Photography
      </h1>
      <div
        class="grid sm:grid-cols-2 grid-cols-1 gap-y-4 mt-4 gap-5 px-5 w-[70%]"
      >
        <img
          :src="serviceSingleData?.proofOfPhotography"
          alt=""
          class="rounded-lg w-[400px] h-[250px]"
        />
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
