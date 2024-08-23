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
        <UserTableList />
    </div>
</template>

<script>
export default {
    layout:'dashboard',
    methods: {
        allActionButtons(type){
            console.log(type);
        },
        addUser(){
            this.$router.push('/user/add-user')
        }
    },
}
</script>