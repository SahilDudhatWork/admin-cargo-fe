<template>
    <div>
        <div>
            <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer"><nuxt-link to="/user">USERS</nuxt-link></h1>
        </div>
        <div>
            <OptionList  labelText="User list" buttonText="Add User" listWidth="88%" @add="addUser"/>
        </div>
        <div class="mt-6">
            <UserActionButton @add="allActionButtons"/>
        </div>
        <div>
            <UserTableList  :allUserData="allUserData" @handleBlock="handleBlock" @handleVerify="handleVerify"/>
        </div>
    </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"

export default {
    layout:'dashboard',
    computed:{
        ...mapGetters({
            allUserData: "user/getAllUserData",
        }),
    },
    methods: {
        ...mapActions({
            fetchAllUser:"user/fetchAllUser",
            userAddToBlock:"user/userAddToBlock",
            userVeryfication:"user/userVeryfication",
        }),
        allActionButtons(type){
            console.log(type);
        },
        addUser(){
            this.$router.push('/user/add-user')
        },
        async handleBlock(item){
            try {
            const res = await this.userAddToBlock({_id:item?._id});
            } catch (error) {
                console.log(error);
            }
        },
        async handleVerify(item){
            try {
               const res = await this.userVeryfication({_id:item._id})
            } catch (error) {
                console.log(log);
            }
        },
    },
    async mounted() {
        try {
            const res = await this.fetchAllUser();
        } catch (error) {
            console.log(error);
        }
    },
}
</script>