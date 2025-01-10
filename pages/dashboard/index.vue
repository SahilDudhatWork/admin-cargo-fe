<template>
  <div>
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
      <div>
        <div
          class="flex items-center justify-between lg:flex-row flex-col gap-y-3"
        >
          <h1 class="text-[#1E1E1E] font-normal text-sm">Requests</h1>
          <div>
            <StaticDropdown
              :items="listData"
              :selectedLabel="selectedLabel"
              @getValue="getValue"
            />
          </div>
          <div>
            <Vue2DateRangePicker
              ref="picker"
              :opens="'center'"
              :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy' }"
              :minDate="minDate"
              :singleDatePicker="'range'"
              :showWeekNumbers="false"
              :showDropdowns="true"
              :autoApply="true"
              :ranges="false"
              :linkedCalendars="true"
              :alwaysShowCalendars="true"
              :appendToBody="false"
              :closeOnEsc="true"
              v-model="dateRange"
              @update="updateValues"
              @toggle="logEvent('event: open', $event)"
              @start-selection="handleStartSelection"
              @finish-selection="handleFinishSelection"
              @input="getDate"
            />
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center gap-3">
            <h1 class="text-[#11263C] font-semibold text-2xl">
              {{ activityData?.services?.total }}
            </h1>
            <h1 class="text-[#1E1E1E4D] text-sm font-normal">Total</h1>
          </div>
        </div>
        <div class="mt-5 flex items-center gap-20">
          <div>
            <div class="bg-[#CECECE] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">verify</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ filteredActivityData?.completed }}
            </h1>
          </div>
          <div>
            <div class="bg-[#999999] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">unverify</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ filteredActivityData?.inProgress }}
            </h1>
          </div>
          <div>
            <div class="bg-[#EFEFEF] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">Total</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ filteredActivityData?.total }}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-[#1E1E1E] font-normal text-sm mt-4">Carriers</h1>
        <div class="mt-4">
          <div class="flex items-center gap-3">
            <h1 class="text-[#11263C] font-semibold text-2xl">
              {{ activityData?.carriers?.total }}
            </h1>
            <h1 class="text-[#1E1E1E4D] text-sm font-normal">Total</h1>
          </div>
        </div>
        <div class="mt-5 flex items-center gap-20">
          <div>
            <div class="bg-[#CECECE] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">verify</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.carriers?.verify }}
            </h1>
          </div>
          <div>
            <div class="bg-[#999999] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">unverify</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.carriers?.unverify }}
            </h1>
          </div>
          <div>
            <div class="bg-[#EFEFEF] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">Total</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.carriers?.total }}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-[#1E1E1E] font-normal text-sm mt-4">Operators</h1>
        <div class="mt-4">
          <div class="flex items-center gap-3">
            <h1 class="text-[#11263C] font-semibold text-2xl">
              {{ activityData?.operators?.total }}
            </h1>
            <h1 class="text-[#1E1E1E4D] text-sm font-normal">Total</h1>
          </div>
        </div>
        <div class="mt-5 flex items-center gap-20">
          <div>
            <div class="bg-[#CECECE] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">verify</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.operators?.active }}
            </h1>
          </div>
          <div>
            <div class="bg-[#999999] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">unverify</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.operators?.deactive }}
            </h1>
          </div>
          <div>
            <div class="bg-[#EFEFEF] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">Total</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.operators?.total }}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-[#1E1E1E] font-normal text-sm mt-4">Users</h1>
        <div class="mt-4">
          <div class="flex items-center gap-3">
            <h1 class="text-[#11263C] font-semibold text-2xl">
              {{ activityData?.users?.total }}
            </h1>
            <h1 class="text-[#1E1E1E4D] text-sm font-normal">Total</h1>
          </div>
        </div>
        <div class="mt-5 flex items-center gap-20">
          <div>
            <div class="bg-[#CECECE] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">verify</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.users?.verify }}
            </h1>
          </div>
          <div>
            <div class="bg-[#999999] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">unverify</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.users?.unverify }}
            </h1>
          </div>
          <div>
            <div class="bg-[#EFEFEF] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">Total</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.users?.total }}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-[#1E1E1E] font-normal text-sm mt-4">Vehicles</h1>
        <div class="mt-4">
          <div class="flex items-center gap-3">
            <h1 class="text-[#11263C] font-semibold text-2xl">
              {{ activityData?.vehicles?.total }}
            </h1>
            <h1 class="text-[#1E1E1E4D] text-sm font-normal">Total</h1>
          </div>
        </div>
        <div class="mt-5 flex items-center gap-20">
          <div>
            <div class="bg-[#CECECE] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">verify</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.vehicles?.active }}
            </h1>
          </div>
          <div>
            <div class="bg-[#999999] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">unverify</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.vehicles?.deactive }}
            </h1>
          </div>
          <div>
            <div class="bg-[#EFEFEF] h-[4px] w-[30px] rounded-[100px]"></div>
            <h1 class="mt-2 text-[#4B4B4B] text-sm font-normal">Total</h1>
            <h1 class="mt-1 text-[#11263C] text-base font-medium">
              {{ activityData.vehicles?.total }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      selectedLabel: "This Month",
      listData: [
        {
          label: "This Month",
        },
        {
          label: "This Week",
        },
        {
          label: "This Day",
        },
      ],
      date: new Date(),
      dateRange: { startDate: null, endDate: null },
      minDate: new Date("2023-01-01"),
      activityData: {},
    };
  },
  computed: {
    filteredActivityData() {
      if (this.dateRange.startDate != null && this.dateRange.endDate != null) {
        return this.activityData.services;
      }
      if (this.selectedLabel === "This Month") {
        return this.activityData.last_Month_Recap;
      } else if (this.selectedLabel === "This Week") {
        return this.activityData.last_Week_Recap;
      } else if (this.selectedLabel === "This Day") {
        return this.activityData.last_Day_Recap;
      }
      return {};
    },
  },
  methods: {
    ...mapActions({
      fetchActivity: "services/fetchActivity",
    }),
    getValue(item) {
      this.selectedLabel = item.label;
    },
    async updateValues() {
      const startDate = this.$moment(this.dateRange.startDate)
        .locale("en")
        .format("YYYY-MM-DD");
      const endDate = this.$moment(this.dateRange.endDate)
        .locale("en")
        .format("YYYY-MM-DD");
      try {
        const res = await this.fetchActivity({
          startDate: startDate,
          endDate: endDate,
        });
        this.activityData = res.data;
      } catch (error) {
        console.log(error, "error`");
      }
    },
    logEvent(event, data) {
      console.log(event, data);
    },
    getDate() {
      this.$emit("getDate", this.date);
    },
    handleFinishSelection(event) {
      const endDate = new Date(event);
      let endDateFormatted = endDate;
      this.date = {
        startDate: `${this.date}`,
        endDate: `${endDateFormatted}`,
      };
      this.getDate();
    },
    handleStartSelection(event) {
      const startDate = new Date(event);
      this.date = startDate;
    },
    async getActivity() {
      try {
        const res = await this.fetchActivity();
        this.activityData = res.data;
      } catch (error) {
        console.log(error, "error`");
      }
    },
  },
  mounted() {
    this.getActivity();
    this.$nextTick(() => {
      const pickerElement = this.$refs.picker.$el;
      //   const textElement = pickerElement.querySelector(
      //     ".form-control.reportrange-text"
      //   );
      //   if (textElement) {
      //     textElement.style.display = "none";
      //   }
      const content = pickerElement.querySelector(".daterangepicker .single");

      const text = pickerElement.querySelector(".table-condensed");
      //   const calendars = pickerElement.querySelector(".calendars");
      //   const daterangepicker = pickerElement.querySelector(
      //     ".daterangepicker .calendars-container"
      //   );
      //   if (calendars) calendars.style.display = "block";
      //   if (daterangepicker) daterangepicker.style.display = "block";

      if (content) {
        content.style.width = "316px";
        content.style.maxWidth = "none";
      }
      if (text) {
        text.style.height = "386px";
      }

      //   this.$refs.picker.open = true;
    });
  },
};
</script>
