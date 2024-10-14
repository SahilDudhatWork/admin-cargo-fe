<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        AREA
      </h1>
    </div>
    <div>
      <OptionList
        labelText="Area list"
        buttonText="Add Area"
        listWidth="86%"
        @add="addArea"
      />
    </div>
    <div class="mt-4">
      <AreaTable
        :allData="allArea"
        @deleteItem="deleteAreaConfirm"
        @handleClick="editArea"
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
      allArea: [],
      selectedId: "",
    };
  },
  methods: {
    ...mapActions({
      fetchAreas: "coordinate/fetchAreas",
      deleteArea: "coordinate/deleteArea",
    }),
    editArea(id) {
      this.$router.push(`manage-area/edit-area/${id}`);
    },
    addArea() {
      this.$router.push("/manage-area/add-area");
    },
    closeModal() {
      this.isModal = false;
    },
    async handleDelete() {
      try {
        const res = await this.deleteArea({
          id: this.selectedId,
        });
        this.$toast.open({
          message: res.msg,
        });
        await this.getAreas();
        this.isModal = false;
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    deleteAreaConfirm(id) {
      this.isModal = true;
      this.selectedId = id;
    },
    async getAreas() {
      try {
        const res = await this.fetchAreas();
        this.allArea = res?.data.response;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getAreas();
  },
};
</script>
