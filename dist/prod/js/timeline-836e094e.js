"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[831],{1648:function(t,e,n){n.r(e),n.d(e,{default:function(){return w}});var i=n(6252);const l={class:"relax-doc"},r=(0,i._)("h1",null,"Timeline 时间线",-1),c=(0,i._)("p",null,"展示时间进度与主要记录",-1),a=(0,i._)("h4",{id:"ji-ben-yong-fa"},[(0,i._)("a",{class:"header-anchor",href:"#ji-ben-yong-fa"}),(0,i.Uk)(" 基本用法")],-1),o=(0,i._)("p",null,"基本用法",-1),m=(0,i._)("pre",null,[(0,i._)("code",{class:"html"},"\n<template>\n\n  <v-timeline>\n    <v-timeline-item\n      v-for=\"(activity, index) in activities\"\n      :key=\"index\"\n      :content=\"activity.timestamp\"\n      :title=\"activity.title\"\n    >\n    </v-timeline-item>\n  </v-timeline>\n</template>\n<script>\n  import { ref } from 'vue';\n\n  export default {\n    setup() {\n      const activities = ref([\n        {\n          title: '活动按期开始',\n          timestamp: '2018-04-15'\n        },\n        {\n          title: '通过审核',\n          timestamp: '2018-04-13'\n        },\n        {\n          title: '创建成功',\n          timestamp: '2018-04-11'\n        }\n      ])\n      return {\n        activities\n      }\n    }\n  }\n<\/script>\n")],-1),s=(0,i._)("h4",{id:"yan-se-pei-zhi"},[(0,i._)("a",{class:"header-anchor",href:"#yan-se-pei-zhi"}),(0,i.Uk)(" 颜色配置")],-1),d=(0,i._)("p",null,"自定义线和圆形的颜色",-1),p=(0,i._)("pre",null,[(0,i._)("code",{class:"html"},"\n<template>\n\n  <div class=\"vTimelineDoc\">\n    <v-timeline>\n      <v-timeline-item\n        v-for=\"(activity, index) in activities1\"\n        :key=\"index\"\n        :content=\"activity.timestamp\"\n        :title=\"activity.title\"\n        :circularColor=\"activity.circularColor\"\n        :lineColor=\"activity.lineColor\"\n      >\n      </v-timeline-item>\n    </v-timeline>\n\n\n    <v-timeline>\n      <v-timeline-item\n        v-for=\"(activity, index) in activities2\"\n        :key=\"index\"\n        :content=\"activity.timestamp\"\n        :title=\"activity.title\"\n      >\n        <template #circular>\n          <div class=\"circular-test\"></div>\n        </template>\n        <template #line>\n          <div class=\"line-test\" :class=\"index === activities2.length - 1 && 'isLast'\"></div>\n        </template>\n      </v-timeline-item>\n    </v-timeline>\n  </div>\n</template>\n<script>\n  import { ref } from 'vue';\n\n  export default {\n    setup() {\n      const activities1 = ref([\n        {\n          title: '支持自定义颜色',\n          timestamp: '2018-04-12 20:46',\n          size: 'large',\n          type: 'primary',\n          icon: 'el-icon-more'\n        },\n        {\n          title: '支持自定义颜色',\n          timestamp: '2018-04-03 20:46',\n          circularColor: 'red',\n          lineColor: 'blue',\n        },\n        {\n          title: '支持自定义颜色',\n          timestamp: '2018-04-03 20:46',\n          size: 'large'\n        },\n        {\n          title: '支持自定义颜色',\n          timestamp: '2018-04-03 20:46'\n        }\n      ]);\n      const activities2 = ref([\n        {\n          title: '自定义图形',\n          timestamp: '2018-04-12 20:46',\n          size: 'large',\n          type: 'primary',\n          icon: 'el-icon-more'\n        },\n        {\n          title: '自定义图形',\n          timestamp: '2018-04-03 20:46',\n        },\n        {\n          title: '自定义图形',\n          timestamp: '2018-04-03 20:46',\n          size: 'large'\n        },\n        {\n          title: '自定义图形',\n          timestamp: '2018-04-03 20:46'\n        }\n      ]);\n\n      return {\n        activities1,\n        activities2\n      }\n    },\n  }\n<\/script>\n")],-1),h=(0,i._)("h4",{id:"ding-yi-shi-jian-wei-zhi"},[(0,i._)("a",{class:"header-anchor",href:"#ding-yi-shi-jian-wei-zhi"}),(0,i.Uk)(" ⾃定义时间位置")],-1),u=(0,i._)("p",null,"时间可以位于上方展示",-1),v=(0,i._)("pre",null,[(0,i._)("code",{class:"html"},'\n<template>\n\n  <v-timeline>\n    <v-timeline-item content="2018/4/12" placement="top" title="模板">\n    </v-timeline-item>\n    <v-timeline-item content="2018/4/3" placement="top" title="模板">\n    </v-timeline-item>\n    <v-timeline-item content="2018/4/2" placement="top" title="模板">\n    </v-timeline-item>\n  </v-timeline>\n</template>\n')],-1),f=(0,i._)("h4",{id:"ding-yi-zhan-shi"},[(0,i._)("a",{class:"header-anchor",href:"#ding-yi-zhan-shi"}),(0,i.Uk)(" ⾃定义展示")],-1),y=(0,i._)("p",null,"自定义展示内容",-1),g=(0,i._)("pre",null,[(0,i._)("code",{class:"html"},'\n<template>\n\n  <div class="vTimelineDoc">\n    <v-timeline>\n      <v-timeline-item content="2018/4/12" title="模板">\n        <v-card class="mb20">\n          <h4>更新 Github 模板</h4>\n          <p>提交于 2018/4/12 20:46</p>\n        </v-card>\n      </v-timeline-item>\n      <v-timeline-item content="2018/4/3" title="模板">\n        <v-card class="mb20">\n          <h4>更新 Github 模板</h4>\n          <p>提交于 2018/4/3 20:46</p>\n        </v-card>\n      </v-timeline-item>\n      <v-timeline-item content="2018/4/2" title="模板">\n        <v-card class="mb20">\n          <h4>更新 Github 模板</h4>\n          <p>提交于 2018/4/2 20:46</p>\n        </v-card>\n      </v-timeline-item>\n    </v-timeline>\n  </div>\n</template>\n')],-1),_=(0,i.uE)('<h3 id="api"><a class="header-anchor" href="#api"></a> API</h3><h4 id="props"><a class="header-anchor" href="#props"></a> props</h4><table class="example-table"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>content</td><td>世间</td><td>String</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>placement</td><td>时间的位置</td><td>String</td><td>bottom/top</td><td>bottom</td></tr><tr><td>title</td><td>描述</td><td>String</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>circularColor</td><td>圆的颜色</td><td>String</td><td>-</td><td>#e4e7ed</td></tr><tr><td>lineColor</td><td>线的颜色</td><td>String</td><td>-</td><td>#e4e7ed</td></tr></tbody></table><h4 id="slot"><a class="header-anchor" href="#slot"></a> slot</h4><table class="example-table"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>default</td><td>右侧描述和时间的部分</td></tr><tr><td>circular</td><td>自定义圆</td></tr><tr><td>line</td><td>自定义线</td></tr><tr><td>content</td><td>内容</td></tr></tbody></table>',5);var k=n(7869),b=n.n(k),C=n(9812),x={name:"component-doc",components:{"element-demo0":function(){const{renderList:t,Fragment:e,openBlock:n,createElementBlock:i,resolveComponent:l,createBlock:r,withCtx:c}=C;const{ref:a}=C;return{mounted(){this.$nextTick((()=>{const t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,b().highlightBlock)}))},render:function(a,o){const m=l("v-timeline-item"),s=l("v-timeline");return n(),r(s,null,{default:c((()=>[(n(!0),i(e,null,t(a.activities,((t,e)=>(n(),r(m,{key:e,content:t.timestamp,title:t.title},null,8,["content","title"])))),128))])),_:1})},...{setup(){return{activities:a([{title:"活动按期开始",timestamp:"2018-04-15"},{title:"通过审核",timestamp:"2018-04-13"},{title:"创建成功",timestamp:"2018-04-11"}])}}}}}(),"element-demo1":function(){const{renderList:t,Fragment:e,openBlock:n,createElementBlock:i,resolveComponent:l,createBlock:r,withCtx:c,createVNode:a,createElementVNode:o,normalizeClass:m}=C;const{ref:s}=C;return{mounted(){this.$nextTick((()=>{const t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,b().highlightBlock)}))},render:function(s,d){const p=l("v-timeline-item"),h=l("v-timeline");return n(),i("div",{class:"vTimelineDoc"},[a(h,null,{default:c((()=>[(n(!0),i(e,null,t(s.activities1,((t,e)=>(n(),r(p,{key:e,content:t.timestamp,title:t.title,circularColor:t.circularColor,lineColor:t.lineColor},null,8,["content","title","circularColor","lineColor"])))),128))])),_:1}),a(h,null,{default:c((()=>[(n(!0),i(e,null,t(s.activities2,((t,e)=>(n(),r(p,{key:e,content:t.timestamp,title:t.title},{circular:c((()=>[o("div",{class:"circular-test"})])),line:c((()=>[o("div",{class:m(["line-test",e===s.activities2.length-1&&"isLast"])},null,2)])),_:2},1032,["content","title"])))),128))])),_:1})])},...{setup(){return{activities1:s([{title:"支持自定义颜色",timestamp:"2018-04-12 20:46",size:"large",type:"primary",icon:"el-icon-more"},{title:"支持自定义颜色",timestamp:"2018-04-03 20:46",circularColor:"red",lineColor:"blue"},{title:"支持自定义颜色",timestamp:"2018-04-03 20:46",size:"large"},{title:"支持自定义颜色",timestamp:"2018-04-03 20:46"}]),activities2:s([{title:"自定义图形",timestamp:"2018-04-12 20:46",size:"large",type:"primary",icon:"el-icon-more"},{title:"自定义图形",timestamp:"2018-04-03 20:46"},{title:"自定义图形",timestamp:"2018-04-03 20:46",size:"large"},{title:"自定义图形",timestamp:"2018-04-03 20:46"}])}}}}}(),"element-demo2":function(){const{resolveComponent:t,createVNode:e,withCtx:n,openBlock:i,createBlock:l}=C;return{mounted(){this.$nextTick((()=>{const t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,b().highlightBlock)}))},render:function(r,c){const a=t("v-timeline-item"),o=t("v-timeline");return i(),l(o,null,{default:n((()=>[e(a,{content:"2018/4/12",placement:"top",title:"模板"}),e(a,{content:"2018/4/3",placement:"top",title:"模板"}),e(a,{content:"2018/4/2",placement:"top",title:"模板"})])),_:1})}}}(),"element-demo3":function(){const{createElementVNode:t,resolveComponent:e,withCtx:n,createVNode:i,openBlock:l,createElementBlock:r}=C;return{mounted(){this.$nextTick((()=>{const t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,b().highlightBlock)}))},render:function(c,a){const o=e("v-card"),m=e("v-timeline-item"),s=e("v-timeline");return l(),r("div",{class:"vTimelineDoc"},[i(s,null,{default:n((()=>[i(m,{content:"2018/4/12",title:"模板"},{default:n((()=>[i(o,{class:"mb20"},{default:n((()=>[t("h4",null,"更新 Github 模板"),t("p",null,"提交于 2018/4/12 20:46")])),_:1})])),_:1}),i(m,{content:"2018/4/3",title:"模板"},{default:n((()=>[i(o,{class:"mb20"},{default:n((()=>[t("h4",null,"更新 Github 模板"),t("p",null,"提交于 2018/4/3 20:46")])),_:1})])),_:1}),i(m,{content:"2018/4/2",title:"模板"},{default:n((()=>[i(o,{class:"mb20"},{default:n((()=>[t("h4",null,"更新 Github 模板"),t("p",null,"提交于 2018/4/2 20:46")])),_:1})])),_:1})])),_:1})])}}}()}};var w=(0,n(3744).Z)(x,[["render",function(t,e,n,k,b,C){const x=(0,i.up)("element-demo0"),w=(0,i.up)("demo-block"),z=(0,i.up)("element-demo1"),B=(0,i.up)("element-demo2"),E=(0,i.up)("element-demo3");return(0,i.wg)(),(0,i.iD)("section",l,[r,c,a,o,(0,i.Wm)(w,null,{source:(0,i.w5)((()=>[(0,i.Wm)(x)])),highlight:(0,i.w5)((()=>[m])),_:1}),s,d,(0,i.Wm)(w,null,{source:(0,i.w5)((()=>[(0,i.Wm)(z)])),highlight:(0,i.w5)((()=>[p])),_:1}),h,u,(0,i.Wm)(w,null,{source:(0,i.w5)((()=>[(0,i.Wm)(B)])),highlight:(0,i.w5)((()=>[v])),_:1}),f,y,(0,i.Wm)(w,null,{source:(0,i.w5)((()=>[(0,i.Wm)(E)])),highlight:(0,i.w5)((()=>[g])),_:1}),_])}]])}}]);
//# sourceMappingURL=timeline-836e094e.js.map