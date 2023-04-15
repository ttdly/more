<script setup>
import { ref } from "vue";
import { queryInfo } from "./api";
import { viewerInfo } from "./api/query";
import { useStore } from "./store/user.store";

const userInfo = useStore();
const viewer = ref({
  login: false,
  name: false,
  avatarUrl: false,
});

async function getViewerInfo() {
  const result = await queryInfo(viewerInfo, null);
  if (result.status === 200) {
    viewer.value = result.data.data.viewer;
  }
}

getViewerInfo();
</script>

<template>
  <el-container>
    <el-header>
      <div class="base-info" v-if="viewer.login">
        <el-avatar
          v-if="viewer.avatarUrl"
          :size="20"
          :src="viewer.avatarUrl"
          @error="() => true">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
        <el-text v-if="viewer.name">{{ viewer.name }}</el-text>
        <el-text v-else>{{ viewer.login }}</el-text>
      </div>
      <div v-else>
        <el-link
          href="https://github.com/login/oauth/authorize?client_id=6dc16b2d67cad2880bc2&redirect_uri=http://localhost:5173/login"
          >GitHub登录</el-link
        >
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
}

.base-info {
  display: flex;
  justify-content: center;
}
.el-avatar {
  margin-right: 0.5rem;
}
</style>
