<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/carrier">CARRIER</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          ADD CARRIER
        </p>
      </div>
      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="addCarrier">
        <div class="w-[65%]">
          <div class="grid grid-cols-2 gap-y-2">
            <div>
              <label
                for="Company name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Company name</label
              >
              <input
                type="text"
                name="CompanyName"
                id="CompanyName"
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your company name"
                v-model="formData.companyName"
              />
            </div>
            <div>
              <label
                for="ContactName"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Contact name</label
              >
              <input
                type="text"
                name="ContactName"
                id="ContactName"
                placeholder="Your contact name"
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                v-model="formData.contactName"
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Email Address</label
              >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email Address"
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                v-model="formData.email"
              />
            </div>
            <div>
              <label
                for="createPassword"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Create Password</label
              >
              <label class="xl:w-[382px] relative flex cursor-pointer">
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
                    :type="isPassword ? 'text' : 'password'"
                    name="createPassword"
                    id="createPassword"
                    class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[13px]"
                    placeholder="Type your email address"
                    v-model="formData.password"
                  />
                </div>
              </label>
            </div>
            <div>
              <label
                for="ContactNo"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Contact No.</label
              >
              <label class="xl:w-[382px] relative flex cursor-pointer">
                <div class="flex justify-between">
                  <svg
                    width="24"
                    class="absolute ml-3 mb-3 mr-4 top-4"
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      fill="#ED2939"
                      d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
                    ></path>
                    <path
                      fill="#002495"
                      d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
                    ></path>
                    <path fill="#EEE" d="M12 5h12v26H12z"></path>
                  </svg>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute sm:right-3 right-2 top-4 cursor-pointer"
                  >
                    <path
                      d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z"
                      fill="#1E1E1E"
                    />
                  </svg>
                  <span
                    class="absolute left-12 mb-3 mr-4 top-4 text-[#1E1E1E] font-normal text-base"
                    >+33</span
                  >
                  <div
                    class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                  ></div>
                  <input
                    type="number"
                    name="ContactNo"
                    id="ContactNo"
                    placeholder="Your Contact No."
                    class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                    v-model="formData.contactNumber"
                  />
                </div>
              </label>
            </div>
            <div>
              <inputFile
                item-label="SCAC"
                :file="
                  typeof formData.scac == 'object'
                    ? formData.scac?.name
                    : formData.scac
                "
                @handleFileChange="uploadScac"
              />
            </div>
            <div>
              <inputFile
                item-label="CAAT"
                :file="
                  typeof formData.caat == 'object'
                    ? formData.caat?.name
                    : formData.caat
                "
                @handleFileChange="uploadCaat"
              />
            </div>
            <div>
              <inputFile
                item-label="Insurance Policy"
                :file="
                  typeof formData.insurancePolicy == 'object'
                    ? formData.insurancePolicy?.name
                    : formData.insurancePolicy
                "
                @handleFileChange="uploadInsurancePolicy"
              />
            </div>
            <div>
              <inputFile
                item-label="OEA"
                :file="
                  typeof formData.oea == 'object'
                    ? formData.oea?.name
                    : formData.oea
                "
                @handleFileChange="uploadOea"
              />
            </div>
            <div>
              <inputFile
                item-label="CTPAT"
                :file="
                  typeof formData.ctpat == 'object'
                    ? formData.ctpat?.name
                    : formData.ctpat
                "
                @handleFileChange="uploadCtpat"
              />
            </div>
            <div class="">
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
                item-label="W9 Form"
                :file="
                  typeof formData?.companyFormation?.usa?.w9_Form == 'object'
                    ? formData?.companyFormation?.usa?.w9_Form?.name
                    : formData?.companyFormation?.usa?.w9_Form
                "
                @handleFileChange="uploadW9Form"
              />
            </div>
            <div v-if="selectedLabel === 'USA'">
              <inputFile
                item-label="Utility Bill"
                :file="
                  typeof formData?.companyFormation?.usa?.utility_Bill ==
                  'object'
                    ? formData?.companyFormation?.usa?.utility_Bill?.name
                    : formData?.companyFormation?.usa?.utility_Bill
                "
                @handleFileChange="uploadUtilityBill"
              />
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                item-label="COPIA RFC Form"
                :file="
                  typeof formData?.companyFormation?.maxico?.copia_Rfc_Form ==
                  'object'
                    ? formData?.companyFormation?.maxico?.copia_Rfc_Form?.name
                    : formData?.companyFormation?.maxico?.copia_Rfc_Form
                "
                @handleFileChange="uploadCopiaRfcForm"
              />
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                item-label="Constance of Fiscal Situation"
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
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                item-label="Proof of Favorable"
                :file="
                  typeof formData?.companyFormation?.maxico
                    ?.proof_of_Favorable == 'object'
                    ? formData?.companyFormation?.maxico?.proof_of_Favorable
                        ?.name
                    : formData?.companyFormation?.maxico?.proof_of_Favorable
                "
                @handleFileChange="uploadProofOfFavorable"
              />
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                item-label="Proof of Address"
                :file="
                  typeof formData?.companyFormation?.maxico?.proof_Of_Address ==
                  'object'
                    ? formData?.companyFormation?.maxico?.proof_Of_Address?.name
                    : formData?.companyFormation?.maxico?.proof_Of_Address
                "
                @handleFileChange="uploadProofOfAddress"
              />
            </div>
          </div>

          <div
            v-if="selectedLabel != 'Select option'"
            class="grid grid-cols-2 mt-1"
          >
            <div
              v-for="(reference, key) in formData.commercialReference"
              :key="key"
              class="grid gap-y-2"
            >
              <div>
                <h1 class="text-[#1E1E1E] font-medium text-base">
                  Commercial Reference {{ key + 1 }}
                </h1>
                <label
                  for="Company name"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Company name</label
                >
                <input
                  type="text"
                  name="CompanyName"
                  id="CompanyName"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  placeholder="Your company name"
                  v-model="reference.companyName"
                />
              </div>
              <div>
                <label
                  for="ContactName"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Contact name</label
                >
                <input
                  type="text"
                  name="ContactName"
                  id="ContactName"
                  placeholder="Your contact name"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  v-model="reference.contactName"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Email Address</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email Address"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  v-model="reference.emailAddress"
                />
              </div>
              <div>
                <label
                  for="ContactNo"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Contact No.</label
                >
                <label class="xl:w-[382px] relative flex cursor-pointer">
                  <div class="flex justify-between">
                    <svg
                      width="24"
                      class="absolute ml-3 mb-3 mr-4 top-4"
                      viewBox="0 0 36 36"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        fill="#ED2939"
                        d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
                      ></path>
                      <path
                        fill="#002495"
                        d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
                      ></path>
                      <path fill="#EEE" d="M12 5h12v26H12z"></path>
                    </svg>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="absolute sm:right-3 right-2 top-4 cursor-pointer"
                    >
                      <path
                        d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z"
                        fill="#1E1E1E"
                      />
                    </svg>
                    <span
                      class="absolute left-12 mb-3 mr-4 top-4 text-[#1E1E1E] font-normal text-base"
                      >+1</span
                    >
                    <div
                      class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                    ></div>
                    <input
                      type="number"
                      name="ContactNo"
                      id="ContactNo"
                      placeholder="Your Contact No."
                      class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                      v-model="reference.contactNo"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <button
              class="mb-5 w-[20%] text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-5 py-[15px] text-center"
            >
              Add Carrier
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      isPassword: false,
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
        companyName: "",
        contactName: "",
        contactNumber: "",
        email: "",
        password: "",
        scac: "",
        caat: "",
        insurancePolicy: "",
        oea: "",
        ctpat: "",
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
            countryCode: "",
            contactNo: "",
          },
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: "",
            contactNo: "",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      CreateCarrier: "carrier/CreateCarrier",
    }),
    getValue(item) {
      this.selectedLabel = item.label;
      this.formData.companyFormationType = item.label;
    },
    togglePassword() {
      this.isPassword = !this.isPassword;
    },
    async uploadScac(event) {
      try {
        const file = event.target.files[0];
        this.formData.scac = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadCaat(event) {
      try {
        const file = event.target.files[0];
        this.formData.caat = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadInsurancePolicy(event) {
      try {
        const file = event.target.files[0];
        this.formData.insurancePolicy = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadOea(event) {
      try {
        const file = event.target.files[0];
        this.formData.oea = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadCtpat(event) {
      try {
        const file = event.target.files[0];
        this.formData.ctpat = file;
      } catch (error) {
        console.log(error);
      }
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
    async addCarrier() {
      try {
        const formData = new FormData();
        formData.append("companyName", this.formData.companyName);
        formData.append("contactName", this.formData.contactName);
        formData.append("contactNumber", `+1${this.formData.contactNumber}`);
        formData.append("email", this.formData.email);
        formData.append("password", this.formData.password);
        formData.append(
          "companyFormationType",
          this.formData.companyFormationType
        );
        if (typeof this.formData.scac == "object") {
          formData.append("scac", this.formData.scac);
        }
        if (
          this.formData.caat != null &&
          typeof this.formData.caat == "object"
        ) {
          formData.append("caat", this.formData.caat);
        }
        if (
          this.formData.insurancePolicy != null &&
          typeof this.formData.insurancePolicy == "object"
        ) {
          formData.append("insurancePolicy", this.formData.insurancePolicy);
        }
        if (this.formData.oea != null && typeof this.formData.oea == "object") {
          formData.append("oea", this.formData.oea);
        }
        if (
          this.formData.ctpat != null &&
          typeof this.formData.ctpat == "object"
        ) {
          formData.append("ctpat", this.formData.ctpat);
        }

        if (this.selectedLabel === "USA") {
          delete this.formData.companyFormation.maxico;

          formData.append(
            "companyFormation_usa_w9_Form",
            this.formData.companyFormation.usa.w9_Form
          );

          formData.append(
            "companyFormation_usa_utility_Bill",
            this.formData.companyFormation.usa.utility_Bill
          );
        }
        if (this.selectedLabel === "MEXICO") {
          delete this.formData.companyFormation.usa;
          formData.append(
            "companyFormation_maxico_copia_Rfc_Form",
            this.formData.companyFormation.maxico.copia_Rfc_Form
          );

          formData.append(
            "companyFormation_maxico_constance_Of_Fiscal_Situation",
            this.formData.companyFormation.maxico.constance_Of_Fiscal_Situation
          );

          formData.append(
            "companyFormation_maxico_proof_of_Favorable",
            this.formData.companyFormation.maxico.proof_of_Favorable
          );

          formData.append(
            "companyFormation_maxico_proof_Of_Address",
            this.formData.companyFormation.maxico.proof_Of_Address
          );
        }
        this.formData.commercialReference.forEach((ref, index) => {
          for (let key in ref) {
            let value = ref[key];

            if (key === "countryCode" || key === "contactNo") {
              value = `+1${value}`;
            }
            formData.append(`commercialReference[${index}][${key}]`, value);
          }
        });
        const response = await this.CreateCarrier(formData);
        this.$toast.open({
          message: response.msg,
        });
        this.$router.push("/carrier");
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
  },
};
</script>
