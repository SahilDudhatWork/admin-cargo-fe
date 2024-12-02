<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/user">USERS</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          ADD USER
        </p>
      </div>
      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="addUser">
        <div>
          <div
            class="grid lg:grid-cols-3 sm:grid-cols-2 :grid-cols-1 gap-y-4 sm:gap-4 lg:gap-4"
          >
            <div>
              <label
                for="Company name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Company name *</label
              >
              <input
                type="text"
                name="CompanyName"
                id="CompanyName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.companyName
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="Your company name"
                v-model="formData.companyName"
              />
              <span class="error-msg" v-if="errors.companyName">{{
                errors.companyName
              }}</span>
            </div>
            <div>
              <label
                for="Contact name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Contact name *</label
              >
              <input
                type="text"
                name="ContactName"
                id="ContactName"
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
                name="email"
                :class="
                  errors.email
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                id="email"
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
                for="Create Password"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Create Password *</label
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
                    name="createPassword"
                    id="createPassword"
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[13px] focus:outline-none"
                    placeholder="Type your password"
                    v-model="formData.password"
                  />
                </div>
                <span class="error-msg" v-if="errors.password">{{
                  errors.password
                }}</span>
              </label>
            </div>
            <div>
              <label
                for="Contact"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Contact *</label
              >
              <label class="xl:w-[382px] relative flex cursor-pointer flex-col">
                <div class="flex justify-between">
                  <CountryDropdown
                    :items="countries"
                    :selectedLabel="formData?.countryCode"
                    @getValue="getCountry"
                    class="absolute mb-3 mr-4"
                  />
                  <div
                    class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                  ></div>
                  <input
                    type="text"
                    name="ContactNo"
                    :class="
                      errors.contactNumber
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                    id="ContactNo"
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
            </div>
            <div>
              <label
                for="companyFormation"
                class="block mb-2 text-sm font-normal text-[#1E1E1E]"
                >Company Formation</label
              >
              <Dropdown
                :items="countriesList"
                :selectedLabel="selectedLabel"
                @getValue="getValue"
              />
            </div>
            <div v-if="selectedLabel === 'USA'">
              <inputFile
                :errors="errors.w9_Form"
                item-label="W9 Form"
                :fileData="formData?.companyFormation?.usa?.w9_Form"
                :file="
                  typeof formData?.companyFormation?.usa?.w9_Form == 'object'
                    ? formData?.companyFormation?.usa?.w9_Form?.name
                    : formData?.companyFormation?.usa?.w9_Form
                "
                @handleFileChange="uploadW9Form"
              />
              <span class="error-msg" v-if="errors.w9_Form">{{
                errors.w9_Form
              }}</span>
            </div>
            <div v-if="selectedLabel === 'USA'">
              <inputFile
                :errors="errors.utility_Bill"
                item-label="Utility Bill"
                :fileData="formData?.companyFormation?.usa?.utility_Bill"
                :file="
                  typeof formData?.companyFormation?.usa?.utility_Bill ==
                  'object'
                    ? formData?.companyFormation?.usa?.utility_Bill?.name
                    : formData?.companyFormation?.usa?.utility_Bill
                "
                @handleFileChange="uploadUtilityBill"
              />
              <span class="error-msg" v-if="errors.utility_Bill">{{
                errors.utility_Bill
              }}</span>
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                :errors="errors.copia_Rfc_Form"
                item-label="COPIA RFC Form"
                :fileData="formData?.companyFormation?.maxico?.copia_Rfc_Form"
                :file="
                  typeof formData?.companyFormation?.maxico?.copia_Rfc_Form ==
                  'object'
                    ? formData?.companyFormation?.maxico?.copia_Rfc_Form?.name
                    : formData?.companyFormation?.maxico?.copia_Rfc_Form
                "
                @handleFileChange="uploadCopiaRfcForm"
              />
              <span class="error-msg" v-if="errors.copia_Rfc_Form">{{
                errors.copia_Rfc_Form
              }}</span>
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                :errors="errors.constance_Of_Fiscal_Situation"
                item-label="Constance of Fiscal Situation"
                :fileData="
                  formData?.companyFormation?.maxico
                    ?.constance_Of_Fiscal_Situation
                "
                :file="
                  typeof formData?.companyFormation?.maxico
                    ?.constance_Of_Fiscal_Situation == 'object'
                    ? formData?.companyFormation?.maxico
                        ?.constance_Of_Fiscal_Situation?.name
                    : formData?.companyFormation?.maxico
                        ?.constance_Of_Fiscal_Situation
                "
                @handleFileChange="uploadConstanceOfFiscalSituation"
              />
              <span
                class="error-msg"
                v-if="errors.constance_Of_Fiscal_Situation"
                >{{ errors.constance_Of_Fiscal_Situation }}</span
              >
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                item-label="Proof of Favorable"
                :fileData="
                  formData?.companyFormation?.maxico?.proof_of_Favorable
                "
                :errors="errors.proof_of_Favorable"
                :file="
                  typeof formData?.companyFormation?.maxico
                    ?.proof_of_Favorable == 'object'
                    ? formData?.companyFormation?.maxico?.proof_of_Favorable
                        ?.name
                    : formData?.companyFormation?.maxico?.proof_of_Favorable
                "
                @handleFileChange="uploadProofOfFavorable"
              />
              <span class="error-msg" v-if="errors.proof_of_Favorable">{{
                errors.proof_of_Favorable
              }}</span>
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                :errors="errors.proof_Of_Address"
                item-label="Proof of Address"
                :fileData="formData?.companyFormation?.maxico?.proof_Of_Address"
                :file="
                  typeof formData?.companyFormation?.maxico?.proof_Of_Address ==
                  'object'
                    ? formData?.companyFormation?.maxico?.proof_Of_Address?.name
                    : formData?.companyFormation?.maxico?.proof_Of_Address
                "
                @handleFileChange="uploadProofOfAddress"
              />
              <span class="error-msg" v-if="errors.proof_Of_Address">{{
                errors.proof_Of_Address
              }}</span>
            </div>
          </div>

          <div v-if="selectedLabel != 'Select option'" class="mt-1">
            <div
              v-for="(reference, key) in formData.commercialReference"
              :key="key"
              class="grid gap-y-2"
            >
              <h1 class="text-[#1E1E1E] font-medium text-base">
                Commercial Reference {{ key + 1 }}
              </h1>
              <div
                class="grid lg:grid-cols-3 sm:grid-cols-2 :grid-cols-1 gap-y-4 sm:gap-4 lg:gap-4"
              >
                <div>
                  <label
                    for="Company name"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                    >Company name</label
                  >
                  <input
                    :class="
                      errors[`commercialReference[${key}].companyName`]
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                    type="text"
                    name="CompanyName"
                    id="CompanyName"
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                    placeholder="Your company name"
                    v-model="reference.companyName"
                  />
                  <span
                    class="error-msg"
                    v-if="errors[`commercialReference[${key}].companyName`]"
                  >
                    {{ errors[`commercialReference[${key}].companyName`] }}
                  </span>
                </div>
                <div>
                  <label
                    for="Contact name"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                    >Contact name</label
                  >
                  <input
                    type="text"
                    name="ContactName"
                    :class="
                      errors[`commercialReference[${key}].contactName`]
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                    id="ContactName"
                    placeholder="Your contact name"
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                    v-model="reference.contactName"
                  />
                  <span
                    class="error-msg"
                    v-if="errors[`commercialReference[${key}].contactName`]"
                  >
                    {{ errors[`commercialReference[${key}].contactName`] }}
                  </span>
                </div>
                <div>
                  <label
                    for="Email Address"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    name="email"
                    :class="
                      errors[`commercialReference[${key}].emailAddress`]
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                    id="email"
                    placeholder="Your Email Address"
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                    v-model="reference.emailAddress"
                  />
                  <span
                    class="error-msg"
                    v-if="errors[`commercialReference[${key}].emailAddress`]"
                  >
                    {{ errors[`commercialReference[${key}].emailAddress`] }}
                  </span>
                </div>
                <div>
                  <label
                    for="Contact No"
                    class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                    >Contact No.</label
                  >
                  <label
                    class="xl:w-[382px] relative flex cursor-pointer flex-col"
                  >
                    <div class="flex justify-between">
                      <CountryDropdown
                        :items="countries"
                        :selectedLabel="reference?.countryCode"
                        @getValue="
                          (value) => getReferenceCountry(value, reference)
                        "
                        class="absolute mb-3 mr-4"
                      />
                      <div
                        class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                      ></div>
                      <input
                        type="text"
                        name="ContactNo"
                        :class="
                          errors[`commercialReference[${key}].contactNo`]
                            ? 'border border-red-600'
                            : 'border border-gray-300'
                        "
                        id="ContactNo"
                        placeholder="Your Contact No."
                        class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-1"
                        v-model="reference.contactNo"
                        @input="validateReferrenceInput(reference)"
                      />
                    </div>
                  </label>
                  <span
                    class="error-msg"
                    v-if="errors[`commercialReference[${key}].contactNo`]"
                  >
                    {{ errors[`commercialReference[${key}].contactNo`] }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <button
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
            >
              Add User
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
      errorMessage: "",
      selectedLabel: "Select option",
      formData: {
        companyName: "",
        contactName: "",
        countryCode: 1,
        contactNumber: "",
        email: "",
        password: "",
        companyFormationType: "",
        companyFormation: {
          usa: {
            w9_Form: "",
            utility_Bill: "",
          },
          maxico: {
            copia_Rfc_Form: "",
            constance_Of_Fiscal_Situation: "",
            proof_of_Favorable: "",
            proof_Of_Address: "",
          },
        },
        commercialReference: [
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      createUser: "user/createUser",
    }),
    getCountry(item) {
      this.formData.countryCode = item.value;
    },
    getReferenceCountry(item, ref) {
      ref.countryCode = item.value;
    },
    getValue(item) {
      this.selectedLabel = item.label;
      this.formData.companyFormationType = item.label;
    },
    togglePassword() {
      this.isPassword = !this.isPassword;
    },
    async validateContactInput(event) {
      this.formData.contactNumber = await this.$validateNumber(
        event.target.value
      );
    },
    async validateReferrenceInput(reference) {
      reference.contactNo = await this.$validateNumber(reference.contactNo);
    },
    async uploadW9Form(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.usa.w9_Form = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadUtilityBill(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.usa.utility_Bill = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadCopiaRfcForm(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.copia_Rfc_Form = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadConstanceOfFiscalSituation(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.constance_Of_Fiscal_Situation =
          file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadProofOfFavorable(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.proof_of_Favorable = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadProofOfAddress(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.proof_Of_Address = file;
      } catch (error) {
        console.log(error);
      }
    },
    async addUser() {
      try {
        this.errors = await this.$validateUserForm({
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

        const formData = new FormData();
        formData.append("companyName", this.formData.companyName);
        formData.append("contactName", this.formData.contactName);
        formData.append("contactNumber", this.formData.contactNumber);
        formData.append("countryCode", this.formData.countryCode);
        formData.append("email", this.formData.email.toLowerCase());
        formData.append("password", this.formData.password);
        if (
          this.formData.companyFormationType &&
          this.formData.companyFormationType != null
        ) {
          formData.append(
            "companyFormationType",
            this.formData.companyFormationType
          );
        }

        if (this.selectedLabel === "USA") {
          delete this.formData?.companyFormation?.maxico;

          formData.append(
            "companyFormation_usa_w9_Form",
            this.formData?.companyFormation?.usa?.w9_Form
          );

          formData.append(
            "companyFormation_usa_utility_Bill",
            this.formData?.companyFormation?.usa?.utility_Bill
          );
        }
        if (this.selectedLabel === "MEXICO") {
          delete this.formData.companyFormation.usa;
          formData.append(
            "companyFormation_maxico_copia_Rfc_Form",
            this.formData?.companyFormation?.maxico?.copia_Rfc_Form
          );

          formData.append(
            "companyFormation_maxico_constance_Of_Fiscal_Situation",
            this.formData?.companyFormation?.maxico
              ?.constance_Of_Fiscal_Situation
          );

          formData.append(
            "companyFormation_maxico_proof_of_Favorable",
            this.formData?.companyFormation?.maxico?.proof_of_Favorable
          );

          formData.append(
            "companyFormation_maxico_proof_Of_Address",
            this.formData?.companyFormation?.maxico?.proof_Of_Address
          );
        }
        this.formData.commercialReference.forEach((ref, index) => {
          let hasValidValue = Object.keys(ref).some(
            (key) => key !== "countryCode" && ref[key] && ref[key] !== ""
          );
          if (hasValidValue) {
            for (let key in ref) {
              let value = ref[key];

              if (key === "contactNo") {
                value = `${value}`;
              }
              if (key === "countryCode") {
                value = `${value}`;
              }
              if (value && value != "") {
                formData.append(`commercialReference[${index}][${key}]`, value);
              }
            }
          }
        });
        const commercialRef1 = this.formData.commercialReference[0];
        const commercialRef2 = this.formData.commercialReference[1];
        if (
          commercialRef2 &&
          (commercialRef1.companyName ||
            commercialRef1.contactName ||
            commercialRef2.companyName ||
            commercialRef2.contactName) &&
          (!commercialRef1.companyName || !commercialRef1.contactName)
        ) {
          this.$toast.open({
            message: "Please add commercial reference 1",
            type: "error",
          });
          return;
        }
        const response = await this.createUser(formData);
        this.$toast.open({
          message: response.msg,
        });
        this.$router.push("/user");
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },

  async mounted() {},
};
</script>
