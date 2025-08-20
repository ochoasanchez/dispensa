<template>
    <CardLayout title="Uso de ingredientes">
      <div id="ingredients-graph" class="w-80 h-90 self-center -mt-14"></div>
    </CardLayout>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import * as echarts from 'echarts';
  import CardLayout from '../layouts/CardListLayout.vue';
  
  // All the ECharts initialization code must be inside the onMounted hook
  onMounted(() => {
    // Now the DOM element is guaranteed to exist
    const myChart = echarts.init(document.getElementById('ingredients-graph'));
  
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        // top: '5%',
        orient: 'horizontal',
        // left: 'right'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'bottom'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Tomate' },
            { value: 735, name: 'Ajo' },
            { value: 580, name: 'Aceite' },
            { value: 484, name: 'Cebolla' },
            { value: 300, name: 'Harina' }
          ]
        }
      ]
    };

myChart.setOption(option);
  });
  </script>