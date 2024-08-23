<template>
    <div>
        <div class="flex justify-between w-[65%] items-center">
            <p class="text-sm text-[#151515] font-normal">{{labelText}}</p>
            <div class="h-full mx-1 border border-[#E6E6E6]" :style="{width:listWidth}"></div>
            <button class="text-transparent bg-clip-text bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium text-[12px] focus:ring-none" @click="handleClick"><span class="text-[#0464CB]">+ </span>{{buttonText}}</button>
        </div>
    </div>
</template>

<script>
export default{
  props:{
    labelText: {
      type: String,
      default: '',
      required:true
    },
    buttonText: {
      type: String,
      default: '',
      required:true
    },
    listWidth: {
      type: String,
      default: '88%',
      required:true
    },

  },
  methods: {
    handleClick(){
      this.$emit('add')
    }
  },
}
</script>