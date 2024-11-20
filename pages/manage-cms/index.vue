<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        CMS
      </h1>
    </div>
    <div>
      <OptionList
        labelText="Cms list"
        buttonText="Add Cms"
        listWidth="92%"
        @add="addArea"
      />
    </div>
    <div class="mt-4">
      <CmsTable
        :allData="allCmsData"
        @deleteItem="removeCms"
        @handleClick="editCms"
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
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      isModal: false,
      allCmsData: [],
    };
  },
  methods: {
    ...mapActions({
      fetchAllCms: "cms/fetchAllCms",
      deleteCms: "cms/deleteCms",
    }),
    editCms(id) {
      this.$router.push(`manage-cms/edit-cms/${id}`);
    },
    addArea() {
      this.$router.push("/manage-cms/add-cms");
    },
    closeModal() {
      this.isModal = false;
    },
    async handleDelete() {
      try {
        const res = await this.deleteCms({
          id: this.selectedId,
        });
        this.$toast.open({
          message: res.msg,
        });
        await this.getCms();
        this.isModal = false;
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    removeCms(id) {
      this.isModal = true;
      this.selectedId = id;
    },
    async getCms() {
      try {
        const res = await this.fetchAllCms();
        this.allCmsData = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    try {
      await this.getCms();
    } catch (error) {
      console.log(error);
      this.$toast.open({
        message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
        type: "error",
      });
    }
  },
};
</script>
