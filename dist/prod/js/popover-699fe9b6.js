"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[467],{9367:function(t,e,n){n.r(e),n.d(e,{default:function(){return g}});var o=n(6252);const l={class:"relax-doc"},c=(0,o._)("h1",null,"Popover 弹出框",-1),r=(0,o._)("p",null,"鼠标在节点上操作时进行数据展示",-1),a=(0,o._)("h4",{id:"ji-ben-yong-fa"},[(0,o._)("a",{class:"header-anchor",href:"#ji-ben-yong-fa"}),(0,o.Uk)(" 基本用法")],-1),s=(0,o._)("p",null,"基本用法",-1),d=(0,o._)("pre",null,[(0,o._)("code",{class:"html"},'\n<template>\n\n  <v-popover\n    content="this is hover content"\n    placement="bottom-start"\n  >\n    <v-button>hover</v-button>\n  </v-popover>\n\n  <v-popover\n    class="v-ml20"\n    content="this is focus content"\n    placement="bottom-start"\n    trigger="focus"\n  >\n    <v-button>focus</v-button>\n  </v-popover>\n\n  <v-popover\n    class="v-ml20"\n    content="this is click content"\n    placement="bottom-start"\n    trigger="click"\n  >\n    <v-button>click</v-button>\n  </v-popover>\n\n  <v-popover\n    class="v-ml20"\n    content="this is manual content"\n    placement="bottom-start"\n    trigger="manual"\n  >\n    <v-button>manual</v-button>\n  </v-popover>\n</template>\n<script>\n')],-1),i=(0,o._)("h4",{id:"zi-ding-yi-zhan-shi"},[(0,o._)("a",{class:"header-anchor",href:"#zi-ding-yi-zhan-shi"}),(0,o.Uk)(" 自定义展示")],-1),p=(0,o._)("p",null,"展示自定义内容",-1),v=(0,o._)("pre",null,[(0,o._)("code",{class:"html"},'\n<template>\n\n  <div class="vPopoverDoc">\n    <v-popover placement="bottom-start" trigger="hover">\n      <template #content>\n        <div class="popperBody">\n          <div>title</div>\n          <div class="body-content">hover</div>\n        </div>\n      </template>\n      <v-button>hover</v-button>\n    </v-popover>\n\n    <v-popover placement="bottom-start" trigger="click" class="v-ml20">\n      <template #content>\n        <div class="popperBody">\n          <div>title</div>\n          <div class="body-content">hover</div>\n        </div>\n      </template>\n      <v-button>click</v-button>\n    </v-popover>\n  </div>\n</template>\n<script>\n')],-1),h=(0,o.uE)('<h3 id="api"><a class="header-anchor" href="#api"></a> API</h3><h4 id="props"><a class="header-anchor" href="#props"></a> props</h4><table class="example-table"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>trigger</td><td>触发方式</td><td>String</td><td>hover、focus、click、manual</td><td>hover</td></tr><tr><td>其它内容</td><td>参考 v-tooltip文档</td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h4 id="slot"><a class="header-anchor" href="#slot"></a> slot</h4><table class="example-table"><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>default</td><td>popper依赖元素</td></tr><tr><td>content</td><td>popper内容</td></tr></tbody></table>',5);var u=n(7869),m=n.n(u),b=n(9812),f={name:"component-doc",components:{"element-demo0":function(){const{createTextVNode:t,resolveComponent:e,withCtx:n,createVNode:o,Fragment:l,openBlock:c,createElementBlock:r}=b;return{mounted(){this.$nextTick((()=>{const t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,m().highlightBlock)}))},render:function(a,s){const d=e("v-button"),i=e("v-popover");return c(),r(l,null,[o(i,{content:"this is hover content",placement:"bottom-start"},{default:n((()=>[o(d,null,{default:n((()=>[t("hover")])),_:1})])),_:1}),o(i,{class:"v-ml20",content:"this is focus content",placement:"bottom-start",trigger:"focus"},{default:n((()=>[o(d,null,{default:n((()=>[t("focus")])),_:1})])),_:1}),o(i,{class:"v-ml20",content:"this is click content",placement:"bottom-start",trigger:"click"},{default:n((()=>[o(d,null,{default:n((()=>[t("click")])),_:1})])),_:1}),o(i,{class:"v-ml20",content:"this is manual content",placement:"bottom-start",trigger:"manual"},{default:n((()=>[o(d,null,{default:n((()=>[t("manual")])),_:1})])),_:1})],64)}}}(),"element-demo1":function(){const{createElementVNode:t,createTextVNode:e,resolveComponent:n,withCtx:o,createVNode:l,openBlock:c,createElementBlock:r}=b;return{mounted(){this.$nextTick((()=>{const t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,m().highlightBlock)}))},render:function(a,s){const d=n("v-button"),i=n("v-popover");return c(),r("div",{class:"vPopoverDoc"},[l(i,{placement:"bottom-start",trigger:"hover"},{content:o((()=>[t("div",{class:"popperBody"},[t("div",null,"title"),t("div",{class:"body-content"},"hover")])])),default:o((()=>[l(d,null,{default:o((()=>[e("hover")])),_:1})])),_:1}),l(i,{placement:"bottom-start",trigger:"click",class:"v-ml20"},{content:o((()=>[t("div",{class:"popperBody"},[t("div",null,"title"),t("div",{class:"body-content"},"hover")])])),default:o((()=>[l(d,null,{default:o((()=>[e("click")])),_:1})])),_:1})])}}}()}};var g=(0,n(3744).Z)(f,[["render",function(t,e,n,u,m,b){const f=(0,o.up)("element-demo0"),g=(0,o.up)("demo-block"),k=(0,o.up)("element-demo1");return(0,o.wg)(),(0,o.iD)("section",l,[c,r,a,s,(0,o.Wm)(g,null,{source:(0,o.w5)((()=>[(0,o.Wm)(f)])),highlight:(0,o.w5)((()=>[d])),_:1}),i,p,(0,o.Wm)(g,null,{source:(0,o.w5)((()=>[(0,o.Wm)(k)])),highlight:(0,o.w5)((()=>[v])),_:1}),h])}]])}}]);
//# sourceMappingURL=popover-699fe9b6.js.map