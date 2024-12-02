<template>
  <div>
    <div class="mt-6">
      <div class="relative overflow-x-auto">
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
                Title
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                SubTitle
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Description
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Role
              </th>
              <th
                scope="col"
                v-if="isEditBtn || isDeleteBtn"
                class="py-3 rounded-tr-lg text-[#000000] font-normal text-[12px]"
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
              <td class="px-6 py-6">#</td>
              <td>
                <span class="text-[#000000] font-normal text-xs pb-5 xl:px-6">
                  {{ item?.title }}
                </span>
              </td>
              <td>
                <span class="text-[#000000] font-normal text-xs pb-5 xl:px-6">
                  {{ item?.subTitle }}
                </span>
              </td>
              <td>
                <span
                  class="text-[#000000] font-normal text-xs pb-5 px-6 whitespace-normal overflow-hidden break-words block max-w-[800px] pt-5"
                  v-html="item?.description"
                ></span>
              </td>
              <td>
                <span class="text-[#000000] font-normal text-xs pb-5 px-6">
                  {{ item?.role }}
                </span>
              </td>
              <td>
                <div
                  class="flex items-center gap-2"
                  v-if="isEditBtn || isDeleteBtn"
                >
                  <img
                    v-if="isEditBtn"
                    src="@/static/svg/edit-icon.svg"
                    alt=""
                    class="w-[17px] h-[17px]"
                    @click="$emit('handleClick', item._id)"
                  />
                  <img
                    v-if="isDeleteBtn"
                    src="@/static/svg/delete-icon.svg"
                    alt=""
                    class="w-[20px] h-[20px]"
                    @click="$emit('deleteItem', item._id)"
                  />
                </div>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allData: {
      type: Array,
      required: true,
    },
    isEditBtn: {
      type: Boolean,
      default: false,
    },
    isDeleteBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>
