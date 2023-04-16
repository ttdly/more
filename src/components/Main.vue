<script setup>
import { ref } from "vue";
import { queryInfo, searchBase, searchUser, searchRepo } from "../api";
import { useSearchStore } from "../store/search.store";
import { useRouter } from "vue-router";

const searchInfo = ref({
  query: "ttdly",
  type: "USER",
  num: 10,
});
const searchRes = ref({});
const searchStore = useSearchStore();
const show = ref("");
const router = useRouter();

async function search() {
  let result;
  if (searchInfo.value.type === "USER") {
    result = await queryInfo(searchBase(searchUser), searchInfo.value);
    if (result.status === 200) {
      searchRes.value = result.data.data.search;
      show.value = "USER";
    }
  } else if (searchInfo.value.type === "REPOSITORY") {
    result = await queryInfo(searchBase(searchRepo), searchInfo.value);
    if (result.status === 200) {
      searchRes.value = result.data.data.search;
      show.value = "REPOSITORY";
    }
  }
}

function toMore(type, id) {
  searchStore.init(type, id);
  if(type === 'REPOSITORY'){
    router.push({ path: "/repo" });
  }
  if(type === 'USER'){
    router.push({ path: "/user" });
  }
}
</script>
<template>
  <el-input
    v-model="searchInfo.query"
    placeholder="输入关键字"
    class="input-with-select">
    <template #prepend>
      <el-select
        v-model="searchInfo.type"
        placeholder="type"
        style="width: 10rem">
        <el-option label="REPOSITORY" value="REPOSITORY" />
        <el-option label="USER" value="USER" />
      </el-select>
    </template>
    <template #append>
      <el-button @click="search"> 搜索 </el-button>
    </template>
  </el-input>
  <template v-if="show === 'USER'" v-for="item in searchRes.nodes">
    <div class="search-item">
      <span>
        <el-link :href="item.url" target="_blank" type="primary">{{
          item.login
        }}</el-link
        ><el-text style="margin-left: 5px; font-weight: bold">{{
          item.name
        }}</el-text>
      </span>
      <el-button size="small" @click="toMore(searchInfo.type, item.id)"
        >more</el-button
      >
    </div>
  </template>
  <template v-if="show === 'REPOSITORY'" v-for="item in searchRes.nodes">
    <div class="search-item">
      <span>
        <el-link :href="item.url" target="_blank" type="primary">{{
          `${item.nameWithOwner}`
        }}</el-link
        ><el-text style="margin-left: 5px; font-weight: bold">{{
          item.owner.login
        }}</el-text>
        <div>
          <el-text>
            {{ item.description }}
          </el-text>
        </div>
      </span>
      <el-button size="small" @click="toMore(searchInfo.type, item.id)"
        >more</el-button
      >
    </div>
  </template>
</template>
<style scoped>
.search-item {
  padding: 10px 5px;
  border-bottom: 2px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
}
</style>
