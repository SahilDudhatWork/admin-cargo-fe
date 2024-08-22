<template>
    <div>
        <div class="mt-6">
            <div class="relative overflow-x-auto w-[65%]">
                <table class="w-full text-left rtl:text-right">
                    <thead class="bg-[#F4F4F4]">
                        <tr>
                            <th scope="col" class="px-6 py-3 rounded-tl-lg text-[#000000] font-normal text-[12px]">
                                Sr. no
                            </th>
                            <th scope="col" class="px-6 py-3 text-[#000000] font-normal text-[12px]">
                                User ID
                            </th>
                            <th scope="col" class="px-6 py-3 text-[#000000] font-normal text-[12px]">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3 text-[#000000] font-normal text-[12px]">
                                User Info
                            </th>
                            <th scope="col" class="px-6 py-3 text-[#000000] font-normal text-[12px]">
                                Company name
                            </th>
                            <th scope="col" class="px-6 py-3 rounded-tr-lg text-[#000000] font-normal text-[12px]">
                                Company Address
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b" v-for="(item,key) in UserItems" :key="key">
                            <td class="px-6 py-4">
                                0{{key + 1}}
                            </td>
                            <th scope="row" class="px-6 py-4 ftext-[#000000] font-normal text-[12px]">
                            <span class="border-b border-black">{{ item.userId }}</span>
                            </th>
                            <td class="px-6 py-4 text-[10px]">
                               <button class="bg-[#59D31C] text-white rounded py-[1px] px-[10px]">NEW REQUEST</button>
                            </td>
                            <td class="px-6 py-4 text-[#000000] font-normal text-[12px]">
                                {{ item.userInfo }}
                            </td>
                            <td class="px-6 py-4 text-[#000000] font-normal text-[12px]">
                                {{ item.companyName }}
                            </td>
                            <td class="px-6 py-4 max-w-[178px] text-[#000000] font-normal text-[12px]">
                                {{ item.companyAddress }}
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
    data() {
        return {
            UserItems:[
                {
                    userId:"1235532344",
                    userInfo:"Louis Venom",
                    companyName:"Zayro Logistics",
                    companyAddress:"Menlo Park, CA 94025, USA Lorem ipsum dolor sit amet consectetur, Vitae netus "
                },
                {
                    userId:"1235532344",
                    userInfo:"Louis Venom",
                    companyName:"Zayro Logistics",
                    companyAddress:"Menlo Park, CA 94025, USA Lorem ipsum dolor sit amet consectetur, Vitae netus "
                },
                {
                    userId:"1235532344",
                    userInfo:"Louis Venom",
                    companyName:"Zayro Logistics",
                    companyAddress:"Menlo Park, CA 94025, USA Lorem ipsum dolor sit amet consectetur, Vitae netus "
                },
                {
                    userId:"1235532344",
                    userInfo:"Louis Venom",
                    companyName:"Zayro Logistics",
                    companyAddress:"Menlo Park, CA 94025, USA Lorem ipsum dolor sit amet consectetur, Vitae netus "
                },
                {
                    userId:"1235532344",
                    userInfo:"Louis Venom",
                    companyName:"Zayro Logistics",
                    companyAddress:"Menlo Park, CA 94025, USA Lorem ipsum dolor sit amet consectetur, Vitae netus "
                }
            ]
        }
    },
}
</script>