<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-10 col-lg-8 mx-auto">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center">
              Document Center
            </h1>
            <form @submit.prevent="submitLocalLogin">
              <div class="form-group">
                <label for="account">帳號</label>
                <input
                  id="account"
                  v-model="account"
                  type="text"
                  class="form-control"
                  required
                >
              </div>
              <div class="form-group mb-3">
                <label for="passWord">密碼</label>
                <input
                  id="passWord"
                  v-model="passwd"
                  type="password"
                  class="form-control"
                  required
                >
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block mb-3">
                  登入
                </button>
              </div>
              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-secondary btn-block"
                  @click="SignInWithGoogle"
                >
                  使用Google登入
                </button>
              </div>
              <div class="text-center mt-3">
                <RouterLink :to="{name: 'SignUp'}" class="btn btn-link">
                  註冊
                </RouterLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { localLogin } from "@/apis/auth.js";
import { useUserStore } from "@/stores/user.js";
import { setLocalToken } from "@/utils/storage.js";
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { setToken, logout, login } = useUserStore();
const router = useRouter();
const route = useRoute();

const account = ref('');
const passwd = ref('');

onMounted(() => {
  const message = route.params?.message;
  if (message) alert(message);

  if (route?.query?.status_code === '401') {
    alert('登入失敗');
  }else if (route?.query?.status_code === '200' && route?.query?.token) {
    const token = route.query.token
    login(token)
    
    router.push({ name: 'file.index' });

    alert('登入成功')
  }
});

const submitLocalLogin = async () => {
  if (!account.value || !passwd.value) {
    alert('請輸入帳號密碼');
    return;
  }

  try {
    const resp = await localLogin({
      account: account.value,
      passwd: passwd.value
    });
    if (resp.status !== 200) throw new Error(resp?.data?.message);
    
    const token = resp.headers?.authorization?.split('Bearer ')?.[1];
    if (!token) throw new Error('無法取得 token');
    
    console.log('登入成功');

    setToken(token);
    setLocalToken(token);

    router.push({ name: 'file.index'});
  } catch (error) {
    console.error('登入失敗，錯誤訊息：' + error.message);
    alert('登入失敗，錯誤訊息：' + error.message);
  }
};

const SignInWithGoogle = () => {
  // 你的 Google 登入邏輯
  // const response = googleLogin()
  window.location.href = `${window.location.origin}/api/auth/google/login`;
};

</script>
