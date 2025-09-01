<template>
    <CardLayout title="Stock actual (%)">
      <div id="stock-graph" class="w-80 h-90 self-center -mt-14"></div>
    </CardLayout>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import * as echarts from 'echarts';
  import CardLayout from '../layouts/CardListLayout.vue';
  
  // All the ECharts initialization code must be inside the onMounted hook
  onMounted(() => {
    // Now the DOM element is guaranteed to exist
    const myChart = echarts.init(document.getElementById('stock-graph'));
  
    const option = {
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    // The ingredients translated to Spanish
    data: ['Tomate', 'Espinaca', 'Zanahoria', 'Limón', 'Berenjena', 'Aguacate', 'Harina']
  },
  series: [
    {
      type: 'bar',
      data: [
        { value: 95, itemStyle: { color: '#f44336' } },
        { value: 80, itemStyle: { color: '#4caf50' } },
        { value: 65, itemStyle: { color: '#ff9800' } },
        { value: 90, itemStyle: { color: '#ffeb3b' } },
        { value: 75, itemStyle: { color: '#673ab7' } },
        { value: 55, itemStyle: { color: '#8bc34a' } },
        { value: 40, itemStyle: { color: '#e0e0e0' } }
      ]
    }
  ]
};

myChart.setOption(option);
  });
  </script>