"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[192],{5629:function(e,t,r){r.r(t),r.d(t,{default:function(){return B}});var n=r(6252);const o={class:"relax-doc"},c=(0,n._)("h1",null,"Progress 进度条",-1),s=(0,n._)("p",null,"展示进度",-1),l=(0,n._)("h4",{id:"xian-xing-jin-du-tiao"},[(0,n._)("a",{class:"header-anchor",href:"#xian-xing-jin-du-tiao"}),(0,n.Uk)(" 线型进度条")],-1),a=(0,n._)("p",null,"线型进度条",-1),p=(0,n._)("pre",null,[(0,n._)("code",{class:"html"},'\n<template>\n  <v-progress :percentage="50"></v-progress>\n  <v-progress :percentage="99"></v-progress>\n  <v-progress :percentage="100" :format="format"></v-progress>\n</template>\n<script>\n\n  export default {\n    setup() {\n      function format(val) {\n        return \'满\';\n      }\n\n      return {\n        format\n      }\n    }\n  }\n<\/script>\n')],-1),d=(0,n._)("h4",{id:"bai-fen-bi-nei-xian"},[(0,n._)("a",{class:"header-anchor",href:"#bai-fen-bi-nei-xian"}),(0,n.Uk)(" 百分比内显")],-1),g=(0,n._)("p",null,"百分比显示在进度条右侧",-1),i=(0,n._)("pre",null,[(0,n._)("code",{class:"html"},'\n<template>\n  <v-progress :text-inside="true" height="24px" :percentage="70"></v-progress>\n  <v-progress :text-inside="true" height="24px" :percentage="100"></v-progress>\n</template>\n<script>\n  export default {}\n<\/script>\n')],-1),u=(0,n._)("h4",{id:"zi-ding-yi-miao-shu"},[(0,n._)("a",{class:"header-anchor",href:"#zi-ding-yi-miao-shu"}),(0,n.Uk)(" 自定义描述")],-1),h=(0,n._)("p",null,"自定义描述内容",-1),m=(0,n._)("pre",null,[(0,n._)("code",{class:"html"},'\n<template>\n  <v-progress :text-inside="true" height="26px" :percentage="70">\n    <template #text>\n      自定义\n    </template>\n  </v-progress>\n</template>\n<script>\n  export default {}\n<\/script>\n')],-1),v=(0,n._)("h4",{id:"xian-tiao-yan-se"},[(0,n._)("a",{class:"header-anchor",href:"#xian-tiao-yan-se"}),(0,n.Uk)(" 线条颜色")],-1),f=(0,n._)("p",null,"自定义线条颜色",-1),b=(0,n._)("pre",null,[(0,n._)("code",{class:"html"},"\n<template>\n  <v-progress :percentage=\"percentage\" :bgColor=\"customColor\"></v-progress>\n  <v-progress :percentage=\"percentage\" :bgColor=\"customColorMethod\"></v-progress>\n  <v-progress :percentage=\"percentage\" :bgColor=\"customColors\"></v-progress>\n  <v-button-group>\n    <v-button @click=\"decrease\">-</v-button>\n    <v-button @click=\"increase\">+</v-button>\n  </v-button-group>\n</template>\n<script>\n  import { ref } from 'vue';\n\n  export default {\n    setup() {\n      let percentage = ref(20);\n      let customColor = ref('#409eff');\n      let customColors = ref([\n        { bgColor: '#f56c6c', percentage: 20 },\n        { bgColor: '#e6a23c', percentage: 40 },\n        { bgColor: '#5cb87a', percentage: 60 },\n        { bgColor: '#1989fa', percentage: 80 },\n        { bgColor: '#6f7ad3', percentage: 100 }\n      ]);\n\n      function customColorMethod(percentage) {\n        if (percentage < 30) {\n          return '#909399';\n        } else if (percentage < 70) {\n          return '#e6a23c';\n        } else {\n          return '#67c23a';\n        }\n      }\n\n      function increase() {\n        percentage.value += 10;\n        if (percentage.value > 100) {\n          percentage.value = 100;\n        }\n      }\n\n      function decrease() {\n        percentage.value -= 10;\n        if (percentage.value < 0) {\n          percentage.value = 0;\n        }\n      }\n\n      return {\n        percentage,\n        customColor,\n        customColors,\n        customColorMethod,\n        increase,\n        decrease,\n      }\n    },\n  }\n<\/script>\n")],-1),x=(0,n._)("h4",{id:"huan-xing-jin-du-tiao"},[(0,n._)("a",{class:"header-anchor",href:"#huan-xing-jin-du-tiao"}),(0,n.Uk)(" 环形进度条")],-1),C=(0,n._)("p",null,"以环形方式展示进度",-1),y=(0,n._)("pre",null,[(0,n._)("code",{class:"html"},'\n<template>\n  <v-progress type="circle" :percentage="0" class="vProgressDoc"></v-progress>\n  <v-progress type="circle" :percentage="10" class="vProgressDoc"></v-progress>\n  <v-progress type="circle" :percentage="25" class="vProgressDoc"></v-progress>\n  <v-progress type="circle" :percentage="35" class="vProgressDoc"></v-progress>\n  <v-progress type="circle" :percentage="50" class="vProgressDoc"></v-progress>\n  <v-progress type="circle" :percentage="65" class="vProgressDoc"></v-progress>\n  <v-progress type="circle" :percentage="75" class="vProgressDoc"></v-progress>\n  <v-progress type="circle" :percentage="85" class="vProgressDoc"></v-progress>\n  <v-progress type="circle" :percentage="100" class="vProgressDoc"></v-progress>\n</template>\n<script>\n  export default {}\n<\/script>\n')],-1),k=(0,n.uE)('<h3 id="api"><a class="header-anchor" href="#api"></a> API</h3><h4 id="props"><a class="header-anchor" href="#props"></a> props</h4><table class="example-table"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>percentage</td><td>当前进度</td><td>Number</td><td>-</td><td>-</td></tr><tr><td>type</td><td>进度条类型</td><td>String</td><td>line/circle</td><td>line</td></tr><tr><td>width</td><td>线性和圆的进度条的间距</td><td>String</td><td>-</td><td>400px</td></tr><tr><td>height</td><td>高度</td><td>String</td><td>-</td><td>6px</td></tr><tr><td>format</td><td>自定义展示内容函数</td><td>Function</td><td>-</td><td>-</td></tr><tr><td>textWidth</td><td>线性进度条的描述内容宽度</td><td>String</td><td>-</td><td>30px</td></tr><tr><td>textInside</td><td>线性滚动条的描述内容是否在内部</td><td>Boolean</td><td>-</td><td>false</td></tr><tr><td>bgColor</td><td>选中时的背景颜色</td><td>String, Array, Function</td><td>-</td><td>#409eff</td></tr><tr><td>diameter</td><td>圆形进度条的半径</td><td>String</td><td>-</td><td>150px</td></tr></tbody></table><h4 id="slot"><a class="header-anchor" href="#slot"></a> slot</h4><table class="example-table"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>text</td><td>内容</td></tr></tbody></table>',5);var _=r(7869),P=r.n(_),D=r(9812),w={name:"component-doc",components:{"element-demo0":function(){const{resolveComponent:e,createVNode:t,Fragment:r,openBlock:n,createElementBlock:o}=D;return{mounted(){this.$nextTick((()=>{const e=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(e,P().highlightBlock)}))},render:function(c,s){const l=e("v-progress");return n(),o(r,null,[t(l,{percentage:50}),t(l,{percentage:99}),t(l,{percentage:100,format:c.format},null,8,["format"])],64)},...{setup(){return{format:function(e){return"满"}}}}}}(),"element-demo1":function(){const{resolveComponent:e,createVNode:t,Fragment:r,openBlock:n,createElementBlock:o}=D;return{mounted(){this.$nextTick((()=>{const e=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(e,P().highlightBlock)}))},render:function(c,s){const l=e("v-progress");return n(),o(r,null,[t(l,{"text-inside":!0,height:"24px",percentage:70}),t(l,{"text-inside":!0,height:"24px",percentage:100})],64)}}}(),"element-demo2":function(){const{createTextVNode:e,resolveComponent:t,withCtx:r,openBlock:n,createBlock:o}=D;return{mounted(){this.$nextTick((()=>{const e=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(e,P().highlightBlock)}))},render:function(c,s){const l=t("v-progress");return n(),o(l,{"text-inside":!0,height:"26px",percentage:70},{text:r((()=>[e(" 自定义 ")])),_:1})}}}(),"element-demo3":function(){const{resolveComponent:e,createVNode:t,createTextVNode:r,withCtx:n,Fragment:o,openBlock:c,createElementBlock:s}=D;const{ref:l}=D;return{mounted(){this.$nextTick((()=>{const e=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(e,P().highlightBlock)}))},render:function(l,a){const p=e("v-progress"),d=e("v-button"),g=e("v-button-group");return c(),s(o,null,[t(p,{percentage:l.percentage,bgColor:l.customColor},null,8,["percentage","bgColor"]),t(p,{percentage:l.percentage,bgColor:l.customColorMethod},null,8,["percentage","bgColor"]),t(p,{percentage:l.percentage,bgColor:l.customColors},null,8,["percentage","bgColor"]),t(g,null,{default:n((()=>[t(d,{onClick:l.decrease},{default:n((()=>[r("-")])),_:1},8,["onClick"]),t(d,{onClick:l.increase},{default:n((()=>[r("+")])),_:1},8,["onClick"])])),_:1})],64)},...{setup(){let e=l(20),t=l("#409eff"),r=l([{bgColor:"#f56c6c",percentage:20},{bgColor:"#e6a23c",percentage:40},{bgColor:"#5cb87a",percentage:60},{bgColor:"#1989fa",percentage:80},{bgColor:"#6f7ad3",percentage:100}]);return{percentage:e,customColor:t,customColors:r,customColorMethod:function(e){return e<30?"#909399":e<70?"#e6a23c":"#67c23a"},increase:function(){e.value+=10,e.value>100&&(e.value=100)},decrease:function(){e.value-=10,e.value<0&&(e.value=0)}}}}}}(),"element-demo4":function(){const{resolveComponent:e,createVNode:t,Fragment:r,openBlock:n,createElementBlock:o}=D;return{mounted(){this.$nextTick((()=>{const e=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(e,P().highlightBlock)}))},render:function(c,s){const l=e("v-progress");return n(),o(r,null,[t(l,{type:"circle",percentage:0,class:"vProgressDoc"}),t(l,{type:"circle",percentage:10,class:"vProgressDoc"}),t(l,{type:"circle",percentage:25,class:"vProgressDoc"}),t(l,{type:"circle",percentage:35,class:"vProgressDoc"}),t(l,{type:"circle",percentage:50,class:"vProgressDoc"}),t(l,{type:"circle",percentage:65,class:"vProgressDoc"}),t(l,{type:"circle",percentage:75,class:"vProgressDoc"}),t(l,{type:"circle",percentage:85,class:"vProgressDoc"}),t(l,{type:"circle",percentage:100,class:"vProgressDoc"})],64)}}}()}};var B=(0,r(3744).Z)(w,[["render",function(e,t,r,_,P,D){const w=(0,n.up)("element-demo0"),B=(0,n.up)("demo-block"),A=(0,n.up)("element-demo1"),S=(0,n.up)("element-demo2"),W=(0,n.up)("element-demo3"),E=(0,n.up)("element-demo4");return(0,n.wg)(),(0,n.iD)("section",o,[c,s,l,a,(0,n.Wm)(B,null,{source:(0,n.w5)((()=>[(0,n.Wm)(w)])),highlight:(0,n.w5)((()=>[p])),_:1}),d,g,(0,n.Wm)(B,null,{source:(0,n.w5)((()=>[(0,n.Wm)(A)])),highlight:(0,n.w5)((()=>[i])),_:1}),u,h,(0,n.Wm)(B,null,{source:(0,n.w5)((()=>[(0,n.Wm)(S)])),highlight:(0,n.w5)((()=>[m])),_:1}),v,f,(0,n.Wm)(B,null,{source:(0,n.w5)((()=>[(0,n.Wm)(W)])),highlight:(0,n.w5)((()=>[b])),_:1}),x,C,(0,n.Wm)(B,null,{source:(0,n.w5)((()=>[(0,n.Wm)(E)])),highlight:(0,n.w5)((()=>[y])),_:1}),k])}]])}}]);
//# sourceMappingURL=progress-415aba0d.js.map