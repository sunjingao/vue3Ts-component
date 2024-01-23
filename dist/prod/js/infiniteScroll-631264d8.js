"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[495],{1539:function(t,n,e){e.r(n),e.d(n,{default:function(){return m}});var l=e(6252);const o={class:"relax-doc"},i=(0,l._)("h1",null,"InfiniteScroll 无限滚动",-1),r=(0,l._)("p",null,"滚动时按需加载数据",-1),a=(0,l._)("h4",{id:"ji-chu-yong-fa"},[(0,l._)("a",{class:"header-anchor",href:"#ji-chu-yong-fa"}),(0,l.Uk)(" 基础用法")],-1),d=(0,l._)("p",null,"基础用法",-1),c=(0,l._)("pre",null,[(0,l._)("code",{class:"html"},'\n<template>\n  <div class="vInfiniteDoc" v-infinite-scroll="load">\n    <ul class="infinite-ul">\n      <li v-for="i in count" class="infinite-list-item">{{ i }}</li>\n    </ul>\n    <div class="infinite-footer">\n      <p v-if="loading">加载中...</p>\n      <p v-if="noMore">没有更多了</p>\n    </div>\n  </div>\n</template>\n<script>\n  import { ref } from \'vue\';\n\n  export default {\n    setup() {\n      const count = ref(10);\n      const loading = ref(false);\n      const noMore = ref(false);\n\n      function load(cb) {\n        loading.value = true;\n        setTimeout(\n          () => {\n            loading.value = false;\n            if (count.value === 20) {\n              return noMore.value = true;\n            } else {\n              count.value += 2;\n              cb();\n            }\n          },\n          2000\n        )\n      }\n\n      return {\n        count,\n        loading,\n        noMore,\n        load,\n      }\n    }\n  }\n<\/script>\n')],-1),s=(0,l.uE)('<h3 id="api"><a class="header-anchor" href="#api"></a> API</h3><h4 id="props"><a class="header-anchor" href="#props"></a> props</h4><table class="example-table"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>infinite-scroll-disabled</td><td>是否禁止</td><td>Boolean</td><td>-</td><td>false</td></tr><tr><td>infinite-scroll-delay</td><td>节流延时</td><td>String</td><td>-</td><td>5****00</td></tr><tr><td>infinite-scroll-distance</td><td>触发回调距离</td><td>String</td><td>-</td><td>100</td></tr></tbody></table><h4 id="method"><a class="header-anchor" href="#method"></a> method</h4><table class="example-table"><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>callback</td><td>是否禁止，其回调的第一个参数为函数，当结束滚动加载时需调用这个函数</td></tr></tbody></table>',5);var u=e(7869),h=e.n(u),f=e(9812),p={name:"component-doc",components:{"element-demo0":function(){const{renderList:t,Fragment:n,openBlock:e,createElementBlock:l,toDisplayString:o,createElementVNode:i,createCommentVNode:r,resolveDirective:a,withDirectives:d}=f;const{ref:c}=f;return{mounted(){this.$nextTick((()=>{const t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,h().highlightBlock)}))},render:function(c,s){const u=a("infinite-scroll");return d((e(),l("div",{class:"vInfiniteDoc"},[i("ul",{class:"infinite-ul"},[(e(!0),l(n,null,t(c.count,(t=>(e(),l("li",{class:"infinite-list-item"},o(t),1)))),256))]),i("div",{class:"infinite-footer"},[c.loading?(e(),l("p",{key:0},"加载中...")):r("v-if",!0),c.noMore?(e(),l("p",{key:1},"没有更多了")):r("v-if",!0)])])),[[u,c.load]])},...{setup(){const t=c(10),n=c(!1),e=c(!1);return{count:t,loading:n,noMore:e,load:function(l){n.value=!0,setTimeout((()=>{if(n.value=!1,20===t.value)return e.value=!0;t.value+=2,l()}),2e3)}}}}}}()}};var m=(0,e(3744).Z)(p,[["render",function(t,n,e,u,h,f){const p=(0,l.up)("element-demo0"),m=(0,l.up)("demo-block");return(0,l.wg)(),(0,l.iD)("section",o,[i,r,a,d,(0,l.Wm)(m,null,{source:(0,l.w5)((()=>[(0,l.Wm)(p)])),highlight:(0,l.w5)((()=>[c])),_:1}),s])}]])}}]);
//# sourceMappingURL=infiniteScroll-631264d8.js.map