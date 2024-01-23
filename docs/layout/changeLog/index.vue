<template>
  <div>
    <h2>更新日志</h2>

    <v-card class="mt20">
      <template #header>
        <div class="header-content">
          <h3 class="dib fz20 m0">v2.0.0</h3>
          <span class="dib"> 2023-04-09 </span>
        </div>
      </template>
      <div>
        <h4 class="fz18 mt0">Typescript</h4>
        为组件库增加Typescript功能
      </div>
    </v-card>

    <v-card class="mt20">
      <template #header>
        <div class="header-content">
          <h3 class="dib fz20 m0">v1.1.0</h3>
          <span class="dib"> 2023-02-10 </span>
        </div>
      </template>
      <div>
        <h4 class="fz18 mt0">样式</h4>
        为全部组件增加动画效果；为全部组件增加初始化字体、背景样式，防止被外部影响
      </div>
    </v-card>

    <v-card class="mt20">
      <template #header>
        <div class="header-content">
          <h3 class="dib fz20 m0">v1.0.0</h3>
          <span class="dib"> 2023-01-13 </span>
        </div>
      </template>
      <div>
        <h4 class="fz18 mt0">开发完成</h4>
        完成组件库各组件的开发
      </div>
    </v-card>

    <v-card class="mt20">
      <template #header>
        <div class="header-content">
          <h3 class="dib fz20 m0">v0.0.0</h3>
          <span class="dib"> 2022-09-06 </span>
        </div>
      </template>
      <div>
        <h4 class="fz18 mt0">组件库文档搭建</h4>
        完成组件库文档搭建
      </div>
    </v-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'change-log'
});
</script>

<style scoped lang="scss" src="./css/index.scss"></style>
