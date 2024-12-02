<template>
  <div>
    <div>
      <div>
        <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
          SUB ADMIN
        </h1>
      </div>
      <div>
        <OptionList
          labelText="Sub Admin list"
          buttonText="Add Sub Admin"
          listWidth="88%"
          @add="addSubAdmin"
          :isAddBtn="checkPermission?.add"
        />
      </div>
      <div>
        <SubAdminTable
          :allData="allSubAdminData"
          @deleteItem="removeSubAdmin"
          @handleClick="editSubAdmin"
        />
        <DeleteAlertModal
          :isModal="isModal"
          @handleSubmit="handleDelete"
          @close="closeModal"
        />
      </div>
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
    };
  },
  computed: {
    ...mapGetters({
      allSubAdminData: "sub-admin/getAllSubAdminData",
      getSinglePermission: "auth/getSinglePermission",
    }),
    checkPermission() {
      return this.getSinglePermission("Sub Admin");
    },
  },
  methods: {
    ...mapActions({
      fetchAllSubAdmin: "sub-admin/fetchAllSubAdmin",
      deleteSubAdmin: "sub-admin/deleteSubAdmin",
    }),
    async getAllSubAdmin() {
      try {
        await this.fetchAllSubAdmin();
      } catch (error) {
        console.log(error);
      }
    },
    editSubAdmin(item) {
      this.$router.push(`sub-admin/edit-sub-admin/${item._id}`);
    },
    addSubAdmin() {
      this.$router.push("/sub-admin/add-sub-admin");
    },
    async handleDelete() {
      try {
        const response = await this.deleteSubAdmin({
          id: this.selectedId,
        });
        this.$toast.open({
          message: response.msg,
        });
        this.isModal = false;
        await this.getAllSubAdmin();
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    closeModal() {
      this.isModal = false;
    },
    async removeSubAdmin(id) {
      this.isModal = true;
      this.selectedId = id;
    },
  },
  async mounted() {
    await this.getAllSubAdmin();
  },
};
</script>
