(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,r){},15:function(e,t,r){},16:function(e,t,r){"use strict";r.r(t);var o=r(0),a=r.n(o),n=r(7),c=r.n(n),l=(r(14),r(1)),s=r(2),i=r(4),u=r(3),m=r(5);function p(e){var t=e.color,r=t.hexColor,o=t.rgbColor,n=e.id,c={backgroundColor:"#".concat(r),color:"#".concat(r)},l=e.showTitle&&a.a.createElement("div",{className:"names"},a.a.createElement("p",null,"#",r),a.a.createElement("p",null,"rgb(",o.join(","),")"));return a.a.createElement("div",{className:"color-container"},a.a.createElement("div",{className:"square",style:c,"data-color-idx":n||void 0,onClick:e.remove}),l)}p.defaultProps={showTitle:!0};var d=p;function h(e){var t,r,o,a=e[0]/255,n=e[1]/255,c=e[2]/255;return r=(.2126*(a=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92)+.7152*(n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92)+.0722*(c=c>.04045?Math.pow((c+.055)/1.055,2.4):c/12.92))/1,o=(.0193*a+.1192*n+.9505*c)/1.08883,t=(t=(.4124*a+.3576*n+.1805*c)/.95047)>.008856?Math.pow(t,1/3):7.787*t+16/116,[116*(r=r>.008856?Math.pow(r,1/3):7.787*r+16/116)-16,500*(t-r),200*(r-(o=o>.008856?Math.pow(o,1/3):7.787*o+16/116))]}function f(e){return e.replace(/[rgb()\s]/gi,"").split(",").map(function(e){return parseInt(e,10)})}function v(e){var t=e;return"string"===typeof e&&(t=f(t)),t.map(function(e){var t=Number(e);return"0".concat(t.toString(16)).slice(-2)}).join("")}function g(e){return[e.slice(0,2),e.slice(2,4),e.slice(4,6)].map(function(e){return parseInt(e,16)})}function C(e){return/^rgb/.test(e)}function E(e){var t,r,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return C(e)?r=v(t=f(e)):t=g(r=b(e)),{id:o,rgbColor:t,hexColor:r.toLowerCase()}}function b(e){return e.replace(/['#]/gi,"")}function w(e){return function(e,t){var r=e[0]-t[0],o=e[1]-t[1],a=e[2]-t[2],n=Math.sqrt(e[1]*e[1]+e[2]*e[2]),c=n-Math.sqrt(t[1]*t[1]+t[2]*t[2]),l=o*o+a*a-c*c,s=r/1,i=c/(1+.045*n),u=(l=l<0?0:Math.sqrt(l))/(1+.015*n),m=s*s+i*i+u*u;return m<0?0:Math.sqrt(m)}(h(g(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"000000")),h(e))}var y=function(e){function t(){var e,r;Object(l.a)(this,t);for(var o=arguments.length,a=new Array(o),n=0;n<o;n++)a[n]=arguments[n];return(r=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={compareColor:"000000",areColorsSorted:!1},r.updateCompareColor=function(e){var t=E(e.target.value).hexColor;6===t.length?r.setState({compareColor:t}):0===e.target.value.length&&r.setState({compareColor:"000000"})},r.toggleSorting=function(e){r.setState({areColorsSorted:"true"===e.currentTarget.value})},r}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state,t=e.areColorsSorted,r=e.compareColor,o=this.props,n=o.colors,c=o.removeColor,l=t?n.slice().sort(function(e,t){return w(e.rgbColor,r)-w(t.rgbColor,r)}):n;return a.a.createElement("div",{className:"compare-grid-container"},a.a.createElement("div",{className:"compare-container"},a.a.createElement("div",{className:"compare-input"},a.a.createElement(d,{showTitle:!1,color:E(r)}),a.a.createElement("input",{type:"text",id:"compare-color",onChange:this.updateCompareColor,placeholder:"#000000 (Default)"})),a.a.createElement("div",{className:"compare-controls"},a.a.createElement("p",null,"Sort by closest match?"),a.a.createElement("div",{className:"controls"},a.a.createElement("input",{type:"radio",id:"compare-on",name:"sortOption",checked:t,onChange:this.toggleSorting,value:!0}),a.a.createElement("label",{htmlFor:"compare-on"},"On"),a.a.createElement("input",{type:"radio",id:"compare-off",name:"sortOption",checked:!t,onChange:this.toggleSorting,value:!1}),a.a.createElement("label",{htmlFor:"compare-off"},"Off")))),a.a.createElement("div",{className:"color-grid"},l.map(function(e,t){return a.a.createElement(d,{color:e,remove:c,key:t})})))}}]),t}(o.Component),N=(r(15),"#353B4B\nff001E\nrgb(0, 0, 200)\n#3A3A48 0fa912\nrgb( 200 , 150 , 2 ) rgb(1,2,3)\n#232836\n#454E5F\n#ffffff\n#050505\n#e1e1e1\n#444444\n#999999\nhey I have a color #d928ae inside this sentence\n "),S=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).updateTextArea=function(t){e.setState({colorInput:t.target.value})},e.parseColors=function(){if(e.state.colorInput){var t=new RegExp(/(rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|#?([0-9]|[a-f]){6})/,"gi"),r=e.state.colorInput.match(t);r&&e.setState(function(e){var t=e.colors,o=t.map(function(e){return e.hexColor}),a=r.filter(function(e){var t=C(e)?v(e):b(e);return!o.includes(t.toLowerCase())}).map(function(e,r){return E(e,t.length+r+1)});return{colorInput:"",colors:t.concat(a)}})}},e.resetDisplay=function(){e.setState({colorInput:"",colors:[]})},e.testColors=function(){e.setState({colorInput:N},e.parseColors)},e.removeColor=function(t){var r=t.target.dataset.colorIdx-1,o=e.state.colors;o.splice(r,1);var a=o.map(function(e,t){return e.id=t+1,e});e.setState({colors:a})},e.state={colorInput:"",colors:[]},e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state,t=e.colors,r=e.colorInput;return a.a.createElement("div",{className:"app-container"},a.a.createElement("div",{className:"col color-entry"},a.a.createElement("div",{className:"title"},a.a.createElement("p",null,"Enter/Paste colors (hex or rgb)")),a.a.createElement("div",{className:"display text-area"},a.a.createElement("textarea",{className:"color-textarea",rows:"20",onChange:this.updateTextArea,value:r}),a.a.createElement("button",{onClick:this.parseColors},"Convert"),a.a.createElement("button",{onClick:this.resetDisplay},"Reset"),a.a.createElement("button",{onClick:this.testColors},"Test"))),a.a.createElement("div",{className:"col color-types"},a.a.createElement("div",{className:"title"},a.a.createElement("p",null,"Results (",t.length,")")),a.a.createElement("div",{className:"display results-display"},a.a.createElement(y,{removeColor:this.removeColor,colors:t}))))}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,r){e.exports=r(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.8511ae4a.chunk.js.map