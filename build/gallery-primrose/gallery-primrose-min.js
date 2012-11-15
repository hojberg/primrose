YUI.add("gallery-primrose",function(e,t){e.namespace("Primrose");var n=[],r,s=[];e.Primrose.describe=function(t,i){var s,o;o=new e.Primrose.Suite({description:t}),r?(s=r,r.add(o)):n.push(o),r=o,i.call(o),s||(e.Array.indexOf(n,r)!==-1?r=null:r=s)},e.Primrose.beforeEach=function(e){if(!r)throw new Error('"beforeEach" was defined out side of a `describe`');r.addBefores([e])},e.Primrose.it=function(t,n){if(!r)throw new Error(['"it',t+'"',"was defined out side of a `describe`"].join(" "));var i=new e.Primrose.Spec({description:t,block:n});r.add(i)},e.Primrose.addReporter=function(t){s.push(t),e.Array.each(n,function(e){t.observe(e)})},e.Primrose.run=function(){e.Array.invoke(n,"run")},function(){var t=function(){};t.prototype={initializer:function(){e.Do.before(this.report,this,"run",this,"enter"),e.Do.after(this.report,this,"run",this,"exit"),e.Do.before(this.report,this,"_runBeforeList",this,"enter","beforeEach"),e.Do.before(this.report,this,"_runBeforeList",this,"exit","beforeEach")},report:function(t,n){var r=n||this.get("description"),i=this.get("passed");e.Lang.isUndefined(i)?this.fire("report:"+t,{description:r}):t==="exit"&&this.fire("report:result",{description:r,passed:i})},reportError:function(e,t){this.fire("report:error",{description:t||this.get("description"),exception:e})}},t.NAME="primrose:reportable",e.namespace("Primrose").Reportable=t}(),e.namespace("Primrose").BeforeEach=e.Base.create("primrose:beforeEach",e.BaseCore,[],{addBefores:function(e){var t=this.get("beforeList").concat(e);this.set("beforeList",t)}}),e.namespace("Primrose").Suite=e.Base.create("primrose:suite",e.Base,[e.Primrose.BeforeEach,e.Primrose.Reportable],{add:function(e){var t=this.get("beforeList");this.get("children").push(e),e.addTarget(this),t.length&&e.addBefores(t)},run:function(){e.Array.invoke(this.get("children"),"run")}},{ATTRS:{description:{},children:{value:[]},beforeList:{value:[]}}}),e.namespace("Primrose").Spec=e.Base.create("primrose:spec",e.Base,[e.Primrose.BeforeEach,e.Primrose.Reportable],{expect:function(t){return this.add(new e.Primrose.Expectation({subject:t}))},add:function(e){return this.get("expectations").push(e),e.addTarget(this),e},_exec:function(e,t){try{e.call(this)}catch(n){this.reportError(n,t)}},run:function(){this._exec(this._runBeforeList,"beforeEach"),this._exec(function(){this.get("block").call(this,e.bind(this.expect,this)),e.Array.invoke(this.get("expectations"),"run")},this.get("description"))},_runBeforeList:function(){e.Array.each(this.get("beforeList"),function(e){e()})}},{ATTRS:{description:{value:"",setter:function(e){return"it "+e}},block:{value:function(){}},expectations:{value:[]},beforeList:{value:[]}}}),function(){var t=e.Lang,n=e.Array,r;r=function(){},r.prototype={toBe:function(e){this._match("to be "+e,function(t){return t===e})},toBeTypeof:function(e){this._match("to be typeof"+e,function(t){return typeof t===e})},toMatch:function(e){this._match("to match "+e,function(t){return e.test(t)})},toBeDefined:function(){this._match("to be defined",function(e){return typeof e!="undefined"})},toBeUndefined:function(){this._match("to be defined",function(e){return typeof e=="undefined"})},toBeNaN:function(){this._match("to be NaN",function(e){return isNaN(e)})},toInclude:function(e){this._match("to contain "+e,function(r){if(typeof r=="string")return r.indexOf(e)!==-1;if(t.isArray(r))return n.indexOf(r,e)!==-1})},_match:function(e,t){this.set("matcher",e),this.validator=t}},r.NAME="primrose:matchers",r.ATTRS={matcher:{value:""}},e.namespace("Primrose").Matchers=r}(),e.namespace("Primrose").Expectation=e.Base.create("primrose:expectation",e.Base,[e.Primrose.Matchers,e.Primrose.Reportable],{run:function(){return this.validate()},not:function(){return this.set("not",!0),this},validator:function(){return!1},validate:function(){var e=this.validator.call(this,this.get("subject"));return this.get("not")&&(e=!e),this.set("passed",e),e}},{ATTRS:{description:{getter:function(){var t=this.get("not")?"not ":"",n;return n={subject:this.get("subject"),not:t,matcher:this.get("matcher")},e.Lang.sub("expect {subject} {not}{matcher}",n)}},not:{value:!1},subject:{},passed:{value:!1}}}),function(){var t=function(){};t.prototype={_level:0,observe:function(e){e.after("report:enter",this._handleEnter,this),e.after("report:exit",this._handleExit,this),e.after("report:result",this._handleResult,this),e.after("report:error",this._handleError,this)},_indentionSpaces:function(){var e="";for(i=0;i<this._level;i++)e+="  ";return e},_handleEnter:function(e){this._report([this._indentionSpaces(),e.description]),this._level++},_handleExit:function(){this._level--},_handleResult:function(e){this._report([this._indentionSpaces(),e.passed?"\u2714":"\u2716",e.description])},_handleError:function(e){var t=e.exception;this._report([this._indentionSpaces(),e.description,"=>",t.name+": ",t.message],"warn")},_report:function(e,t){t=t||"info"}},e.namespace("Primrose").LogReporter=t}()},"@VERSION@",{requires:["base","base-core","event-custom","collection"]});
