(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,o){},15:function(e,t,o){},16:function(e,t,o){"use strict";o.r(t);var r=o(0),a=o.n(r),n=o(7),l=o.n(n),c=(o(14),o(1)),s=o(2),i=o(4),u=o(3),m=o(5);function p(e){var t={backgroundColor:"#".concat(e.color.hexColor),color:"#".concat(e.color.hexColor)},o=e.showTitle&&a.a.createElement("div",{className:"names"},a.a.createElement("p",null,"#",e.color.hexColor),a.a.createElement("p",null,"rgb(",e.color.rgbColor.join(","),")"));return a.a.createElement("div",{className:"color-container"},a.a.createElement("div",{className:"square",style:t,"data-color-idx":e.color.id||void 0,onClick:e.remove}),o)}p.defaultProps={showTitle:!0};var h=p;function d(e){var t,o,r,a=e[0]/255,n=e[1]/255,l=e[2]/255;return o=(.2126*(a=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92)+.7152*(n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92)+.0722*(l=l>.04045?Math.pow((l+.055)/1.055,2.4):l/12.92))/1,r=(.0193*a+.1192*n+.9505*l)/1.08883,t=(t=(.4124*a+.3576*n+.1805*l)/.95047)>.008856?Math.pow(t,1/3):7.787*t+16/116,[116*(o=o>.008856?Math.pow(o,1/3):7.787*o+16/116)-16,500*(t-o),200*(o-(r=r>.008856?Math.pow(r,1/3):7.787*r+16/116))]}function v(e){return[e.slice(0,2),e.slice(2,4),e.slice(4,6)].map(function(e){return parseInt(e,16)})}function f(e){var t={id:arguments.length>1&&void 0!==arguments[1]?arguments[1]:null};return/^rgb/.test(e)?(t.rgbColor=e.replace(/[rgb()\s]/gi,"").split(",").map(function(e){return parseInt(e,10)}),t.hexColor=t.rgbColor.map(function(e){var t=Number(e);return"0".concat(t.toString(16)).slice(-2)}).join("")):(t.hexColor=e.replace(/['#]/gi,""),t.rgbColor=v(t.hexColor)),t}function g(e){return function(e,t){var o=e[0]-t[0],r=e[1]-t[1],a=e[2]-t[2],n=Math.sqrt(e[1]*e[1]+e[2]*e[2]),l=n-Math.sqrt(t[1]*t[1]+t[2]*t[2]),c=r*r+a*a-l*l,s=o/1,i=l/(1+.045*n),u=(c=c<0?0:Math.sqrt(c))/(1+.015*n),m=s*s+i*i+u*u;return m<0?0:Math.sqrt(m)}(d(v(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"000000")),d(e))}var C=function(e){function t(){var e,o;Object(c.a)(this,t);for(var r=arguments.length,a=new Array(r),n=0;n<r;n++)a[n]=arguments[n];return(o=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={compareColor:"000000",areColorsSorted:!1},o.updateCompareColor=function(e){var t=f(e.target.value).hexColor;6===t.length?o.setState({compareColor:t}):0===e.target.value.length&&o.setState({compareColor:"000000"})},o.toggleSorting=function(e){o.setState({areColorsSorted:"true"===e.currentTarget.value})},o}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state,t=e.areColorsSorted,o=e.compareColor,r=this.props,n=r.colors,l=r.removeColor,c=t?n.sort(function(e,t){return g(e.rgbColor)-g(t.rgbColor)}):n;return a.a.createElement("div",{className:"compare-grid-container"},a.a.createElement("div",{className:"compare-container"},a.a.createElement("div",{className:"compare-input"},a.a.createElement(h,{showTitle:!1,color:f(o)}),a.a.createElement("input",{type:"text",id:"compare-color",onChange:this.updateCompareColor,placeholder:"#000000 (Default)"})),a.a.createElement("div",{className:"compare-controls"},a.a.createElement("p",null,"Sort by closest match?"),a.a.createElement("div",{className:"controls"},a.a.createElement("input",{type:"radio",id:"compare-on",name:"sortOption",checked:t,onChange:this.toggleSorting,value:!0}),a.a.createElement("label",{htmlFor:"compare-on"},"On"),a.a.createElement("input",{type:"radio",id:"compare-off",name:"sortOption",checked:!t,onChange:this.toggleSorting,value:!1}),a.a.createElement("label",{htmlFor:"compare-off"},"Off")))),a.a.createElement("div",{className:"color-grid"},c.map(function(e,t){return a.a.createElement(h,{color:e,remove:l,key:t})})))}}]),t}(r.Component),E=(o(15),"#353B4B\nff001E\nrgb(0, 0, 200)\n#3A3A48 0fa912\nrgb( 200 , 150 , 2 ) rgb(1,2,3)\n#232836\n#454E5F\n#ffffff\n#050505\n#e1e1e1\n#444444\n#999999\nhey I have a color #d928ae inside this sentence\n "),b=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).updateTextArea=function(t){e.setState({colorInput:t.target.value})},e.parseColors=function(){if(e.state.colorInput){var t=new RegExp(/(rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|#?([0-9]|[a-f]){6})/,"gi"),o=e.state.colorInput.match(t);o&&e.setState(function(e){var t=e.colors,r=o.map(function(e,o){return f(e,t.length+o+1)});return{colorInput:"",colors:t.concat(r)}})}},e.resetDisplay=function(){e.setState({colorInput:"",colors:[]})},e.testColors=function(){e.setState({colorInput:E},e.parseColors)},e.removeColor=function(t){var o=t.target.dataset.colorIdx-1,r=e.state.colors;r.splice(o,1);var a=r.map(function(e,t){return e.id=t+1,e});e.setState({colors:a})},e.state={colorInput:"",colors:[]},e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state,t=e.colors,o=e.colorInput;return a.a.createElement("div",{className:"app-container"},a.a.createElement("div",{className:"col color-entry"},a.a.createElement("div",{className:"title"},a.a.createElement("p",null,"Enter/Paste colors (hex or rgb)")),a.a.createElement("div",{className:"display text-area"},a.a.createElement("textarea",{className:"color-textarea",rows:"20",onChange:this.updateTextArea,value:o}),a.a.createElement("button",{onClick:this.parseColors},"Convert"),a.a.createElement("button",{onClick:this.resetDisplay},"Reset"),a.a.createElement("button",{onClick:this.testColors},"Test"))),a.a.createElement("div",{className:"col color-types"},a.a.createElement("div",{className:"title"},a.a.createElement("p",null,"Results (",t.length,")")),a.a.createElement("div",{className:"display results-display"},a.a.createElement(C,{removeColor:this.removeColor,colors:t}))))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(a.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,o){e.exports=o(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.b9375c83.chunk.js.map