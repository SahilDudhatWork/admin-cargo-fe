<template>
  <div>
    <div class="mt-6">
      <div class="relative overflow-x-auto w-[70%]">
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
                Actions
              </th>
              <th
                scope="col"
                class="px-3 py-3 rounded-tr-lg text-[#000000] font-normal text-[12px]"
              >
                Verify Admin
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b cursor-pointer"
              @click="editUser(item)"
              v-for="(item, index) in allUserData"
              :key="index"
            >
              <td class="px-6 py-4">0{{ index + 1 }}</td>
              <th
                scope="row"
                class="px-6 py-4 ftext-[#000000] font-normal text-[12px]"
              >
                <span class="border-b border-black">{{ item?.accountId }}</span>
              </th>
              <td class="px-6 py-4 text-[10px]">
                <button
                  class="bg-[#59D31C] text-white rounded py-[1px] px-[10px]"
                >
                  NEW REQUEST
                </button>
              </td>
              <td class="px-6 py-4 flex flex-col justify-center">
                <span class="text-[#000000] font-normal text-[12px] pt-3">{{
                  item?.contactName
                }}</span>
                <span class="text-[#989898] font-normal text-[10px] pb-5">
                  {{ item?.email }}
                </span>
              </td>
              <td class="px-6 py-4 text-[#000000] font-normal text-[12px]">
                {{ item?.companyName }}
              </td>
              <td
                class="px-6 py-4 max-w-[240px] text-[#000000] font-normal text-[12px]"
              >
                Menlo Park, CA 94025, USA Lorem ipsum dolor sit amet
                consectetur, Vitae netus
                <!-- {{ item.companyAddress }} -->
              </td>
              <td class="py-4 cursor-pointer" @click="handleBlock(item)">
                <span
                  class="ml-6 border-b font-normal text-[12px]"
                  :class="
                    item?.isBlocked
                      ? 'text-yellow-500 border-yellow-500'
                      : 'text-red-500 border-red-500'
                  "
                >
                  {{ item?.isBlocked ? "Unblock" : "Block" }}
                </span>
              </td>
              <td class="py-4 cursor-pointer" @click="handleVerify(item)">
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allUserData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    editUser(item) {
      this.$router.push(`user/edit-user/${item._id}`);
    },
    async handleBlock(item) {
      this.$emit("handleBlock", item);
    },
    async handleVerify(item) {
      this.$emit("handleVerify", item);
    },
  },
};
</script>
