<template>
  <div>
    <div>
      <div class="flex justify-between mb-2">
        <h1 class="text-[#B9B9B9] text-[10px] font-semibold">
          SERVICE DETAILS
        </h1>
        <span
          :class="
            serviceSingleData?.status == 'Pending'
              ? 'bg-[#FFAA00]'
              : 'bg-[#3ECC48]'
          "
          class="text-[#FEFEFE] font-medium text-[10px] rounded px-[17px] py-[1px]"
          >{{ formatStatus(serviceSingleData) }}</span
        >
      </div>
      <div class="flex mb-3 gap-1">
        <p class="text-[#1E1E1E] font-medium text-sm">
          {{
            $moment(serviceSingleData?.createdAt)
              .locale("en")
              .format(" MMM,DD dddd YYYY")
          }}
        </p>
        <span
          class="text-[#FEFEFE] bg-[#3683D5] rounded px-4 py-0.5 text-[10px]"
          >{{ serviceSingleData?.typeOfService?.title }}</span
        >
      </div>
      <div class="grid grid-cols-2 gap-y-3">
        <div>
          <p class="text-[#1E1E1E] font-medium text-sm">Movement ID</p>
          <p class="text-[#686868] font-normal text-xs">
            {{ serviceSingleData?.movementId }}
          </p>
        </div>
        <div v-if="serviceSingleData?.programming !== 'Instant'">
          <p class="text-[#1E1E1E] font-medium text-sm">Scheduled Time</p>
          <p class="text-[#686868] font-normal text-xs">
            {{
              $moment(serviceSingleData?.schedule?.date)
                .locale("en")
                .format(" MMM,DD dddd YYYY")
            }}
            {{ serviceSingleData?.schedule?.time }}
          </p>
        </div>
        <div>
          <p class="text-[#1E1E1E] font-medium text-sm">Special Requirement</p>
          <div class="flex flex-wrap gap-2 mt-1">
            <p
              class="bg-[#0060C91A] px-2.5 rounded-[100px] flex items-center py-[2px]"
              v-for="(item, index) in serviceSingleData?.specialRequirements"
              :key="index"
            >
              <span class="text-[#0060C9] text-[10px] font-semibold">
                {{ item?.type }}
              </span>
            </p>
          </div>
        </div>
        <div>
          <p class="text-[#1E1E1E] font-medium text-sm">Bridge of crossing</p>
          <p class="text-[#686868] font-normal text-xs">
            {{ serviceSingleData?.port_BridgeOfCrossing }}
          </p>
        </div>
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
  computed: {
    formatStatus() {
      return (item) => {
        if (!item) return "";

        if (item.status === "Pending") {
          return "PENDING";
        } else if (item.status === "InProgress") {
          return "IN-PROGRESS";
        } else if (item.status === "Completed") {
          return "COMPLETED";
        } else {
          return item.status;
        }
      };
    },
  },
};
</script>
