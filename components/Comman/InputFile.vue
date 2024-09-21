<template>
  <div>
    <label
      for="COPIARFCForm"
      class="block mb-2 text-sm font-normal text-[#4B4B4B]"
      >{{ itemLabel }}</label
    >
    <label
      :class="errors ? 'border border-red-600' : 'border border-gray-300'"
      class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150"
    >
      <div class="flex justify-between">
        <p class="text-sm text-[#686868] font-normal">
          {{ "Choose file to upload" }}
        </p>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute right-2"
        >
          <g clip-path="url(#clip0_1879_1065)">
            <path
              d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z"
              fill="#1E1E1E"
            />
          </g>
          <defs>
            <clipPath id="clip0_1879_1065">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <input
        type="file"
        class="absolute inset-0 opacity-0 cursor-pointer py-1"
        @change="handleFileChange"
      />
    </label>
    <p class="text-[#989898] font-normal text-[12px] mt-1">
      {{ itemPlaceholder }}
    </p>
    <div v-if="fileData" class="mt-4">
      <img
        v-if="fileType === 'application/pdf' || fileType === 'pdf'"
        src="@/static/svg/pdf.svg"
        alt="Image Preview"
        class="w-20 object-contain h-12 rounded-lg"
        @click="downloadFileItem"
      />
      <img
        v-else-if="fileType === 'application/msword' || fileType === 'doc'"
        src="@/static/svg/doc.svg"
        alt="Image Preview"
        class="w-20 object-contain h-12 rounded-lg"
        @click="downloadFileItem"
      />
      <img
        v-else
        :src="fileUrl"
        alt="Image Preview"
        class="w-20 object-contain h-12 rounded-lg"
        @click="downloadFileItem"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemLabel: {
      type: String,
      required: true,
      default: "label",
    },
    itemPlaceholder: {
      type: String,
      required: false,
      default: "Type should be PDF, DOC, JPG, PNG*",
    },
    fileData: {
      type: [File, String],
      default: null,
    },
    file: {
      type: String,
      required: true,
      default: "Choose file to upload",
    },
    errors: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      fileType: null,
    };
  },
  watch: {
    fileData: {
      deep: true,
      handler(item) {
        this.fileType = item ? item.type : null;
      },
    },
  },
  computed: {
    fileUrl() {
      const baseUrl = "https://cargo-storage-bucket.s3.us-east-1.amazonaws.com";
      if (this.file.startsWith(baseUrl)) {
        this.fileType = this.getFileType;
        return this.file;
      } else {
        let url = this.fileData ? URL.createObjectURL(this.fileData) : "";
        this.fileType = this.fileData ? this.fileData.type : null;
        return url;
      }
    },
    getFileType() {
      return this.file.split(".").pop();
    },
  },
  methods: {
    handleFileChange(event) {
      this.$emit("handleFileChange", event);
    },
    downloadFileItem() {
      const baseUrl = "https://cargo-storage-bucket.s3.us-east-1.amazonaws.com";
      if (this.fileUrl.startsWith(baseUrl)) {
        const fileName = this.fileUrl.split("/").pop();
        this.$downloadFile({ src: this.fileUrl, name: fileName });
      }
    },
  },
};
</script>
