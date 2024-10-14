<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        MODE OF TRANSPORTATION
      </h1>
    </div>
    <div>
      <OptionList
        labelText="Mode Of Transportation list"
        buttonText="Add Mode Of Transportation"
        listWidth="78%"
        @add="addModeOfTransportation"
      />
    </div>
    <div class="mt-6">
      <ModeOfTransportationTable
        :allData="flattenedData"
        @deleteItem="removeModeOfTransportation"
        @handleClick="editModeOfTransportation"
      />
      <DeleteAlertModal
        :isModal="isModal"
        @handleSubmit="handleDelete"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      isModal: false,
      allModeOfTransportationData: {},
      flattenedData: [],
    };
  },
  methods: {
    ...mapActions({
      fetchTransitInfo: "transitinfo/fetchTransitInfo",
      deleteModeOfTransportation: "transitinfo/deleteModeOfTransportation",
    }),
    editModeOfTransportation(id) {
      this.$router.push(
        `/manage-mode-of-transportation/edit-modeOfTransportation/${id}`
      );
    },
    addModeOfTransportation() {
      this.$router.push(
        "/manage-mode-of-transportation/add-modeOfTransportation"
      );
    },
    async handleDelete() {
      try {
        for (const key in this.allModeOfTransportationData) {
          const foundItem = this.allModeOfTransportationData[key].find(
            (item) => item._id === this.selectedId
          );
          if (foundItem) {
            this.selectedMode = key;
          }
        }
        const res = await this.deleteModeOfTransportation({
          id: this.selectedId,
          transportationLabel: this.selectedMode,
        });
        this.$toast.open({
          message: res.msg,
        });
        await this.getTransitInfo();
        this.isModal = false;
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    closeModal() {
      this.isModal = false;
    },
    async removeModeOfTransportation(id) {
      this.isModal = true;
      this.selectedId = id;
    },
    flattenTransportationData() {
      const flattenedArray = [];

      for (const key in this.allModeOfTransportationData) {
        const modeData = this.allModeOfTransportationData[key];

        modeData.forEach((item) => {
          flattenedArray.push({ ...item, mode: key });
        });
      }
      this.flattenedData = flattenedArray;
    },
    async getTransitInfo() {
      try {
        const res = await this.fetchTransitInfo();
        this.allModeOfTransportationData = res?.data?.modeOfTransportation;
        this.flattenTransportationData();
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getTransitInfo();
  },
};
</script>
