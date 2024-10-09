<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        PORT & BRIDGE
      </h1>
    </div>
    <div>
      <OptionList
        labelText="Port & Bridge list"
        buttonText="Add Port & Bridge"
        listWidth="80%"
        @add="addPortBridge"
      />
    </div>
    <div class="mt-6">
      <PortBridgeTable
        :allData="allPortBridgeData"
        @deleteItem="removePortBridge"
        @handleClick="editPortBridge"
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
      allPortBridgeData: [],
    };
  },
  methods: {
    ...mapActions({
      fetchPortBridge: "transitinfo/fetchPortBridge",
      deletePortBridge: "transitinfo/deletePortBridge",
    }),
    editPortBridge(item) {
      this.$router.push(`port-bridge/edit-port-bridge/${item._id}`);
    },
    addPortBridge() {
      this.$router.push("/port-bridge/add-port-bridge");
    },
    closeModal() {
      this.isModal = false;
    },
    async handleDelete() {
      try {
        const res = await this.deletePortBridge({
          id: this.selectedId,
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
    async removePortBridge(id) {
      this.isModal = true;
      this.selectedId = id;
    },
    async getTransitInfo() {
      try {
        const res = await this.fetchPortBridge();
        this.allPortBridgeData = res?.data;
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
