<script setup>
import { useSearchStore } from "../store/search.store";
import { queryInfo, repoBaseInfo } from "../api/index.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import RepoAbility from "./repo/Ability.vue";
import RepoStar from "./repo/Star.vue";

onMounted(() => {
  getInfo();
});

const searchStore = useSearchStore();
const baseInfo = ref({
  name: false,
});
const ability = ref([]);
const router = useRouter();

async function getInfo() {
  const result = await queryInfo(repoBaseInfo, { id: searchStore.id });
  if (result.status === 200) {
    let node = result.data.data.node;
    baseInfo.value = node;
    ability.value = [
      node.stargazerCount,
      node.forkCount,
      node.watchers.totalCount,
      node.defaultBranchRef.target.history.totalCount,
    ];
  }
  console.log(result);
}
</script>

<template>
  <el-page-header @back="router.back" v-if="baseInfo.name">
    <template #content>
      <div class="flex items-center">
        <el-avatar class="mr-3" :size="32" :src="baseInfo.owner.avatarUrl" />
        <el-link
          class="margin-left-1"
          type="primary"
          :href="baseInfo.url"
          target="_blank"
          >{{ baseInfo.nameWithOwner }}</el-link
        >
        <el-tag class="margin-left-1" size="small" type="info">{{
          new Date(baseInfo.createdAt).toLocaleDateString("zh")
        }}</el-tag>
      </div>
    </template>
  </el-page-header>
  <RepoAbility
    v-if="baseInfo.name"
    style="height: 20rem; width: 20rem; border: 1px solid"
    :data="ability" />
  <RepoStar v-if="baseInfo.name" />
</template>

<style scoped></style>
