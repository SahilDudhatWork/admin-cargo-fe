<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        ROLES
      </h1>
    </div>
    <div>
      <OptionList
        labelText="Role list"
        buttonText="Add Role"
        listWidth="92%"
        @add="addRole"
        :isAddBtn="checkPermission?.add"
      />
    </div>
    <div>
      <ManageRoleTable
        :allData="allRoleData"
        @deleteItem="removeRole"
        @handleClick="editRole"
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
    };
  },
  computed: {
    ...mapGetters({
      allRoleData: "role/getAllRoleData",
      getSinglePermission: "auth/getSinglePermission",
    }),
    checkPermission() {
      return this.getSinglePermission("Manage Role");
    },
  },
  methods: {
    ...mapActions({
      fetchAllRoles: "role/fetchAllRoles",
      deleteRole: "role/deleteRole",
    }),
    async getAllRole() {
      try {
        await this.fetchAllRoles();
      } catch (error) {
        console.log(error);
      }
    },
    editRole(item) {
      this.$router.push(`manage-role/edit-role/${item._id}`);
    },
    addRole() {
      this.$router.push("/manage-role/add-role");
    },
    async handleDelete() {
      try {
        const response = await this.deleteRole({ id: this.selectedId });
        this.$toast.open({
          message: response.msg,
        });
        this.isModal = false;
        await this.getAllRole();
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
    async removeRole(id) {
      this.isModal = true;
      this.selectedId = id;
    },
  },
  async mounted() {
    await this.getAllRole();
  },
};
</script>
