<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/manage-role">ROLE</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          EDIT ROLE
        </p>
      </div>
      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="editRole">
        <div>
          <div>
            <label
              for="Role Title"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Role Title *</label
            >
            <input
              type="text"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none border"
              placeholder="Your role-title"
              v-model="formData.roleTitle"
              :class="
                errors?.roleTitle
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
            />
            <span class="error-msg" v-if="errors?.roleTitle">{{
              errors?.roleTitle
            }}</span>
          </div>
          <div
            class="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 sm:gap-4 lg:gap-4 mt-7"
            v-for="(item, key) in menuAccessData"
            :key="key"
          >
            <label
              for="menuTitle"
              class="block text-sm font-normal text-[#4B4B4B]"
              >{{ item?.menuTitle }}
            </label>
            <div class="flex items-center">
              <label
                :for="`add-${item.menuTitle}`"
                class="block text-sm font-normal text-[#4B4B4B] pr-4"
                >Add</label
              >
              <input
                type="checkbox"
                class="text-gray-900 rounded-lg blockpx-3 py-[14px] focus:outline-none border px-4"
                placeholder="Your role-title"
                :id="`add-${item.menuTitle}`"
                :name="`add-${item.menuTitle}`"
                v-model="getPermissions(item._id).add"
              />
            </div>
            <div class="flex items-center">
              <label
                :for="`read-${item.menuTitle}`"
                class="block text-sm font-normal text-[#4B4B4B] pr-4"
                >Read</label
              >
              <input
                type="checkbox"
                class="text-gray-900 rounded-lg blockpx-3 py-[14px] focus:outline-none border px-4"
                placeholder="Your role-title"
                :id="`read-${item.menuTitle}`"
                :name="`read-${item.menuTitle}`"
                v-model="getPermissions(item._id).read"
              />
            </div>
            <div class="flex items-center">
              <label
                :for="`edit-${item.menuTitle}`"
                class="block text-sm font-normal text-[#4B4B4B] pr-4"
                >Edit</label
              >
              <input
                type="checkbox"
                class="text-gray-900 rounded-lg blockpx-3 py-[14px] focus:outline-none border px-4"
                placeholder="Your role-title"
                :id="`edit-${item.menuTitle}`"
                :name="`edit-${item.menuTitle}`"
                v-model="getPermissions(item._id).edit"
              />
            </div>
            <div class="flex items-center">
              <label
                :for="`delete-${item.menuTitle}`"
                class="block text-sm font-normal text-[#4B4B4B] pr-4"
                >Delete</label
              >
              <input
                type="checkbox"
                class="text-gray-900 rounded-lg blockpx-3 py-[14px] focus:outline-none border px-4"
                placeholder="Your role-title"
                :id="`delete-${item.menuTitle}`"
                :name="`delete-${item.menuTitle}`"
                v-model="getPermissions(item._id).delete"
              />
            </div>
          </div>
          <div class="flex justify-center">
            <button
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
            >
              Update Role
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      menuAccessData: [],
      errors: {},
      formData: {
        roleTitle: "",
        access: {},
      },
    };
  },
  computed: {
    ...mapGetters({
      singleRoleData: "role/getSingleRoleData",
    }),
  },
  methods: {
    ...mapActions({
      fetchSingleRole: "role/fetchSingleRole",
      fetchAllMenuAccess: "role/fetchAllMenuAccess",
      updateRole: "role/updateRole",
    }),
    async getAllMenuAccess() {
      try {
        const res = await this.fetchAllMenuAccess();
        this.menuAccessData = res?.data.filter(
          (item) =>
            item.menuTitle !== "Sub Admin" &&
            item.menuTitle !== "Manage Role" &&
            item.menuTitle !== "Manage Services" &&
            item.menuTitle !== "Mode Of Transportation" &&
            item.menuTitle !== "Securing Equipment" &&
            item.menuTitle !== "Port & Bridge" &&
            item.menuTitle !== "Transportation" &&
            item.menuTitle !== "Service"
        );
      } catch (error) {
        console.log(error);
      }
    },
    async getSingleMenuAccess() {
      try {
        await this.fetchSingleRole({ id: this.roleId });

        const roleData = this.singleRoleData;

        if (roleData && roleData.access) {
          roleData.access.forEach((permission) => {
            const { menuId, add, read, edit, delete: del } = permission;
            this.$set(this.formData.access, menuId, {
              add: add || false,
              read: read || false,
              edit: edit || false,
              delete: del || false,
            });
          });
          this.formData.roleTitle = roleData.roleTitle;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getPermissions(id) {
      if (!this.formData.access[id]) {
        this.$set(this.formData.access, id, {
          add: false,
          read: false,
          edit: false,
          delete: false,
        });
      }
      return this.formData.access[id];
    },
    transformData() {
      const transformedData = {
        roleTitle: this.formData.roleTitle,
        access: Object.keys(this.formData.access).map((key) => {
          const permission = this.formData.access[key];
          return {
            menuId: key,
            add: permission.add,
            read: permission.read,
            edit: permission.edit,
            delete: permission.delete,
          };
        }),
      };
      return transformedData;
    },
    async editRole() {
      try {
        this.errors = await this.$validateRole({
          form: this.formData,
          isEdit: false,
        });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }

        const formData = this.transformData();
        const res = await this.updateRole({
          id: this.roleId,
          payload: formData,
        });
        this.$toast.open({
          message: res.msg,
        });
        this.$router.push("/manage-role");
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },
  async mounted() {
    await this.getSingleMenuAccess();
    await this.getAllMenuAccess();
  },
  async asyncData({ params }) {
    return {
      roleId: params.pathMatch,
    };
  },
};
</script>
