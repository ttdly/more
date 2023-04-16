<script setup="props">
import { computed, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
const props = defineProps(["data"]);

const data = ref([]);
const radar = ref(null);
const ability = ref({});
data.value = props.data;

onMounted(() => {
  ability.value = echarts.init(radar.value);
  let max = 0;
  for (const i of data.value) {
    max += i;
  }
  const option = {
    title: {
      text: "总体数据",
    },
    radar: {
      indicator: [
        { name: "Star", max: max, axisLabel: { show: false } },
        { name: "Watch", max: max },
        { name: "Fork", max: max },
        { name: "Commit", max: max },
      ],
      startAngle: 180,
      splitNumber: 0,
      radius: "65%",
    },
    series: [
      {
        type: "radar",
        itemStyle: {
          color: " #529b2e",
        },
        areaStyle: {},
        data: [
          {
            value: data.value,
            label: {
              show: true,
            },
          },
        ],
      },
    ],
  };
  ability.value.setOption(option, true);
});
</script>

<template>
  <div id="abilityChart" ref="radar"></div>
</template>

<style></style>
