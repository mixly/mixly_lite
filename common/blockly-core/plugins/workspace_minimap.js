/*! For license information please see index.js.LICENSE.txt */
!function(t,i){if("object"==typeof exports&&"object"==typeof module)module.exports=i(require("blockly/core"));else if("function"==typeof define&&define.amd)define(["blockly/core"],i);else{var e="object"==typeof exports?i(require("blockly/core")):i(t.Blockly);for(var o in e)("object"==typeof exports?exports:t)[o]=e[o]}}(this,(t=>(()=>{"use strict";var i={224:(t,i,e)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.FocusRegion=void 0;var o=e(573),s=new Set([o.Events.VIEWPORT_CHANGE,o.Events.BLOCK_CHANGE,o.Events.BLOCK_CREATE,o.Events.BLOCK_DELETE,o.Events.BLOCK_DRAG,o.Events.BLOCK_MOVE]),n=function(){function t(t,i){this.primaryWorkspace=t,this.minimapWorkspace=i,this.initialized=!1,this.id=String(Math.random()).substring(2),this.closed=!1}return t.prototype.init=function(){var t=this;this.svgGroup=o.utils.dom.createSvgElement(o.utils.Svg.G,{class:"blockly-focus-region"},null);var i=o.utils.dom.createSvgElement(new o.utils.Svg("mask"),{id:"focusRegionMask"+this.id},this.svgGroup);this.background=o.utils.dom.createSvgElement(o.utils.Svg.RECT,{x:0,y:0,width:"100%",height:"100%",mask:"url(#focusRegionMask"+this.id+")"},this.svgGroup),o.utils.dom.createSvgElement(o.utils.Svg.RECT,{x:0,y:0,width:"100%",height:"100%",fill:"white"},i),this.rect=o.utils.dom.createSvgElement(o.utils.Svg.RECT,{x:0,y:0,rx:6,ry:6,fill:"black"},i);var e=this.minimapWorkspace.getParentSvg();e.firstChild?e.insertBefore(this.svgGroup,e.firstChild):e.appendChild(this.svgGroup),window.addEventListener("resize",(function(){t.update()})),this.onChangeWrapper=this.onChange.bind(this),this.primaryWorkspace.addChangeListener(this.onChangeWrapper),this.update(),this.initialized=!0},t.prototype.dispose=function(){this.onChangeWrapper&&(this.primaryWorkspace.removeChangeListener(this.onChangeWrapper),this.onChangeWrapper=null),this.svgGroup&&o.utils.dom.removeNode(this.svgGroup),this.svgGroup=null,this.rect=null,this.background=null,this.initialized=!1},t.prototype.onChange=function(t){s.has(t.type)&&this.minimapWorkspace.getTopBlocks(!1).length&&!this.closed&&this.primaryWorkspace.isVisible()&&this.update()},t.prototype.update=function(){var t=this.primaryWorkspace.getMetricsManager(),i=this.minimapWorkspace.getMetricsManager(),e=t.getViewMetrics(!0),o=t.getContentMetrics(!0),s=i.getContentMetrics(),n=i.getSvgMetrics();if(0===o.width)return this.rect.setAttribute("width",e.width.toString()),void this.rect.setAttribute("height",e.height.toString());var r=s.width/i.getContentMetrics(!0).width,a=e.width*r,p=e.height*r,h=(e.left-o.left)*r,c=(e.top-o.top)*r;h+=(n.width-s.width)/2,c+=(n.height-s.height)/2,this.rect.setAttribute("transform","translate(".concat(h,",").concat(c,")")),this.rect.setAttribute("width",a.toString()),this.rect.setAttribute("height",p.toString())},t.prototype.isEnabled=function(){return this.initialized},t}();i.FocusRegion=n,o.Css.register("\n.dark-theme .blockly-focus-region {\n  fill: #333333;\n}\n\n.blockly-focus-region {\n  fill: #e6e6e6;\n}\n")},351:(t,i,e)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.Minimap=void 0;var o=e(573),s=e(224),n=new Set([o.Events.BLOCK_CHANGE,o.Events.BLOCK_CREATE,o.Events.BLOCK_DELETE,o.Events.BLOCK_DRAG,o.Events.BLOCK_MOVE]),r=function(){function t(t){this.primaryWorkspace=t,this.closed=!1,this.btn=null}return t.prototype.init=function(){var t=this;this.minimapWrapper=document.createElement("div"),this.minimapWrapper.id="minimapWrapper"+this.primaryWorkspace.id,this.minimapWrapper.className="blockly-minimap";var i=document.createElement("div");i.setAttribute("style","\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n        padding: 3px;\n        "),this.btn=document.createElement("button"),this.btn.innerHTML=o.Msg.MINIMAP_CLOSE,this.btn.className="layui-btn self-adaption-btn layui-btn-xs",i.appendChild(this.btn);var e=this.primaryWorkspace.getInjectionDiv().parentNode;e.appendChild(this.minimapWrapper);var n=this.primaryWorkspace.getRenderer().getClassName();n=n.split("-")[0],this.minimapWorkspace=o.inject(this.minimapWrapper,{rtl:this.primaryWorkspace.RTL,move:{scrollbars:!0,drag:!1,wheel:!1},zoom:{maxScale:null,minScale:null},readOnly:!0,renderer:n,theme:this.primaryWorkspace.getTheme()}),this.minimapWrapper.appendChild(i),this.minimapWorkspace.scrollbar.setContainerVisible(!1),this.primaryWorkspace.addChangeListener((function(i){t.mirror(i)})),o.browserEvents.bind(this.btn,"click",this,this.changeStatus),window.addEventListener("resize",(function(){t.minimapWorkspace.zoomToFit()})),this.onMouseDownWrapper=o.browserEvents.bind(this.minimapWorkspace.svgGroup_,"mousedown",this,this.onClickDown),this.onMouseUpWrapper=o.browserEvents.bind(e,"mouseup",this,this.onClickUp),this.focusRegion=new s.FocusRegion(this.primaryWorkspace,this.minimapWorkspace),this.enableFocusRegion()},t.prototype.changeStatus=function(){this.closed=!this.closed,this.closed?this.btn.innerHTML=o.Msg.MINIMAP_OPEN:this.btn.innerHTML=o.Msg.MINIMAP_CLOSE},t.prototype.dispose=function(){this.isFocusEnabled()&&this.disableFocusRegion(),this.minimapWorkspace.dispose(),o.utils.dom.removeNode(this.minimapWrapper),this.onMouseMoveWrapper&&o.browserEvents.unbind(this.onMouseMoveWrapper),this.onMouseDownWrapper&&o.browserEvents.unbind(this.onMouseDownWrapper),this.onMouseUpWrapper&&o.browserEvents.unbind(this.onMouseUpWrapper)},t.prototype.mirror=function(t){var i=this;if(n.has(t.type)&&(t.type!==o.Events.BLOCK_CREATE||"shadow"!==t.xml.tagName)){var e=t.toJson();o.Events.fromJson(e,this.minimapWorkspace).run(!0),o.renderManagement.finishQueuedRenders().then((function(){i.minimapWorkspace.zoomToFit()}))}},t.minimapToPrimaryCoords=function(t,i,e,o){e-=(i.svgWidth-i.contentWidth)/2,o-=(i.svgHeight-i.contentHeight)/2;var s=t.contentWidth/i.contentWidth;e*=s,o*=s;var n=-t.contentLeft-e,r=-t.contentTop-o;return[n+=t.viewWidth/2,r+=t.viewHeight/2]},t.prototype.primaryScroll=function(i){var e=t.minimapToPrimaryCoords(this.primaryWorkspace.getMetrics(),this.minimapWorkspace.getMetrics(),i.offsetX,i.offsetY),o=e[0],s=e[1];this.primaryWorkspace.scroll(o,s)},t.prototype.onClickDown=function(t){this.minimapWorkspace.getTopBlocks(!1).length&&(this.onMouseMoveWrapper=o.browserEvents.bind(this.minimapWorkspace.svgGroup_,"mousemove",this,this.onMouseMove),this.primaryScroll(t))},t.prototype.onClickUp=function(){this.onMouseMoveWrapper&&(o.browserEvents.unbind(this.onMouseMoveWrapper),this.onMouseMoveWrapper=null)},t.prototype.onMouseMove=function(t){this.primaryScroll(t)},t.prototype.enableFocusRegion=function(){this.focusRegion.init()},t.prototype.disableFocusRegion=function(){this.focusRegion.dispose()},t.prototype.showFocusRegion=function(){this.focusRegion.closed=!1,this.focusRegion.update()},t.prototype.hideFocusRegion=function(){this.focusRegion.closed=!0},t.prototype.isFocusEnabled=function(){return this.focusRegion.isEnabled()},t}();i.Minimap=r},153:function(t,i,e){var o,s=this&&this.__extends||(o=function(t,i){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var e in i)Object.prototype.hasOwnProperty.call(i,e)&&(t[e]=i[e])},o(t,i)},function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function e(){this.constructor=t}o(t,i),t.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)});Object.defineProperty(i,"__esModule",{value:!0}),i.PositionedMinimap=void 0;var n=e(573),r=function(t){function i(i){var e=t.call(this,i)||this;return e.id="minimap",e.margin=20,e.top=0,e.left=0,e.width=225,e.height=180,e.prevWidth=e.width,e.prevHeight=e.height,e.shadowColor="grey",e.bgColor="#fff",e}return s(i,t),i.prototype.init=function(){t.prototype.init.call(this),this.primaryWorkspace.getComponentManager().addComponent({component:this,weight:3,capabilities:[n.ComponentManager.Capability.POSITIONABLE]}),this.setAttributes(),this.primaryWorkspace.resize()},i.prototype.changeStatus=function(){t.prototype.changeStatus.call(this),this.closed?this.height=30:this.height=180,this.setAttributes(),this.primaryWorkspace.resize(),!this.closed&&this.minimapWorkspace.zoomToFit(),this.closed?this.hideFocusRegion():this.showFocusRegion()},i.prototype.getBoundingRectangle=function(){return new n.utils.Rect(this.top,this.top+this.height,this.left,this.left+this.width)},i.prototype.position=function(t,i){this.setSize(),this.setPosition(t,i),this.setAttributes()},i.prototype.setSize=function(){var t=this.primaryWorkspace.getMetrics().viewWidth;this.width=Math.max(200,t/5),this.height=2*this.width/3},i.prototype.setPosition=function(t,i){var e=this.primaryWorkspace,o=e.scrollbar,s=o&&o.isVisible()&&o.canScrollVertically(),r=o&&o.isVisible()&&o.canScrollHorizontally();t.toolboxMetrics.position===n.TOOLBOX_AT_LEFT||e.horizontalLayout&&!e.RTL?(this.left=t.absoluteMetrics.left+t.viewMetrics.width-this.width-this.margin,s&&!e.RTL&&(this.left-=n.Scrollbar.scrollbarThickness)):(this.left=this.margin,s&&e.RTL&&(this.left+=n.Scrollbar.scrollbarThickness));var a=t.toolboxMetrics.position===n.TOOLBOX_AT_BOTTOM;i[0].top<0&&(a=!0),a?(this.top=t.absoluteMetrics.top+t.viewMetrics.height-this.height-this.margin,r&&(this.top-=n.Scrollbar.scrollbarThickness)):this.top=t.absoluteMetrics.top+this.margin;for(var p=this.getBoundingRectangle(),h=0;h<i.length;h++)p.intersects(i[h])&&(this.top=i[h].top-this.height-this.margin,p=this.getBoundingRectangle(),h=-1);"dark-theme"===this.primaryWorkspace.getTheme().getClassName()?(this.shadowColor="black",this.bgColor="#1e1e1e"):(this.shadowColor="grey",this.bgColor="#fff")},i.prototype.setAttributes=function(){var t=this.minimapWorkspace.getInjectionDiv();this.closed?t.setAttribute("style","display: none;"):t.setAttribute("style","display: block;box-shadow: 2px 2px 10px ".concat(this.shadowColor,";")),t.parentElement.setAttribute("style","z-index: 2;\n          position: absolute;\n          width: ".concat(this.width,"px;\n          height: ").concat(this.height,"px;\n          top: ").concat(this.top,"px;\n          left: ").concat(this.left,"px;\n          display: inline-flex;\n          flex-direction: column;")),n.svgResize(this.minimapWorkspace),this.prevWidth===this.width&&this.prevHeight===this.height||(this.prevWidth=this.width,this.prevHeight=this.height,this.minimapWorkspace.zoomToFit())},i}(e(351).Minimap);i.PositionedMinimap=r},573:i=>{i.exports=t}},e={};function o(t){var s=e[t];if(void 0!==s)return s.exports;var n=e[t]={exports:{}};return i[t].call(n.exports,n,n.exports,o),n.exports}var s={};return(()=>{var t=s;Object.defineProperty(t,"__esModule",{value:!0}),t.PositionedMinimap=t.Minimap=void 0;var i=o(351);Object.defineProperty(t,"Minimap",{enumerable:!0,get:function(){return i.Minimap}});var e=o(153);Object.defineProperty(t,"PositionedMinimap",{enumerable:!0,get:function(){return e.PositionedMinimap}})})(),s})()));