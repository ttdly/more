<script>
import * as echarts from "echarts";
import { ref } from "vue";
import { useSearchStore } from "../../store/search.store";
import { queryInfo, repoStar } from "../../api";
const search = useSearchStore();
const star = ref(null);

async function getStars() {
  const totalArray = [];
  const nowDate = "";
  const currentDateArray = [];
  let after = null;
  let hasNextPage = true;
  const result = await queryInfo(repoStar, {
    id: search.id,
    after: after,
  });
  console.log(result);
  if (result.status === 200) {
    const node = result.data.data.node.stargazers.edges;
  }
}
getStars();
</script>

<template>
  <div ref="star"></div>
</template>

<style></style>
