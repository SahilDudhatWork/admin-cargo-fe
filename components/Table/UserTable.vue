<template>
  <div>
    <div class="mt-6">
      <div class="relative overflow-x-auto w-[71%]">
        <table class="w-full text-left rtl:text-right">
          <thead class="bg-[#F4F4F4]">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 rounded-tl-lg text-[#000000] font-normal text-[12px]"
              >
                Sr. no
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                User ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                User Info
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Company name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Company Address
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Verify Admin
              </th>
              <th
                scope="col"
                class="px-3 py-3 rounded-tr-lg text-[#000000] font-normal text-[12px]"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody v-if="allData?.length > 0">
            <tr
              class="bg-white border-b cursor-pointer"
              v-for="(item, index) in allData"
              :key="index"
            >
              <td class="px-6">#</td>
              <th
                scope="row"
                class="px-6 ftext-[#000000] font-normal text-[12px]"
              >
                <span class="border-b border-black">{{ item?.accountId }}</span>
              </th>
              <td class="px-6 text-[10px]">
                <button
                  class="bg-[#59D31C] text-white rounded py-[1px] px-[10px]"
                >
                  NEW REQUEST
                </button>
              </td>
              <td class="px-6 flex flex-col justify-center">
                <span class="text-[#000000] font-normal text-[12px] pt-3">{{
                  item?.contactName
                }}</span>
                <span class="text-[#989898] font-normal text-[10px] pb-5">
                  {{ item?.email }}
                </span>
              </td>
              <td class="px-6 text-[#000000] font-normal text-[12px]">
                {{ item?.companyName }}
              </td>
              <td
                class="px-6 max-w-[240px] text-[#000000] font-normal text-[12px]"
              >
                Menlo Park, CA 94025, USA Lorem ipsum dolor sit amet
                consectetur, Vitae netus
                <!-- {{ item.companyAddress }} -->
              </td>
              <td class="cursor-pointer" @click="handleVerify(item)">
                <span
                  class="ml-6 border-b font-normal text-[12px]"
                  :class="
                    item?.verifyByAdmin
                      ? 'text-[#59D31C] border-[#59D31C]'
                      : 'text-yellow-500 border-yellow-500'
                  "
                >
                  {{ item?.verifyByAdmin ? "Verified" : "Verify" }}
                </span>
              </td>
              <td class="flex items-center gap-2">
                <img
                  src="@/static/svg/eye-icon.svg"
                  alt=""
                  class="w-[20px] h-[20px] mt-6"
                />
                <img
                  src="@/static/svg/edit-icon.svg"
                  alt=""
                  class="w-[17px] h-[17px] mt-6"
                  @click="editUser(item)"
                />
                <img
                  src="@/static/svg/delete-icon.svg"
                  alt=""
                  class="w-[20px] h-[20px] mt-6"
                  @click="$emit('deleteItem', item._id)"
                />
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td
                colspan="8"
                class="text-xl font-medium text-gray-400 text-center py-10"
              >
                No records available
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 flex justify-end gap-5 items-center mb-10">
          <span>{{ paginationText }}</span>
          <button
            class="p-1 rounded-lg"
            @click="$emit('firstPage')"
            :disabled="userPaginationData.pre_page_url === null"
            :class="
              userPaginationData.pre_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              fill="#ffffff"
            >
              <path
                d="M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z"
              ></path>
            </svg>
          </button>
          <button
            @click="$emit('prevPage')"
            class="p-[9px] rounded-lg"
            :disabled="userPaginationData.pre_page_url === null"
            :class="
              userPaginationData.pre_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-3.5 h-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
              stroke="#ffffff"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>

          <button
            @click="$emit('nextPage')"
            class="p-[9px] rounded-lg"
            :disabled="userPaginationData.next_page_url === null"
            :class="
              userPaginationData.next_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-3.5 h-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
              stroke="#ffffff"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>

          <button
            @click="$emit('lastPage')"
            class="p-1 rounded-lg"
            :disabled="userPaginationData.next_page_url === null"
            :class="
              userPaginationData.next_page_url === null
                ? 'bg-[#89abcf]'
                : 'bg-[#3683D5]'
            "
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              fill="#ffffff"
            >
              <path
                d="M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    allData: {
      type: Array,
      required: true,
    },
    paginationText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userPaginationData: "user/getUserPaginationData",
    }),
  },
  methods: {
    editUser(item) {
      this.$emit("handleClick", item);
    },
    async handleVerify(item) {
      this.$emit("handleVerify", item);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>
