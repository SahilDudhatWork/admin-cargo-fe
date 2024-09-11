<template>
  <div>
    <div>
      <Content>
        <template #modalContent>
          <div class="mt-20">
            <h1 class="font-bold text-[2rem] text-[#3683D5]">
              Password Recovery
            </h1>
            <p
              class="text-[18px] text-[#494949] font-normal mt-2 max-w-[361px]"
            >
              Enter email address to get password recovery mail on registered
              email
            </p>
            <form
              class="space-y-4 md:space-y-6 mt-6"
              @submit.prevent="sendCode"
            >
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
                  v-model="forgetEmail"
                  class="xl:w-[382px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-3 py-[13px]"
                  placeholder="Email"
                />
              </div>
              <button
                type="submit"
                class="xl:w-[382px] w-full text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-5 py-[15px] text-center"
              >
                Continue
              </button>
              <p class="text-sm font-normal text-[#1E1E1E] max-w-[362px] mt-12">
                By creating an account or signing you have read and agree to our
                <span class="font-medium text-sm text-[#1E1E1E]"
                  >Terms and Conditions </span
                >and
                <span class="font-medium text-sm text-[#1E1E1E]"
                  >Privacy Policies</span
                >
              </p>
            </form>
          </div>
        </template>
      </Content>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  layout: "blank",
  data() {
    return {
      forgetEmail: "",
    };
  },
  methods: {
    ...mapActions({
      sendOtp: "auth/sendOtp",
    }),
    async sendCode() {
      try {
        if (!this.forgetEmail) {
          this.$toast.open({
            message: this.$i18n.t("requiredErrorMessage"),
            type: "error",
            duration: 2000,
            position: "bottom-right",
          });
        } else {
          const res = await this.sendOtp({ email: this.forgetEmail });
          this.$toast.open({
            message: res.msg,
            type: "success",
            duration: 2000,
            position: "bottom-right",
          });
          this.$cookies.set("email", this.forgetEmail, { expires: 1 });
          this.$router.push("/email-sent");
        }
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
          duration: 2000,
          position: "bottom-right",
        });
      }
    },
  },
};
</script>
