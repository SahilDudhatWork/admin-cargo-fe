<template>
  <div>
    <div class="mt-6 grid grid-cols-2 w-[65%] gap-5">
      <div
        class="border border-[#E6E6E6] px-5 rounded-lg"
        v-for="(item, key) in carrierItems"
        :key="key"
      >
        <div class="flex justify-between gap-3 border-b border-[#E6E6E6] py-5">
          <div class="flex gap-4">
            <img :src="item.image" alt="" class="rounded-full" />
            <div>
              <h1 class="text-[#1E1E1E] font-medium text-sm">
                {{ item.title }}
              </h1>
              <p class="text-[#4B4B4B] text-[12px] font-light">
                ID : {{ item.id }}
              </p>
              <p class="text-[#4B4B4B] text-[12px] font-light">
                {{ item.email }}
              </p>
            </div>
          </div>
          <img src="@/static/svg/dots.svg" alt="" class="cursor-pointer" />
        </div>
        <div class="pb-5 border-b border-[#E6E6E6]">
          <div class="mt-4">
            <p class="text-[#1E1E1E] font-medium text-[12px]">Contact Number</p>
            <p class="text-[#1E1E1E] font-normal text-[12px]">
              {{ item.contactNumber }}
            </p>
          </div>
          <div class="mt-4">
            <p class="text-[#1E1E1E] font-medium text-[12px]">
              Company Address
            </p>
            <p class="text-[#1E1E1E] font-medium text-[12px] max-w-[330px]">
              {{ item.companyAddress }}
            </p>
          </div>
        </div>
        <div>
          <h1 class="text-[#151515] font-normal text-[12px]">Operators</h1>
          <div class="border border-[#E6E6E6] p-4 rounded-lg mt-2">
            <div class="flex justify-between">
              <p class="font-medium text-sm text-[#1E1E1E]">
                {{ item.operators }} Operators
              </p>
              <button
                class="text-transparent bg-clip-text bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium text-[12px]"
              >
                <span class="text-[#0464CB]">+ </span>Add operator
              </button>
            </div>
            <div class="flex gap-28">
              <div class="mt-2">
                <p class="text-[#686868] font-light text-[12px]">
                  Active operators
                </p>
                <p class="text-[#151515] font-medium font-sm">
                  {{ item.activeOperators }}
                </p>
              </div>
              <div class="mt-2">
                <p class="text-[#686868] font-light text-[12px]">
                  Out of duty operators
                </p>
                <p class="text-[#151515] font-medium font-sm">
                  {{ item.dutyOperators }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-5">
          <h1 class="text-[#151515] font-normal text-[12px]">Vehicles</h1>
          <div class="border border-[#E6E6E6] p-4 rounded-lg mt-2">
            <div class="flex justify-between">
              <p class="font-medium text-sm text-[#1E1E1E]">
                {{ item.vehicles }} Vehicles
              </p>
              <button
                class="text-transparent bg-clip-text bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium text-[12px]"
              >
                <span class="text-[#0464CB]">+ </span>Add vehicle
              </button>
            </div>
            <div class="flex gap-28">
              <div class="mt-2">
                <p class="text-[#686868] font-light text-[12px]">
                  Active vehicles
                </p>
                <p class="text-[#151515] font-medium font-sm">
                  {{ item.activeVehicles }}
                </p>
              </div>
              <div class="mt-2">
                <p class="text-[#686868] font-light text-[12px]">
                  Out of duty vehicles
                </p>
                <p class="text-[#151515] font-medium font-sm">
                  {{ item.dutyVehicles }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import truckImage from "@/static/Images/truck-image.webp";
export default {
  data() {
    return {
      carrierItems: [
        {
          image: truckImage,
          title: "Zayro Logistics",
          id: "1235532344",
          email: "louisvenom07@example.work",
          contactNumber: "+33 67544 58353",
          companyAddress:
            "Menlo Park, CA 94025, USA Lorem ipsum dolor sit amet consectetur, Vitae netus ",
          operators: "34",
          activeOperators: "12",
          dutyOperators: "22",
          vehicles: "19",
          activeVehicles: "15",
          dutyVehicles: "4",
        },
        {
          image: truckImage,
          title: "Zayro Logistics",
          id: "1235532344",
          email: "louisvenom07@example.work",
          contactNumber: "+33 67544 58353",
          companyAddress:
            "Menlo Park, CA 94025, USA Lorem ipsum dolor sit amet consectetur, Vitae netus ",
          operators: "34",
          activeOperators: "12",
          dutyOperators: "22",
          vehicles: "19",
          activeVehicles: "15",
          dutyVehicles: "4",
        },
        {
          image: truckImage,
          title: "Zayro Logistics",
          id: "1235532344",
          email: "louisvenom07@example.work",
          contactNumber: "+33 67544 58353",
          companyAddress:
            "Menlo Park, CA 94025, USA Lorem ipsum dolor sit amet consectetur, Vitae netus ",
          operators: "34",
          activeOperators: "12",
          dutyOperators: "22",
          vehicles: "19",
          activeVehicles: "15",
          dutyVehicles: "4",
        },
        {
          image: truckImage,
          title: "Zayro Logistics",
          id: "1235532344",
          email: "louisvenom07@example.work",
          contactNumber: "+33 67544 58353",
          companyAddress:
            "Menlo Park, CA 94025, USA Lorem ipsum dolor sit amet consectetur, Vitae netus ",
          operators: "34",
          activeOperators: "12",
          dutyOperators: "22",
          vehicles: "19",
          activeVehicles: "15",
          dutyVehicles: "4",
        },
      ],
    };
  },
};
</script>
