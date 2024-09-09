<template>
  <div class="relative h-screen">
    <div class="flex xl:mx-auto lg:mx-20 mx-5 justify-center xl:gap-10 gap-20">
      <div class="flex-1 flex justify-center">
        <div>
          <img src="@/static/Images/logo.webp" alt="" class="w-40 h-16 mt-24" />
          <slot name="modalContent"></slot>
          <img
            src="@/static/Images/Freestyle.webp"
            alt=""
            class="-z-50 absolute left-0 w-[55%] bottom-2 lg:block hidden"
          />
        </div>
      </div>
      <div class="lg:block hidden flex-1 relative h-screen">
        <img
          src="@/static/Images/slide-image.webp"
          alt=""
          class="absolute inset-0 w-full h-full object-cover z-50"
        />
      </div>
    </div>
  </div>
</template>
