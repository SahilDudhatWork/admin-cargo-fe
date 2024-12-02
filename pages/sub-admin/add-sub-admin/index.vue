<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/sub-admin">SUB ADMIN</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          ADD SUB ADMIN
        </p>
      </div>
      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="addSubAdmin">
        <div>
          <div
            class="grid lg:grid-cols-3 sm:grid-cols-2 :grid-cols-1 gap-y-4 sm:gap-4 lg:gap-4"
          >
            <div>
              <label
                for="Contact name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Contact name *</label
              >
              <input
                type="text"
                placeholder="Your contact name"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.contactName
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                v-model="formData.contactName"
              />
              <span class="error-msg" v-if="errors.contactName">{{
                errors.contactName
              }}</span>
            </div>
            <div>
              <label
                for="Email Address"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Email Address *</label
              >
              <input
                type="email"
                :class="
                  errors.email
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="Your Email Address"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                v-model="formData.email"
              />
              <span class="error-msg" v-if="errors.email">{{
                errors.email
              }}</span>
            </div>
            <div>
              <label
                for="Password"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Password *</label
              >
              <label class="xl:w-[382px] relative flex cursor-pointer flex-col">
                <div class="flex justify-between">
                  <svg
                    @click="togglePassword"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="cursor-pointer w-6 h-6 absolute xl:right-3 lg:right-3 sm:right-3 right-2 top-4"
                  >
                    <path
                      v-if="!isPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                    />
                    <path
                      v-if="!isPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.297 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-4.839 7-9.542 7S3.732 16.057 2.458 12z"
                    />
                    <path
                      v-else
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.218a10.451 10.451 0 00-.31.282C2.763 9.463 2 10.656 2 12c1.581 4.77 5.804 7.5 10.5 7.5 1.348 0 2.639-.21 3.843-.603M6.179 6.177a9.718 9.718 0 015.821-1.677c3.966 0 7.455 2.12 9.542 5.5a10.354 10.354 0 01-1.065 1.502m-1.814 2.904C15.869 15.673 14.5 16.5 12 16.5a3.5 3.5 0 01-3.5-3.5c0-.861.327-1.656.865-2.245M15 12c0-1.657-1.343-3-3-3a2.992 2.992 0 00-2.78 1.943M3 3l18 18"
                    />
                  </svg>
                  <input
                    :class="
                      errors.password
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                    :type="isPassword ? 'text' : 'password'"
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full pl-3 pr-10 py-[13px] focus:outline-none"
                    placeholder="Type your password"
                    v-model="formData.password"
                  />
                </div>
                <span class="error-msg" v-if="errors.password">{{
                  errors.password
                }}</span>
              </label>
            </div>
            <!-- <div>
              <label
                for="Contact"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Contact Number *</label
              >
              <label class="xl:w-[382px] relative flex cursor-pointer flex-col">
                <div class="flex justify-between">
                  <CountryDropdown
                    :items="countries"
                    :selectedLabel="formData?.countryCode"
                    @getValue="getCountryCode"
                    class="absolute mb-3 mr-4"
                  />
                  <div
                    class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                  ></div>
                  <input
                    type="text"
                    :class="
                      errors.contactNumber
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                    placeholder="Your Contact No."
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-1"
                    v-model="formData.contactNumber"
                    @input="validateContactInput"
                  />
                </div>
                <span class="error-msg" v-if="errors.contactNumber">{{
                  errors.contactNumber
                }}</span>
              </label>
            </div> -->
            <div>
              <label
                for="role"
                class="block mb-2 text-sm font-normal text-[#1E1E1E]"
                >Role</label
              >
              <Dropdown
                :items="roleOptions"
                :selectedLabel="selectedLabel"
                @getValue="getRoleValue"
                :errors="errors?.selectedLabel"
              />
              <span class="error-msg" v-if="errors?.selectedLabel">{{
                errors?.selectedLabel
              }}</span>
            </div>
          </div>
          <div class="flex justify-center">
            <button
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
            >
              Add Sub Admin
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
      isPassword: false,
      errors: {},
      countries: [
        {
          key: 1,
          value: 1,
        },
        {
          key: 52,
          value: 52,
        },
      ],
      countriesList: [
        {
          label: "USA",
        },
        {
          label: "MEXICO",
        },
      ],
      selectedLabel: "Select option",
      formData: {
        contactName: "",
        countryCode: 1,
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      allRoleData: "role/getAllRoleData",
    }),
    roleOptions() {
      return this.allRoleData.map((role) => ({
        label: role.roleTitle,
        value: role._id,
      }));
    },
  },
  methods: {
    ...mapActions({
      CreateSubAdmin: "sub-admin/CreateSubAdmin",
      fetchAllRoles: "role/fetchAllRoles",
    }),
    togglePassword() {
      this.isPassword = !this.isPassword;
    },
    async validateContactInput(event) {
      this.formData.contactNumber = await this.$validateNumber(
        event.target.value
      );
    },
    getCountryCode(item) {
      this.formData.countryCode = item.value;
    },
    getRoleValue(item) {
      this.selectedLabel = item.label;
      this.formData.roleByAdmin = item.value;
    },
    async addSubAdmin() {
      try {
        this.errors = await this.$validateSubAdminForm({
          form: this.formData,
          selectedLabel: this.selectedLabel,
          isEdit: false,
        });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }

        const response = await this.CreateSubAdmin(this.formData);
        this.$toast.open({
          message: response.msg,
        });
        this.$router.push("/sub-admin");
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getAllRole() {
      try {
        await this.fetchAllRoles();
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getAllRole();
  },
};
</script>
