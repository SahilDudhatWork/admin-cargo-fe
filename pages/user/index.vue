<template>
    <div>
        <div>
            <OptionList  labelText="User list" buttonText="Add User" listWidth="88%"/>
        </div>
        <div class="mt-6">
            <UserActionButton />
        </div>
        <UserTableList />
    </div>
</template>

<script>
export default {
    layout:'dashboard'
}
</script>