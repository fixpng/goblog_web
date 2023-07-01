<template>
  <div id="article_calendar" style="height: 156px">

  </div>
</template>

<script setup>
import * as echarts from "echarts"
import {onMounted} from "vue";


const props = defineProps({
  theme: {
    type: Boolean,
    default: true
  },
  data_list: {
    type: Array,
    default: null
  }
})

// 文章发布热力图
async function articleCalendar() {
  let color = "#000000"
  let inRangeColor = [
    "#ebedf0", "#c6e48b", "#7bc96f", "#32af4a",
    "#1a792c", "#0f5e1e", "#0f491a", "#02340c"
  ]
  let borderColor = '#fff'

  if (!props.theme) {
    color = "#5a5a5a"
    inRangeColor = [
      "#404148", "#c6e48b", "#7bc96f", "#32af4a",
      "#1a792c", "#0f5e1e", "#0f491a", "#02340c"
    ]
    borderColor = "#222429"
  }


  let chart = document.getElementById("article_calendar")
  if (!chart) {
    return
  }

  let article_data = []
  let article_change = []
  let len = props.data_list.length
  if (len === 0) {
    return
  }

  article_change.push(props.data_list[0].date)
  article_change.push(props.data_list[len - 1].date)

  for (const item of props.data_list) {
    article_data.push([
      item.date, item.count
    ])
  }
  let myChart = echarts.init(chart, null, {locale: 'ZH'}), option = {
    tooltip: {
      padding: 10,
      backgroundColor: "#555",
      borderColor: "#777",
      borderWidth: 1,
      formatter: function (e) {
        e = e.value;
        return '<div style="font-size: 14px; color: white">' + e[0] + "：" + e[1] + "</div>"
      }
    },
    visualMap: {
      show: !0,
      showLabel: !0,
      categories: [0, 1, 2, 3, 4, 5, 6, 7],
      calculable: !0,
      inRange: {
        symbol: "rect",
        color: inRangeColor
      },  // 对应上面的四个值
      itemWidth: 12,
      itemHeight: 12,
      orient: "horizontal",
      left: "center",
      bottom: 0,
      textStyle: {
        color: color
      }
    },
    calendar: [{
      top: 25,
      left: "center",
      range: article_change,  // 时间范围
      cellSize: [13, 13],
      splitLine: {show: !1},
      itemStyle: {color: "#196127", borderColor: borderColor, borderWidth: 2},
      yearLabel: {show: !1},
      monthLabel: {
        nameMap: "cn",
        fontSize: 11,
        color: color
      },
      dayLabel: {
        formatter: "{start}  1st",
        nameMap: "cn",
        fontSize: 11,
        color: color
      }
    }],
    series: [
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        calendarIndex: 0,
        data: article_data,
      }
    ],
  };
  myChart.setOption(option)

  window.onresize = () => {
    myChart.resize();
  }
}


onMounted(() => {
  articleCalendar()
})
</script>

<style>

</style>