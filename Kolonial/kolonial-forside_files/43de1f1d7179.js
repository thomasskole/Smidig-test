/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else if(typeof exports==='object'){factory(require('jquery'));}else{factory(jQuery);}}(function($){var pluses=/\+/g;function encode(s){return config.raw?s:encodeURIComponent(s);}
function decode(s){return config.raw?s:decodeURIComponent(s);}
function stringifyCookieValue(value){return encode(config.json?JSON.stringify(value):String(value));}
function parseCookieValue(s){if(s.indexOf('"')===0){s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');}
try{s=decodeURIComponent(s.replace(pluses,' '));return config.json?JSON.parse(s):s;}catch(e){}}
function read(s,converter){var value=config.raw?s:parseCookieValue(s);return $.isFunction(converter)?converter(value):value;}
var config=$.cookie=function(key,value,options){if(value!==undefined&&!$.isFunction(value)){options=$.extend({},config.defaults,options);if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setTime(+t+days*864e+5);}
return(document.cookie=[encode(key),'=',stringifyCookieValue(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
var result=key?undefined:{};var cookies=document.cookie?document.cookie.split('; '):[];for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split('=');var name=decode(parts.shift());var cookie=parts.join('=');if(key&&key===name){result=read(cookie,value);break;}
if(!key&&(cookie=read(cookie))!==undefined){result[name]=cookie;}}
return result;};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)===undefined){return false;}
$.cookie(key,'',$.extend({},options,{expires:-1}));return!$.cookie(key);};}));jQuery.extend(jQuery.easing,{easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;}});/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 *
 * Customized for Tienda:
 * - https://github.com/twitter/typeahead.js/pull/1212
 * - Modified to add support for buttons on items, etc (see // Modified: below).
 * - Removed TAB-handling for now
 */(function(root,factory){if(typeof define==="function"&&define.amd){define("bloodhound",["jquery"],function(a0){return root["Bloodhound"]=factory(a0);});}else if(typeof exports==="object"){module.exports=factory(require("jquery"));}else{root["Bloodhound"]=factory(jQuery);}})(this,function($){var _=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:false;},isBlankString:function(str){return!str||/^\s*$/.test(str);},escapeRegExChars:function(str){return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");},isString:function(obj){return typeof obj==="string";},isNumber:function(obj){return typeof obj==="number";},isArray:$.isArray,isFunction:$.isFunction,isObject:$.isPlainObject,isUndefined:function(obj){return typeof obj==="undefined";},isElement:function(obj){return!!(obj&&obj.nodeType===1);},isJQuery:function(obj){return obj instanceof $;},toStr:function toStr(s){return _.isUndefined(s)||s===null?"":s+"";},bind:$.proxy,each:function(collection,cb){$.each(collection,reverseArgs);function reverseArgs(index,value){return cb(value,index);}},map:$.map,filter:$.grep,every:function(obj,test){var result=true;if(!obj){return result;}
$.each(obj,function(key,val){if(!(result=test.call(null,val,key,obj))){return false;}});return!!result;},some:function(obj,test){var result=false;if(!obj){return result;}
$.each(obj,function(key,val){if(result=test.call(null,val,key,obj)){return false;}});return!!result;},mixin:$.extend,identity:function(x){return x;},clone:function(obj){return $.extend(true,{},obj);},getIdGenerator:function(){var counter=0;return function(){return counter++;};},templatify:function templatify(obj){return $.isFunction(obj)?obj:template;function template(){return String(obj);}},defer:function(fn){setTimeout(fn,0);},debounce:function(func,wait,immediate){var timeout,result;return function(){var context=this,args=arguments,later,callNow;later=function(){timeout=null;if(!immediate){result=func.apply(context,args);}};callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow){result=func.apply(context,args);}
return result;};},throttle:function(func,wait){var context,args,timeout,result,previous,later;previous=0;later=function(){previous=new Date();timeout=null;result=func.apply(context,args);};return function(){var now=new Date(),remaining=wait-(now-previous);context=this;args=arguments;if(remaining<=0){clearTimeout(timeout);timeout=null;previous=now;result=func.apply(context,args);}else if(!timeout){timeout=setTimeout(later,remaining);}
return result;};},stringify:function(val){return _.isString(val)?val:JSON.stringify(val);},noop:function(){}};}();var VERSION="0.11.1";var tokenizers=function(){"use strict";return{nonword:nonword,whitespace:whitespace,obj:{nonword:getObjTokenizer(nonword),whitespace:getObjTokenizer(whitespace)}};function whitespace(str){str=_.toStr(str);return str?str.split(/\s+/):[];}
function nonword(str){str=_.toStr(str);return str?str.split(/\W+/):[];}
function getObjTokenizer(tokenizer){return function setKey(keys){keys=_.isArray(keys)?keys:[].slice.call(arguments,0);return function tokenize(o){var tokens=[];_.each(keys,function(k){tokens=tokens.concat(tokenizer(_.toStr(o[k])));});return tokens;};};}}();var LruCache=function(){"use strict";function LruCache(maxSize){this.maxSize=_.isNumber(maxSize)?maxSize:100;this.reset();if(this.maxSize<=0){this.set=this.get=$.noop;}}
_.mixin(LruCache.prototype,{set:function set(key,val){var tailItem=this.list.tail,node;if(this.size>=this.maxSize){this.list.remove(tailItem);delete this.hash[tailItem.key];this.size--;}
if(node=this.hash[key]){node.val=val;this.list.moveToFront(node);}else{node=new Node(key,val);this.list.add(node);this.hash[key]=node;this.size++;}},get:function get(key){var node=this.hash[key];if(node){this.list.moveToFront(node);return node.val;}},reset:function reset(){this.size=0;this.hash={};this.list=new List();}});function List(){this.head=this.tail=null;}
_.mixin(List.prototype,{add:function add(node){if(this.head){node.next=this.head;this.head.prev=node;}
this.head=node;this.tail=this.tail||node;},remove:function remove(node){node.prev?node.prev.next=node.next:this.head=node.next;node.next?node.next.prev=node.prev:this.tail=node.prev;},moveToFront:function(node){this.remove(node);this.add(node);}});function Node(key,val){this.key=key;this.val=val;this.prev=this.next=null;}
return LruCache;}();var PersistentStorage=function(){"use strict";var LOCAL_STORAGE;try{LOCAL_STORAGE=window.localStorage;LOCAL_STORAGE.setItem("~~~","!");LOCAL_STORAGE.removeItem("~~~");}catch(err){LOCAL_STORAGE=null;}
function PersistentStorage(namespace,override){this.prefix=["__",namespace,"__"].join("");this.ttlKey="__ttl__";this.keyMatcher=new RegExp("^"+_.escapeRegExChars(this.prefix));this.ls=override||LOCAL_STORAGE;!this.ls&&this._noop();}
_.mixin(PersistentStorage.prototype,{_prefix:function(key){return this.prefix+key;},_ttlKey:function(key){return this._prefix(key)+this.ttlKey;},_noop:function(){this.get=this.set=this.remove=this.clear=this.isExpired=_.noop;},_safeSet:function(key,val){try{this.ls.setItem(key,val);}catch(err){if(err.name==="QuotaExceededError"){this.clear();this._noop();}}},get:function(key){if(this.isExpired(key)){this.remove(key);}
return decode(this.ls.getItem(this._prefix(key)));},set:function(key,val,ttl){if(_.isNumber(ttl)){this._safeSet(this._ttlKey(key),encode(now()+ttl));}else{this.ls.removeItem(this._ttlKey(key));}
return this._safeSet(this._prefix(key),encode(val));},remove:function(key){this.ls.removeItem(this._ttlKey(key));this.ls.removeItem(this._prefix(key));return this;},clear:function(){var i,keys=gatherMatchingKeys(this.keyMatcher);for(i=keys.length;i--;){this.remove(keys[i]);}
return this;},isExpired:function(key){var ttl=decode(this.ls.getItem(this._ttlKey(key)));return _.isNumber(ttl)&&now()>ttl?true:false;}});return PersistentStorage;function now(){return new Date().getTime();}
function encode(val){return JSON.stringify(_.isUndefined(val)?null:val);}
function decode(val){return $.parseJSON(val);}
function gatherMatchingKeys(keyMatcher){var i,key,keys=[],len=LOCAL_STORAGE.length;for(i=0;i<len;i++){if((key=LOCAL_STORAGE.key(i)).match(keyMatcher)){keys.push(key.replace(keyMatcher,""));}}
return keys;}}();var Transport=function(){"use strict";var pendingRequestsCount=0,pendingRequests={},maxPendingRequests=6,sharedCache=new LruCache(10);function Transport(o){o=o||{};this.cancelled=false;this.lastReq=null;this._send=o.transport;this._get=o.limiter?o.limiter(this._get):this._get;this._cache=o.cache===false?new LruCache(0):sharedCache;}
Transport.setMaxPendingRequests=function setMaxPendingRequests(num){maxPendingRequests=num;};Transport.resetCache=function resetCache(){sharedCache.reset();};_.mixin(Transport.prototype,{_fingerprint:function fingerprint(o){o=o||{};return o.url+o.type+$.param(o.data||{});},_get:function(o,cb){var that=this,fingerprint,jqXhr;fingerprint=this._fingerprint(o);if(this.cancelled||fingerprint!==this.lastReq){return;}
if(jqXhr=pendingRequests[fingerprint]){jqXhr.done(done).fail(fail);}else if(pendingRequestsCount<maxPendingRequests){pendingRequestsCount++;pendingRequests[fingerprint]=this._send(o).done(done).fail(fail).always(always);}else{this.onDeckRequestArgs=[].slice.call(arguments,0);}
function done(resp){cb(null,resp);that._cache.set(fingerprint,resp);}
function fail(){cb(true);}
function always(){pendingRequestsCount--;delete pendingRequests[fingerprint];if(that.onDeckRequestArgs){that._get.apply(that,that.onDeckRequestArgs);that.onDeckRequestArgs=null;}}},get:function(o,cb){var resp,fingerprint;cb=cb||$.noop;o=_.isString(o)?{url:o}:o||{};fingerprint=this._fingerprint(o);this.cancelled=false;this.lastReq=fingerprint;if(resp=this._cache.get(fingerprint)){cb(null,resp);}else{this._get(o,cb);}},cancel:function(){this.cancelled=true;}});return Transport;}();var SearchIndex=window.SearchIndex=function(){"use strict";var CHILDREN="c",IDS="i";function SearchIndex(o){o=o||{};if(!o.datumTokenizer||!o.queryTokenizer){$.error("datumTokenizer and queryTokenizer are both required");}
this.identify=o.identify||_.stringify;this.datumTokenizer=o.datumTokenizer;this.queryTokenizer=o.queryTokenizer;this.reset();}
_.mixin(SearchIndex.prototype,{bootstrap:function bootstrap(o){this.datums=o.datums;this.trie=o.trie;},add:function(data){var that=this;data=_.isArray(data)?data:[data];_.each(data,function(datum){var id,tokens;that.datums[id=that.identify(datum)]=datum;tokens=normalizeTokens(that.datumTokenizer(datum));_.each(tokens,function(token){var node,chars,ch;node=that.trie;chars=token.split("");while(ch=chars.shift()){node=node[CHILDREN][ch]||(node[CHILDREN][ch]=newNode());node[IDS].push(id);}});});},get:function get(ids){var that=this;return _.map(ids,function(id){return that.datums[id];});},search:function search(query){var that=this,tokens,matches;tokens=normalizeTokens(this.queryTokenizer(query));_.each(tokens,function(token){var node,chars,ch,ids;if(matches&&matches.length===0){return false;}
node=that.trie;chars=token.split("");while(node&&(ch=chars.shift())){node=node[CHILDREN][ch];}
if(node&&chars.length===0){ids=node[IDS].slice(0);matches=matches?getIntersection(matches,ids):ids;}else{matches=[];return false;}});return matches?_.map(unique(matches),function(id){return that.datums[id];}):[];},all:function all(){var values=[];for(var key in this.datums){values.push(this.datums[key]);}
return values;},reset:function reset(){this.datums={};this.trie=newNode();},serialize:function serialize(){return{datums:this.datums,trie:this.trie};}});return SearchIndex;function normalizeTokens(tokens){tokens=_.filter(tokens,function(token){return!!token;});tokens=_.map(tokens,function(token){return token.toLowerCase();});return tokens;}
function newNode(){var node={};node[IDS]=[];node[CHILDREN]={};return node;}
function unique(array){var seen={},uniques=[];for(var i=0,len=array.length;i<len;i++){if(!seen[array[i]]){seen[array[i]]=true;uniques.push(array[i]);}}
return uniques;}
function getIntersection(arrayA,arrayB){var ai=0,bi=0,intersection=[];arrayA=arrayA.sort();arrayB=arrayB.sort();var lenArrayA=arrayA.length,lenArrayB=arrayB.length;while(ai<lenArrayA&&bi<lenArrayB){if(arrayA[ai]<arrayB[bi]){ai++;}else if(arrayA[ai]>arrayB[bi]){bi++;}else{intersection.push(arrayA[ai]);ai++;bi++;}}
return intersection;}}();var Prefetch=function(){"use strict";var keys;keys={data:"data",protocol:"protocol",thumbprint:"thumbprint"};function Prefetch(o){this.url=o.url;this.ttl=o.ttl;this.cache=o.cache;this.prepare=o.prepare;this.transform=o.transform;this.transport=o.transport;this.thumbprint=o.thumbprint;this.storage=new PersistentStorage(o.cacheKey);}
_.mixin(Prefetch.prototype,{_settings:function settings(){return{url:this.url,type:"GET",dataType:"json"};},store:function store(data){if(!this.cache){return;}
this.storage.set(keys.data,data,this.ttl);this.storage.set(keys.protocol,location.protocol,this.ttl);this.storage.set(keys.thumbprint,this.thumbprint,this.ttl);},fromCache:function fromCache(){var stored={},isExpired;if(!this.cache){return null;}
stored.data=this.storage.get(keys.data);stored.protocol=this.storage.get(keys.protocol);stored.thumbprint=this.storage.get(keys.thumbprint);isExpired=stored.thumbprint!==this.thumbprint||stored.protocol!==location.protocol;return stored.data&&!isExpired?stored.data:null;},fromNetwork:function(cb){var that=this,settings;if(!cb){return;}
settings=this.prepare(this._settings());this.transport(settings).fail(onError).done(onResponse);function onError(){cb(true);}
function onResponse(resp){cb(null,that.transform(resp));}},clear:function clear(){this.storage.clear();return this;}});return Prefetch;}();var Remote=function(){"use strict";function Remote(o){this.url=o.url;this.prepare=o.prepare;this.transform=o.transform;this.transport=new Transport({cache:o.cache,limiter:o.limiter,transport:o.transport});}
_.mixin(Remote.prototype,{_settings:function settings(){return{url:this.url,type:"GET",dataType:"json"};},get:function get(query,cb){var that=this,settings;if(!cb){return;}
query=query||"";settings=this.prepare(query,this._settings());return this.transport.get(settings,onResponse);function onResponse(err,resp){err?cb([]):cb(that.transform(resp));}},cancelLastRequest:function cancelLastRequest(){this.transport.cancel();}});return Remote;}();var oParser=function(){"use strict";return function parse(o){var defaults,sorter;defaults={initialize:true,identify:_.stringify,datumTokenizer:null,queryTokenizer:null,sufficient:5,sorter:null,local:[],prefetch:null,remote:null};o=_.mixin(defaults,o||{});!o.datumTokenizer&&$.error("datumTokenizer is required");!o.queryTokenizer&&$.error("queryTokenizer is required");sorter=o.sorter;o.sorter=sorter?function(x){return x.sort(sorter);}:_.identity;o.local=_.isFunction(o.local)?o.local():o.local;o.prefetch=parsePrefetch(o.prefetch);o.remote=parseRemote(o.remote);return o;};function parsePrefetch(o){var defaults;if(!o){return null;}
defaults={url:null,ttl:24*60*60*1e3,cache:true,cacheKey:null,thumbprint:"",prepare:_.identity,transform:_.identity,transport:null};o=_.isString(o)?{url:o}:o;o=_.mixin(defaults,o);!o.url&&$.error("prefetch requires url to be set");o.transform=o.filter||o.transform;o.cacheKey=o.cacheKey||o.url;o.thumbprint=VERSION+o.thumbprint;o.transport=o.transport?callbackToDeferred(o.transport):$.ajax;return o;}
function parseRemote(o){var defaults;if(!o){return;}
defaults={url:null,cache:true,prepare:null,replace:null,wildcard:null,limiter:null,rateLimitBy:"debounce",rateLimitWait:300,transform:_.identity,transport:null};o=_.isString(o)?{url:o}:o;o=_.mixin(defaults,o);!o.url&&$.error("remote requires url to be set");o.transform=o.filter||o.transform;o.prepare=toRemotePrepare(o);o.limiter=toLimiter(o);o.transport=o.transport?callbackToDeferred(o.transport):$.ajax;delete o.replace;delete o.wildcard;delete o.rateLimitBy;delete o.rateLimitWait;return o;}
function toRemotePrepare(o){var prepare,replace,wildcard;prepare=o.prepare;replace=o.replace;wildcard=o.wildcard;if(prepare){return prepare;}
if(replace){prepare=prepareByReplace;}else if(o.wildcard){prepare=prepareByWildcard;}else{prepare=idenityPrepare;}
return prepare;function prepareByReplace(query,settings){settings.url=replace(settings.url,query);return settings;}
function prepareByWildcard(query,settings){settings.url=settings.url.replace(wildcard,encodeURIComponent(query));return settings;}
function idenityPrepare(query,settings){return settings;}}
function toLimiter(o){var limiter,method,wait;limiter=o.limiter;method=o.rateLimitBy;wait=o.rateLimitWait;if(!limiter){limiter=/^throttle$/i.test(method)?throttle(wait):debounce(wait);}
return limiter;function debounce(wait){return function debounce(fn){return _.debounce(fn,wait);};}
function throttle(wait){return function throttle(fn){return _.throttle(fn,wait);};}}
function callbackToDeferred(fn){return function wrapper(o){var deferred=$.Deferred();fn(o,onSuccess,onError);return deferred;function onSuccess(resp){_.defer(function(){deferred.resolve(resp);});}
function onError(err){_.defer(function(){deferred.reject(err);});}};}}();var Bloodhound=function(){"use strict";var old;old=window&&window.Bloodhound;function Bloodhound(o){o=oParser(o);this.sorter=o.sorter;this.identify=o.identify;this.sufficient=o.sufficient;this.local=o.local;this.remote=o.remote?new Remote(o.remote):null;this.prefetch=o.prefetch?new Prefetch(o.prefetch):null;this.index=new SearchIndex({identify:this.identify,datumTokenizer:o.datumTokenizer,queryTokenizer:o.queryTokenizer});o.initialize!==false&&this.initialize();}
Bloodhound.noConflict=function noConflict(){window&&(window.Bloodhound=old);return Bloodhound;};Bloodhound.tokenizers=tokenizers;_.mixin(Bloodhound.prototype,{__ttAdapter:function ttAdapter(){var that=this;return this.remote?withAsync:withoutAsync;function withAsync(query,sync,async){return that.search(query,sync,async);}
function withoutAsync(query,sync){return that.search(query,sync);}},_loadPrefetch:function loadPrefetch(){var that=this,deferred,serialized;deferred=$.Deferred();if(!this.prefetch){deferred.resolve();}else if(serialized=this.prefetch.fromCache()){this.index.bootstrap(serialized);deferred.resolve();}else{this.prefetch.fromNetwork(done);}
return deferred.promise();function done(err,data){if(err){return deferred.reject();}
that.add(data);that.prefetch.store(that.index.serialize());deferred.resolve();}},_initialize:function initialize(){var that=this,deferred;this.clear();(this.initPromise=this._loadPrefetch()).done(addLocalToIndex);return this.initPromise;function addLocalToIndex(){that.add(that.local);}},initialize:function initialize(force){return!this.initPromise||force?this._initialize():this.initPromise;},add:function add(data){this.index.add(data);return this;},get:function get(ids){ids=_.isArray(ids)?ids:[].slice.call(arguments);return this.index.get(ids);},search:function search(query,sync,async){var that=this,local;local=this.sorter(this.index.search(query));sync(this.remote?local.slice():local);if(this.remote&&local.length<this.sufficient){this.remote.get(query,processRemote);}else if(this.remote){this.remote.cancelLastRequest();}
return this;function processRemote(remote){var nonDuplicates=[];_.each(remote,function(r){!_.some(local,function(l){return that.identify(r)===that.identify(l);})&&nonDuplicates.push(r);});async&&async(nonDuplicates);}},all:function all(){return this.index.all();},clear:function clear(){this.index.reset();return this;},clearPrefetchCache:function clearPrefetchCache(){this.prefetch&&this.prefetch.clear();return this;},clearRemoteCache:function clearRemoteCache(){Transport.resetCache();return this;},ttAdapter:function ttAdapter(){return this.__ttAdapter();}});return Bloodhound;}();return Bloodhound;});(function(root,factory){if(typeof define==="function"&&define.amd){define("typeahead.js",["jquery"],function(a0){return factory(a0);});}else if(typeof exports==="object"){module.exports=factory(require("jquery"));}else{factory(jQuery);}})(this,function($){var _=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:false;},isBlankString:function(str){return!str||/^\s*$/.test(str);},escapeRegExChars:function(str){return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");},isString:function(obj){return typeof obj==="string";},isNumber:function(obj){return typeof obj==="number";},isArray:$.isArray,isFunction:$.isFunction,isObject:$.isPlainObject,isUndefined:function(obj){return typeof obj==="undefined";},isElement:function(obj){return!!(obj&&obj.nodeType===1);},isJQuery:function(obj){return obj instanceof $;},toStr:function toStr(s){return _.isUndefined(s)||s===null?"":s+"";},bind:$.proxy,each:function(collection,cb){$.each(collection,reverseArgs);function reverseArgs(index,value){return cb(value,index);}},map:$.map,filter:$.grep,every:function(obj,test){var result=true;if(!obj){return result;}
$.each(obj,function(key,val){if(!(result=test.call(null,val,key,obj))){return false;}});return!!result;},some:function(obj,test){var result=false;if(!obj){return result;}
$.each(obj,function(key,val){if(result=test.call(null,val,key,obj)){return false;}});return!!result;},mixin:$.extend,identity:function(x){return x;},clone:function(obj){return $.extend(true,{},obj);},getIdGenerator:function(){var counter=0;return function(){return counter++;};},templatify:function templatify(obj){return $.isFunction(obj)?obj:template;function template(){return String(obj);}},defer:function(fn){setTimeout(fn,0);},debounce:function(func,wait,immediate){var timeout,result;return function(){var context=this,args=arguments,later,callNow;later=function(){timeout=null;if(!immediate){result=func.apply(context,args);}};callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow){result=func.apply(context,args);}
return result;};},throttle:function(func,wait){var context,args,timeout,result,previous,later;previous=0;later=function(){previous=new Date();timeout=null;result=func.apply(context,args);};return function(){var now=new Date(),remaining=wait-(now-previous);context=this;args=arguments;if(remaining<=0){clearTimeout(timeout);timeout=null;previous=now;result=func.apply(context,args);}else if(!timeout){timeout=setTimeout(later,remaining);}
return result;};},stringify:function(val){return _.isString(val)?val:JSON.stringify(val);},noop:function(){}};}();var WWW=function(){"use strict";var defaultClassNames={wrapper:"twitter-typeahead",input:"tt-input",hint:"tt-hint",menu:"tt-menu",dataset:"tt-dataset",suggestion:"tt-suggestion",selectable:"tt-selectable",empty:"tt-empty",open:"tt-open",cursor:"tt-cursor",highlight:"tt-highlight"};return build;function build(o){var www,classes;classes=_.mixin({},defaultClassNames,o);www={css:buildCss(),classes:classes,html:buildHtml(classes),selectors:buildSelectors(classes)};return{css:www.css,html:www.html,classes:www.classes,selectors:www.selectors,mixin:function(o){_.mixin(o,www);}};}
function buildHtml(c){return{wrapper:'<span class="'+c.wrapper+'"></span>',menu:'<div class="'+c.menu+'"></div>'};}
function buildSelectors(classes){var selectors={};_.each(classes,function(v,k){selectors[k]="."+v;});return selectors;}
function buildCss(){var css={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},menu:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};if(_.isMsie()){_.mixin(css.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"});}
return css;}}();var EventBus=function(){"use strict";var namespace,deprecationMap;namespace="typeahead:";deprecationMap={render:"rendered",cursorchange:"cursorchanged",select:"selected",autocomplete:"autocompleted"};function EventBus(o){if(!o||!o.el){$.error("EventBus initialized without el");}
this.$el=$(o.el);}
_.mixin(EventBus.prototype,{_trigger:function(type,args){var $e;$e=$.Event(namespace+type);(args=args||[]).unshift($e);this.$el.trigger.apply(this.$el,args);return $e;},before:function(type){var args,$e;args=[].slice.call(arguments,1);$e=this._trigger("before"+type,args);return $e.isDefaultPrevented();},trigger:function(type){var deprecatedType;this._trigger(type,[].slice.call(arguments,1));if(deprecatedType=deprecationMap[type]){this._trigger(deprecatedType,[].slice.call(arguments,1));}}});return EventBus;}();var EventEmitter=function(){"use strict";var splitter=/\s+/,nextTick=getNextTick();return{onSync:onSync,onAsync:onAsync,off:off,trigger:trigger};function on(method,types,cb,context){var type;if(!cb){return this;}
types=types.split(splitter);cb=context?bindContext(cb,context):cb;this._callbacks=this._callbacks||{};while(type=types.shift()){this._callbacks[type]=this._callbacks[type]||{sync:[],async:[]};this._callbacks[type][method].push(cb);}
return this;}
function onAsync(types,cb,context){return on.call(this,"async",types,cb,context);}
function onSync(types,cb,context){return on.call(this,"sync",types,cb,context);}
function off(types){var type;if(!this._callbacks){return this;}
types=types.split(splitter);while(type=types.shift()){delete this._callbacks[type];}
return this;}
function trigger(types){var type,callbacks,args,syncFlush,asyncFlush;if(!this._callbacks){return this;}
types=types.split(splitter);args=[].slice.call(arguments,1);while((type=types.shift())&&(callbacks=this._callbacks[type])){syncFlush=getFlush(callbacks.sync,this,[type].concat(args));asyncFlush=getFlush(callbacks.async,this,[type].concat(args));syncFlush()&&nextTick(asyncFlush);}
return this;}
function getFlush(callbacks,context,args){return flush;function flush(){var cancelled;for(var i=0,len=callbacks.length;!cancelled&&i<len;i+=1){cancelled=callbacks[i].apply(context,args)===false;}
return!cancelled;}}
function getNextTick(){var nextTickFn;if(window.setImmediate){nextTickFn=function nextTickSetImmediate(fn){setImmediate(function(){fn();});};}else{nextTickFn=function nextTickSetTimeout(fn){setTimeout(function(){fn();},0);};}
return nextTickFn;}
function bindContext(fn,context){return fn.bind?fn.bind(context):function(){fn.apply(context,[].slice.call(arguments,0));};}}();var highlight=function(doc){"use strict";var defaults={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:false,caseSensitive:false};return function hightlight(o){var regex;o=_.mixin({},defaults,o);if(!o.node||!o.pattern){return;}
o.pattern=_.isArray(o.pattern)?o.pattern:[o.pattern];regex=getRegex(o.pattern,o.caseSensitive,o.wordsOnly);traverse(o.node,hightlightTextNode);function hightlightTextNode(textNode){var match,patternNode,wrapperNode;if(match=regex.exec(textNode.data)){wrapperNode=doc.createElement(o.tagName);o.className&&(wrapperNode.className=o.className);patternNode=textNode.splitText(match.index);patternNode.splitText(match[0].length);wrapperNode.appendChild(patternNode.cloneNode(true));textNode.parentNode.replaceChild(wrapperNode,patternNode);}
return!!match;}
function traverse(el,hightlightTextNode){var childNode,TEXT_NODE_TYPE=3;for(var i=0;i<el.childNodes.length;i++){childNode=el.childNodes[i];if(childNode.nodeType===TEXT_NODE_TYPE){i+=hightlightTextNode(childNode)?1:0;}else{traverse(childNode,hightlightTextNode);}}}};function getRegex(patterns,caseSensitive,wordsOnly){var escapedPatterns=[],regexStr;for(var i=0,len=patterns.length;i<len;i++){escapedPatterns.push(_.escapeRegExChars(patterns[i]));}
regexStr=wordsOnly?"\\b("+escapedPatterns.join("|")+")\\b":"("+escapedPatterns.join("|")+")";return caseSensitive?new RegExp(regexStr):new RegExp(regexStr,"i");}}(window.document);var Input=function(){"use strict";var specialKeyCodeMap;specialKeyCodeMap={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"};function Input(o,www){o=o||{};if(!o.input){$.error("input is missing");}
www.mixin(this);this.$hint=$(o.hint);this.$input=$(o.input);this.query=this.$input.val();this.queryWhenFocused=this.hasFocus()?this.query:null;this.$overflowHelper=buildOverflowHelper(this.$input);this._checkLanguageDirection();if(this.$hint.length===0){this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=_.noop;}}
Input.normalizeQuery=function(str){return _.toStr(str).replace(/^\s*/g,"").replace(/\s{2,}/g," ");};_.mixin(Input.prototype,EventEmitter,{_onBlur:function onBlur(){this.resetInputValue();this.trigger("blurred");},_onFocus:function onFocus(){this.queryWhenFocused=this.query;this.trigger("focused");},_onKeydown:function onKeydown($e){var keyName=specialKeyCodeMap[$e.which||$e.keyCode];this._managePreventDefault(keyName,$e);if(keyName&&this._shouldTrigger(keyName,$e)){this.trigger(keyName+"Keyed",$e);}},_onInput:function onInput(){this._setQuery(this.getInputValue());this.clearHintIfInvalid();this._checkLanguageDirection();},_managePreventDefault:function managePreventDefault(keyName,$e){var preventDefault;switch(keyName){case"up":case"down":preventDefault=!withModifier($e);break;default:preventDefault=false;}
preventDefault&&$e.preventDefault();},_shouldTrigger:function shouldTrigger(keyName,$e){var trigger;switch(keyName){case"tab":trigger=!withModifier($e);break;default:trigger=true;}
return trigger;},_checkLanguageDirection:function checkLanguageDirection(){var dir=(this.$input.css("direction")||"ltr").toLowerCase();if(this.dir!==dir){this.dir=dir;this.$hint.attr("dir",dir);this.trigger("langDirChanged",dir);}},_setQuery:function setQuery(val,silent){var areEquivalent,hasDifferentWhitespace;areEquivalent=areQueriesEquivalent(val,this.query);hasDifferentWhitespace=areEquivalent?this.query.length!==val.length:false;this.query=val;if(!silent&&!areEquivalent){this.trigger("queryChanged",this.query);}else if(!silent&&hasDifferentWhitespace){this.trigger("whitespaceChanged",this.query);}},bind:function(){var that=this,onBlur,onFocus,onKeydown,onInput;onBlur=_.bind(this._onBlur,this);onFocus=_.bind(this._onFocus,this);onKeydown=_.bind(this._onKeydown,this);onInput=_.bind(this._onInput,this);this.$input.on("blur.tt",onBlur).on("focus.tt",onFocus).on("keydown.tt",onKeydown);if(!_.isMsie()||_.isMsie()>9){this.$input.on("input.tt",onInput);}else{this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function($e){if(specialKeyCodeMap[$e.which||$e.keyCode]){return;}
_.defer(_.bind(that._onInput,that,$e));});}
return this;},focus:function focus(){this.$input.focus();},blur:function blur(){this.$input.blur();},getLangDir:function getLangDir(){return this.dir;},getQuery:function getQuery(){return this.query||"";},setQuery:function setQuery(val,silent){this.setInputValue(val);this._setQuery(val,silent);},hasQueryChangedSinceLastFocus:function hasQueryChangedSinceLastFocus(){return this.query!==this.queryWhenFocused;},getInputValue:function getInputValue(){return this.$input.val();},setInputValue:function setInputValue(value){this.$input.val(value);this.clearHintIfInvalid();this._checkLanguageDirection();},resetInputValue:function resetInputValue(){this.setInputValue(this.query);},getHint:function getHint(){return this.$hint.val();},setHint:function setHint(value){this.$hint.val(value);},clearHint:function clearHint(){this.setHint("");},clearHintIfInvalid:function clearHintIfInvalid(){var val,hint,valIsPrefixOfHint,isValid;val=this.getInputValue();hint=this.getHint();valIsPrefixOfHint=val!==hint&&hint.indexOf(val)===0;isValid=val!==""&&valIsPrefixOfHint&&!this.hasOverflow();!isValid&&this.clearHint();},hasFocus:function hasFocus(){return this.$input.is(":focus");},hasOverflow:function hasOverflow(){var constraint=this.$input.width()-2;this.$overflowHelper.text(this.getInputValue());return this.$overflowHelper.width()>=constraint;},isCursorAtEnd:function(){var valueLength,selectionStart,range;valueLength=this.$input.val().length;selectionStart=this.$input[0].selectionStart;if(_.isNumber(selectionStart)){return selectionStart===valueLength;}else if(document.selection){range=document.selection.createRange();range.moveStart("character",-valueLength);return valueLength===range.text.length;}
return true;},destroy:function destroy(){this.$hint.off(".tt");this.$input.off(".tt");this.$overflowHelper.remove();this.$hint=this.$input=this.$overflowHelper=$("<div>");}});return Input;function buildOverflowHelper($input){return $('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:$input.css("font-family"),fontSize:$input.css("font-size"),fontStyle:$input.css("font-style"),fontVariant:$input.css("font-variant"),fontWeight:$input.css("font-weight"),wordSpacing:$input.css("word-spacing"),letterSpacing:$input.css("letter-spacing"),textIndent:$input.css("text-indent"),textRendering:$input.css("text-rendering"),textTransform:$input.css("text-transform")}).insertAfter($input);}
function areQueriesEquivalent(a,b){return Input.normalizeQuery(a)===Input.normalizeQuery(b);}
function withModifier($e){return $e.altKey||$e.ctrlKey||$e.metaKey||$e.shiftKey;}}();var Dataset=function(){"use strict";var keys,nameGenerator;keys={val:"tt-selectable-display",obj:"tt-selectable-object"};nameGenerator=_.getIdGenerator();function Dataset(o,www){o=o||{};o.templates=o.templates||{};o.templates.notFound=o.templates.notFound||o.templates.empty;if(!o.source){$.error("missing source");}
if(!o.node){$.error("missing node");}
if(o.name&&!isValidName(o.name)){$.error("invalid dataset name: "+o.name);}
www.mixin(this);this.highlight=!!o.highlight;this.name=o.name||nameGenerator();this.limit=o.limit||5;this.displayFn=getDisplayFn(o.display||o.displayKey);this.templates=getTemplates(o.templates,this.displayFn);this.source=o.source.__ttAdapter?o.source.__ttAdapter():o.source;this.async=_.isUndefined(o.async)?this.source.length>2:!!o.async;this._resetLastSuggestion();this.$el=$(o.node).addClass(this.classes.dataset).addClass(this.classes.dataset+"-"+this.name);}
Dataset.extractData=function extractData(el){var $el=$(el);if($el.data(keys.obj)){return{val:$el.data(keys.val)||"",obj:$el.data(keys.obj)||null};}
return null;};_.mixin(Dataset.prototype,EventEmitter,{_overwrite:function overwrite(query,suggestions){suggestions=suggestions||[];if(suggestions.length){this._renderSuggestions(query,suggestions);}else if(this.async&&this.templates.pending){this._renderPending(query);}else if(!this.async&&this.templates.notFound){this._renderNotFound(query);}else{this._empty();}
this.trigger("rendered",this.name,suggestions,false);},_append:function append(query,suggestions){suggestions=suggestions||[];if(suggestions.length&&this.$lastSuggestion.length){this._appendSuggestions(query,suggestions);}else if(suggestions.length){this._renderSuggestions(query,suggestions);}else if(!this.$lastSuggestion.length&&this.templates.notFound){this._renderNotFound(query);}
this.trigger("rendered",this.name,suggestions,true);},_renderSuggestions:function renderSuggestions(query,suggestions){var $fragment;$fragment=this._getSuggestionsFragment(query,suggestions);this.$lastSuggestion=$fragment.children().last();this.$el.html($fragment).prepend(this._getHeader(query,suggestions)).append(this._getFooter(query,suggestions));},_appendSuggestions:function appendSuggestions(query,suggestions){var $fragment,$lastSuggestion;$fragment=this._getSuggestionsFragment(query,suggestions);$lastSuggestion=$fragment.children().last();this.$lastSuggestion.after($fragment);this.$lastSuggestion=$lastSuggestion;},_renderPending:function renderPending(query){var template=this.templates.pending;this._resetLastSuggestion();template&&this.$el.html(template({query:query,dataset:this.name}));},_renderNotFound:function renderNotFound(query){var template=this.templates.notFound;this._resetLastSuggestion();template&&this.$el.html(template({query:query,dataset:this.name}));},_empty:function empty(){this.$el.empty();this._resetLastSuggestion();},_getSuggestionsFragment:function getSuggestionsFragment(query,suggestions){var that=this,fragment;fragment=document.createDocumentFragment();_.each(suggestions,function getSuggestionNode(suggestion){var $el,context;context=that._injectQuery(query,suggestion);$el=$(that.templates.suggestion(context)).data(keys.obj,suggestion).data(keys.val,that.displayFn(suggestion)).addClass(that.classes.suggestion+" "+that.classes.selectable);fragment.appendChild($el[0]);});this.highlight&&highlight({className:this.classes.highlight,node:fragment,pattern:query});return $(fragment);},_getFooter:function getFooter(query,suggestions){return this.templates.footer?this.templates.footer({query:query,suggestions:suggestions,dataset:this.name}):null;},_getHeader:function getHeader(query,suggestions){return this.templates.header?this.templates.header({query:query,suggestions:suggestions,dataset:this.name}):null;},_resetLastSuggestion:function resetLastSuggestion(){this.$lastSuggestion=$();},_injectQuery:function injectQuery(query,obj){return _.isObject(obj)?_.mixin({_query:query},obj):obj;},update:function update(query){var that=this,canceled=false,syncCalled=false,rendered=0;this.cancel();this.cancel=function cancel(){canceled=true;that.cancel=$.noop;that.async&&that.trigger("asyncCanceled",query);};this.source(query,sync,async);!syncCalled&&sync([]);function sync(suggestions){if(syncCalled){return;}
syncCalled=true;suggestions=(suggestions||[]).slice(0,that.limit);rendered=suggestions.length;that._overwrite(query,suggestions);if(rendered<that.limit&&that.async){that.trigger("asyncRequested",query);}}
function async(suggestions){suggestions=suggestions||[];if(!canceled&&rendered<that.limit){that.cancel=$.noop;that._append(query,suggestions.slice(0,that.limit-rendered));rendered+=suggestions.length;that.async&&that.trigger("asyncReceived",query);}}},cancel:$.noop,clear:function clear(){this._empty();this.cancel();this.trigger("cleared");},isEmpty:function isEmpty(){return this.$el.is(":empty");},destroy:function destroy(){this.$el=$("<div>");}});return Dataset;function getDisplayFn(display){display=display||_.stringify;return _.isFunction(display)?display:displayFn;function displayFn(obj){return obj[display];}}
function getTemplates(templates,displayFn){return{notFound:templates.notFound&&_.templatify(templates.notFound),pending:templates.pending&&_.templatify(templates.pending),header:templates.header&&_.templatify(templates.header),footer:templates.footer&&_.templatify(templates.footer),suggestion:templates.suggestion||suggestionTemplate};function suggestionTemplate(context){return $("<div>").text(displayFn(context));}}
function isValidName(str){return/^[_a-zA-Z0-9-]+$/.test(str);}}();var Menu=function(){"use strict";function Menu(o,www){var that=this;o=o||{};if(!o.node){$.error("node is required");}
www.mixin(this);this.$node=$(o.node);this.query=null;this.datasets=_.map(o.datasets,initializeDataset);function initializeDataset(oDataset){var node=that.$node.find(oDataset.node).first();oDataset.node=node.length?node:$("<div>").appendTo(that.$node);return new Dataset(oDataset,www);}}
_.mixin(Menu.prototype,EventEmitter,{_onSelectableClick:function onSelectableClick(e){var targetIsButton=$(e.target).is('button');var parentIsButton=$(e.target).parents('button').length>0;if(!targetIsButton&&!parentIsButton){this.trigger("selectableClicked",$(e.currentTarget));}},_onRendered:function onRendered(type,dataset,suggestions,async){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty());this.trigger("datasetRendered",dataset,suggestions,async);},_onCleared:function onCleared(){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty());this.trigger("datasetCleared");},_propagate:function propagate(){this.trigger.apply(this,arguments);},_allDatasetsEmpty:function allDatasetsEmpty(){return _.every(this.datasets,isDatasetEmpty);function isDatasetEmpty(dataset){return dataset.isEmpty();}},_getSelectables:function getSelectables(){return this.$node.find(this.selectors.selectable);},_removeCursor:function _removeCursor(){var $selectable=this.getActiveSelectable();$selectable&&$selectable.removeClass(this.classes.cursor);},_ensureVisible:function ensureVisible($el){var elTop,elBottom,nodeScrollTop,nodeHeight;elTop=$el.position().top;elBottom=elTop+$el.outerHeight(true);nodeScrollTop=this.$node.scrollTop();nodeHeight=this.$node.height()+parseInt(this.$node.css("paddingTop"),10)+parseInt(this.$node.css("paddingBottom"),10);if(elTop<0){this.$node.scrollTop(nodeScrollTop+elTop);}else if(nodeHeight<elBottom){this.$node.scrollTop(nodeScrollTop+(elBottom-nodeHeight));}},bind:function(){var that=this,onSelectableClick;onSelectableClick=_.bind(this._onSelectableClick,this);this.$node.on("click.tt",this.selectors.selectable,onSelectableClick);_.each(this.datasets,function(dataset){dataset.onSync("asyncRequested",that._propagate,that).onSync("asyncCanceled",that._propagate,that).onSync("asyncReceived",that._propagate,that).onSync("rendered",that._onRendered,that).onSync("cleared",that._onCleared,that);});return this;},isOpen:function isOpen(){return this.$node.hasClass(this.classes.open);},open:function open(){this.$node.addClass(this.classes.open);},close:function close(){this.$node.removeClass(this.classes.open);this._removeCursor();},setLanguageDirection:function setLanguageDirection(dir){this.$node.attr("dir",dir);},selectableRelativeToCursor:function selectableRelativeToCursor(delta){var $selectables,$oldCursor,oldIndex,newIndex;$oldCursor=this.getActiveSelectable();$selectables=this._getSelectables();oldIndex=$oldCursor?$selectables.index($oldCursor):-1;newIndex=oldIndex+delta;newIndex=(newIndex+1)%($selectables.length+1)-1;newIndex=newIndex<-1?$selectables.length-1:newIndex;return newIndex===-1?null:$selectables.eq(newIndex);},setCursor:function setCursor($selectable){this._removeCursor();if($selectable=$selectable&&$selectable.first()){$selectable.addClass(this.classes.cursor);this._ensureVisible($selectable);}},getSelectableData:function getSelectableData($el){return $el&&$el.length?Dataset.extractData($el):null;},getActiveSelectable:function getActiveSelectable(){var $selectable=this._getSelectables().filter(this.selectors.cursor).first();return $selectable.length?$selectable:null;},getTopSelectable:function getTopSelectable(){var $selectable=this._getSelectables().first();return $selectable.length?$selectable:null;},update:function update(query){var isValidUpdate=query!==this.query;if(isValidUpdate){this.query=query;_.each(this.datasets,updateDataset);}
return isValidUpdate;function updateDataset(dataset){dataset.update(query);}},empty:function empty(){_.each(this.datasets,clearDataset);this.query=null;this.$node.addClass(this.classes.empty);function clearDataset(dataset){dataset.clear();}},destroy:function destroy(){this.$node.off(".tt");this.$node=$("<div>");_.each(this.datasets,destroyDataset);function destroyDataset(dataset){dataset.destroy();}}});return Menu;}();var DefaultMenu=function(){"use strict";var s=Menu.prototype;function DefaultMenu(){Menu.apply(this,[].slice.call(arguments,0));}
_.mixin(DefaultMenu.prototype,Menu.prototype,{open:function open(){!this._allDatasetsEmpty()&&this._show();return s.open.apply(this,[].slice.call(arguments,0));},close:function close(){this._hide();return s.close.apply(this,[].slice.call(arguments,0));},_onRendered:function onRendered(){if(this._allDatasetsEmpty()){this._hide();}else{this.isOpen()&&this._show();}
return s._onRendered.apply(this,[].slice.call(arguments,0));},_onCleared:function onCleared(){if(this._allDatasetsEmpty()){this._hide();}else{this.isOpen()&&this._show();}
return s._onCleared.apply(this,[].slice.call(arguments,0));},setLanguageDirection:function setLanguageDirection(dir){this.$node.css(dir==="ltr"?this.css.ltr:this.css.rtl);return s.setLanguageDirection.apply(this,[].slice.call(arguments,0));},_hide:function hide(){this.$node.hide();},_show:function show(){this.$node.css("display","block");}});return DefaultMenu;}();var Typeahead=function(){"use strict";function Typeahead(o,www){var onFocused,onBlurred,onEnterKeyed,onTabKeyed,onEscKeyed,onUpKeyed,onDownKeyed,onLeftKeyed,onRightKeyed,onQueryChanged,onWhitespaceChanged;o=o||{};if(!o.input){$.error("missing input");}
if(!o.menu){$.error("missing menu");}
if(!o.eventBus){$.error("missing event bus");}
www.mixin(this);this.eventBus=o.eventBus;this.minLength=_.isNumber(o.minLength)?o.minLength:1;this.input=o.input;this.menu=o.menu;this.enabled=true;this.active=false;this.input.hasFocus()&&this.activate();this.dir=this.input.getLangDir();this._hacks();this.menu.bind().onSync("selectableClicked",this._onSelectableClicked,this).onSync("asyncRequested",this._onAsyncRequested,this).onSync("asyncCanceled",this._onAsyncCanceled,this).onSync("asyncReceived",this._onAsyncReceived,this).onSync("datasetRendered",this._onDatasetRendered,this).onSync("datasetCleared",this._onDatasetCleared,this);onFocused=c(this,"activate","open","_onFocused");onBlurred=c(this,"deactivate","_onBlurred");onEnterKeyed=c(this,"isActive","isOpen","_onEnterKeyed");onTabKeyed=c(this,"isActive","isOpen","_onTabKeyed");onEscKeyed=c(this,"isActive","_onEscKeyed");onUpKeyed=c(this,"isActive","open","_onUpKeyed");onDownKeyed=c(this,"isActive","open","_onDownKeyed");onLeftKeyed=c(this,"isActive","isOpen","_onLeftKeyed");onRightKeyed=c(this,"isActive","isOpen","_onRightKeyed");onQueryChanged=c(this,"_openIfActive","_onQueryChanged");onWhitespaceChanged=c(this,"_openIfActive","_onWhitespaceChanged");this.input.bind().onSync("focused",onFocused,this).onSync("blurred",onBlurred,this).onSync("enterKeyed",onEnterKeyed,this).onSync("tabKeyed",onTabKeyed,this).onSync("escKeyed",onEscKeyed,this).onSync("upKeyed",onUpKeyed,this).onSync("downKeyed",onDownKeyed,this).onSync("leftKeyed",onLeftKeyed,this).onSync("rightKeyed",onRightKeyed,this).onSync("queryChanged",onQueryChanged,this).onSync("whitespaceChanged",onWhitespaceChanged,this).onSync("langDirChanged",this._onLangDirChanged,this);}
_.mixin(Typeahead.prototype,{_hacks:function hacks(){var $input,$menu;$input=this.input.$input||$("<div>");$menu=this.menu.$node||$("<div>");$input.on("blur.tt",function($e){var active,isActive,hasActive;active=document.activeElement;isActive=$menu.is(active);hasActive=$menu.has(active).length>0;if(_.isMsie()&&(isActive||hasActive)){$e.preventDefault();$e.stopImmediatePropagation();_.defer(function(){$input.focus();});}});$menu.on("mousedown.tt",function($e){$e.preventDefault();});},_onSelectableClicked:function onSelectableClicked(type,$el){this.select($el);},_onDatasetCleared:function onDatasetCleared(){this._updateHint();},_onDatasetRendered:function onDatasetRendered(type,dataset,suggestions,async){this._updateHint();this.eventBus.trigger("render",suggestions,async,dataset);},_onAsyncRequested:function onAsyncRequested(type,dataset,query){this.eventBus.trigger("asyncrequest",query,dataset);},_onAsyncCanceled:function onAsyncCanceled(type,dataset,query){this.eventBus.trigger("asynccancel",query,dataset);},_onAsyncReceived:function onAsyncReceived(type,dataset,query){this.eventBus.trigger("asyncreceive",query,dataset);},_onFocused:function onFocused(){this._minLengthMet()&&this.menu.update(this.input.getQuery());},_onBlurred:function onBlurred(){if(this.input.hasQueryChangedSinceLastFocus()){this.eventBus.trigger("change",this.input.getQuery());}},_onEnterKeyed:function onEnterKeyed(type,$e){var $selectable;if($selectable=this.menu.getActiveSelectable()){this.select($selectable)&&$e.preventDefault();}},_onTabKeyed:function onTabKeyed(type,$e){return false;},_onEscKeyed:function onEscKeyed(){this.close();},_onUpKeyed:function onUpKeyed(){this.moveCursor(-1);},_onDownKeyed:function onDownKeyed(){this.moveCursor(+1);},_onLeftKeyed:function onLeftKeyed(){if(this.dir==="rtl"&&this.input.isCursorAtEnd()){this.autocomplete(this.menu.getTopSelectable());}},_onRightKeyed:function onRightKeyed(){if(this.dir==="ltr"&&this.input.isCursorAtEnd()){this.autocomplete(this.menu.getTopSelectable());}},_onQueryChanged:function onQueryChanged(e,query){this._minLengthMet(query)?this.menu.update(query):this.menu.empty();},_onWhitespaceChanged:function onWhitespaceChanged(){this._updateHint();},_onLangDirChanged:function onLangDirChanged(e,dir){if(this.dir!==dir){this.dir=dir;this.menu.setLanguageDirection(dir);}},_openIfActive:function openIfActive(){this.isActive()&&this.open();},_minLengthMet:function minLengthMet(query){query=_.isString(query)?query:this.input.getQuery()||"";return query.length>=this.minLength;},_updateHint:function updateHint(){var $selectable,data,val,query,escapedQuery,frontMatchRegEx,match;$selectable=this.menu.getTopSelectable();data=this.menu.getSelectableData($selectable);val=this.input.getInputValue();if(data&&!_.isBlankString(val)&&!this.input.hasOverflow()){query=Input.normalizeQuery(val);escapedQuery=_.escapeRegExChars(query);frontMatchRegEx=new RegExp("^(?:"+escapedQuery+")(.+$)","i");match=frontMatchRegEx.exec(data.val);match&&this.input.setHint(val+match[1]);}else{this.input.clearHint();}},isEnabled:function isEnabled(){return this.enabled;},enable:function enable(){this.enabled=true;},disable:function disable(){this.enabled=false;},isActive:function isActive(){return this.active;},activate:function activate(){if(this.isActive()){return true;}else if(!this.isEnabled()||this.eventBus.before("active")){return false;}else{this.active=true;this.eventBus.trigger("active");return true;}},deactivate:function deactivate(){if(!this.isActive()){return true;}else if(this.eventBus.before("idle")){return false;}else{this.active=false;this.close();this.eventBus.trigger("idle");return true;}},isOpen:function isOpen(){return this.menu.isOpen();},open:function open(){if(!this.isOpen()&&!this.eventBus.before("open")){this.menu.open();this._updateHint();this.eventBus.trigger("open");}
return this.isOpen();},close:function close(){if(this.isOpen()&&!this.eventBus.before("close")){this.menu.close();this.input.clearHint();this.input.resetInputValue();this.eventBus.trigger("close");}
return!this.isOpen();},setVal:function setVal(val){this.input.setQuery(_.toStr(val));},getVal:function getVal(){return this.input.getQuery();},select:function select($selectable){var data=this.menu.getSelectableData($selectable);if(data&&!this.eventBus.before("select",data.obj)){this.eventBus.trigger("select",data.obj);this.close();return true;}
return false;},autocomplete:function autocomplete($selectable){var query,data,isValid;query=this.input.getQuery();data=this.menu.getSelectableData($selectable);isValid=data&&query!==data.val;if(isValid&&!this.eventBus.before("autocomplete",data.obj)){this.input.setQuery(data.val);this.eventBus.trigger("autocomplete",data.obj);return true;}
return false;},moveCursor:function moveCursor(delta){var query,$candidate,data,payload,cancelMove;query=this.input.getQuery();$candidate=this.menu.selectableRelativeToCursor(delta);data=this.menu.getSelectableData($candidate);payload=data?data.obj:null;cancelMove=this._minLengthMet()&&this.menu.update(query);if(!cancelMove&&!this.eventBus.before("cursorchange",payload)){this.menu.setCursor($candidate);if(data){}else{this.input.resetInputValue();this._updateHint();}
this.eventBus.trigger("cursorchange",payload);return true;}
return false;},destroy:function destroy(){this.input.destroy();this.menu.destroy();}});return Typeahead;function c(ctx){var methods=[].slice.call(arguments,1);return function(){var args=[].slice.call(arguments);_.each(methods,function(method){return ctx[method].apply(ctx,args);});};}}();(function(){"use strict";var old,keys,methods;old=$.fn.typeahead;keys={www:"tt-www",attrs:"tt-attrs",typeahead:"tt-typeahead"};methods={initialize:function initialize(o,datasets){var www;datasets=_.isArray(datasets)?datasets:[].slice.call(arguments,1);o=o||{};www=WWW(o.classNames);return this.each(attach);function attach(){var $input,$wrapper,$hint,$menu,defaultHint,defaultMenu,eventBus,input,menu,typeahead,MenuConstructor;_.each(datasets,function(d){d.highlight=!!o.highlight;});$input=$(this);$wrapper=$(www.html.wrapper);$hint=$elOrNull(o.hint);$menu=$elOrNull(o.menu);defaultHint=o.hint!==false&&!$hint;defaultMenu=o.menu!==false&&!$menu;defaultHint&&($hint=buildHintFromInput($input,www));defaultMenu&&($menu=$(www.html.menu).css(www.css.menu));$hint&&$hint.val("");$input=prepInput($input,www);if(defaultHint||defaultMenu){$wrapper.css(www.css.wrapper);$input.css(defaultHint?www.css.input:www.css.inputWithNoHint);$input.wrap($wrapper).parent().prepend(defaultHint?$hint:null).append(defaultMenu?$menu:null);}
MenuConstructor=defaultMenu?DefaultMenu:Menu;eventBus=new EventBus({el:$input});input=new Input({hint:$hint,input:$input},www);menu=new MenuConstructor({node:$menu,datasets:datasets},www);typeahead=new Typeahead({input:input,menu:menu,eventBus:eventBus,minLength:o.minLength},www);$input.data(keys.www,www);$input.data(keys.typeahead,typeahead);}},isEnabled:function isEnabled(){var enabled;ttEach(this.first(),function(t){enabled=t.isEnabled();});return enabled;},enable:function enable(){ttEach(this,function(t){t.enable();});return this;},disable:function disable(){ttEach(this,function(t){t.disable();});return this;},isActive:function isActive(){var active;ttEach(this.first(),function(t){active=t.isActive();});return active;},activate:function activate(){ttEach(this,function(t){t.activate();});return this;},deactivate:function deactivate(){ttEach(this,function(t){t.deactivate();});return this;},isOpen:function isOpen(){var open;ttEach(this.first(),function(t){open=t.isOpen();});return open;},open:function open(){ttEach(this,function(t){t.open();});return this;},close:function close(){ttEach(this,function(t){t.close();});return this;},select:function select(el){var success=false,$el=$(el);ttEach(this.first(),function(t){success=t.select($el);});return success;},autocomplete:function autocomplete(el){var success=false,$el=$(el);ttEach(this.first(),function(t){success=t.autocomplete($el);});return success;},moveCursor:function moveCursoe(delta){var success=false;ttEach(this.first(),function(t){success=t.moveCursor(delta);});return success;},val:function val(newVal){var query;if(!arguments.length){ttEach(this.first(),function(t){query=t.getVal();});return query;}else{ttEach(this,function(t){t.setVal(newVal);});return this;}},destroy:function destroy(){ttEach(this,function(typeahead,$input){revert($input);typeahead.destroy();});return this;}};$.fn.typeahead=function(method){if(methods[method]){return methods[method].apply(this,[].slice.call(arguments,1));}else{return methods.initialize.apply(this,arguments);}};$.fn.typeahead.noConflict=function noConflict(){$.fn.typeahead=old;return this;};function ttEach($els,fn){$els.each(function(){var $input=$(this),typeahead;(typeahead=$input.data(keys.typeahead))&&fn(typeahead,$input);});}
function buildHintFromInput($input,www){return $input.clone().addClass(www.classes.hint).removeData().css(www.css.hint).css(getBackgroundStyles($input)).prop("readonly",true).removeAttr("id name placeholder required").attr({autocomplete:"off",spellcheck:"false",tabindex:-1});}
function prepInput($input,www){$input.data(keys.attrs,{dir:$input.attr("dir"),autocomplete:$input.attr("autocomplete"),spellcheck:$input.attr("spellcheck"),style:$input.attr("style")});$input.addClass(www.classes.input).attr({autocomplete:"off",spellcheck:false});try{!$input.attr("dir")&&$input.attr("dir","auto");}catch(e){}
return $input;}
function getBackgroundStyles($el){return{backgroundAttachment:$el.css("background-attachment"),backgroundClip:$el.css("background-clip"),backgroundColor:$el.css("background-color"),backgroundImage:$el.css("background-image"),backgroundOrigin:$el.css("background-origin"),backgroundPosition:$el.css("background-position"),backgroundRepeat:$el.css("background-repeat"),backgroundSize:$el.css("background-size")};}
function revert($input){var www,$wrapper;www=$input.data(keys.www);$wrapper=$input.parent().filter(www.selectors.wrapper);_.each($input.data(keys.attrs),function(val,key){_.isUndefined(val)?$input.removeAttr(key):$input.attr(key,val);});$input.removeData(keys.typeahead).removeData(keys.www).removeData(keys.attr).removeClass(www.classes.input);if($wrapper.length){$input.detach().insertAfter($wrapper);$wrapper.remove();}}
function $elOrNull(obj){var isValid,$el;isValid=_.isJQuery(obj)||_.isElement(obj);$el=isValid?$(obj).first():[];return $el.length?$el:null;}})();});+function($){'use strict';var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.VERSION='3.3.7'
Alert.TRANSITION_DURATION=150
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector==='#'?[]:selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.closest('.alert')}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.detach().trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one('bsTransitionEnd',removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.alert
$.fn.alert=Plugin
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(jQuery);+function($){'use strict';var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)
this.isLoading=false}
Button.VERSION='3.3.7'
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state+='Text'
if(data.resetText==null)$el.data('resetText',$el[val]())
setTimeout($.proxy(function(){$el[val](data[state]==null?this.options[state]:data[state])
if(state=='loadingText'){this.isLoading=true
$el.addClass(d).attr(d,d).prop(d,true)}else if(this.isLoading){this.isLoading=false
$el.removeClass(d).removeAttr(d).prop(d,false)}},this),0)}
Button.prototype.toggle=function(){var changed=true
var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input')
if($input.prop('type')=='radio'){if($input.prop('checked'))changed=false
$parent.find('.active').removeClass('active')
this.$element.addClass('active')}else if($input.prop('type')=='checkbox'){if(($input.prop('checked'))!==this.$element.hasClass('active'))changed=false
this.$element.toggleClass('active')}
$input.prop('checked',this.$element.hasClass('active'))
if(changed)$input.trigger('change')}else{this.$element.attr('aria-pressed',!this.$element.hasClass('active'))
this.$element.toggleClass('active')}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
var old=$.fn.button
$.fn.button=Plugin
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^="button"]',function(e){var $btn=$(e.target).closest('.btn')
Plugin.call($btn,'toggle')
if(!($(e.target).is('input[type="radio"], input[type="checkbox"]'))){e.preventDefault()
if($btn.is('input,button'))$btn.trigger('focus')
else $btn.find('input:visible,button:visible').first().trigger('focus')}}).on('focus.bs.button.data-api blur.bs.button.data-api','[data-toggle^="button"]',function(e){$(e.target).closest('.btn').toggleClass('focus',/^focus(in)?$/.test(e.type))})}(jQuery);+function($){'use strict';var Carousel=function(element,options){this.$element=$(element)
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=null
this.sliding=null
this.interval=null
this.$active=null
this.$items=null
this.options.keyboard&&this.$element.on('keydown.bs.carousel',$.proxy(this.keydown,this))
this.options.pause=='hover'&&!('ontouchstart'in document.documentElement)&&this.$element.on('mouseenter.bs.carousel',$.proxy(this.pause,this)).on('mouseleave.bs.carousel',$.proxy(this.cycle,this))}
Carousel.VERSION='3.3.7'
Carousel.TRANSITION_DURATION=600
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:true,keyboard:true}
Carousel.prototype.keydown=function(e){if(/input|textarea/i.test(e.target.tagName))return
switch(e.which){case 37:this.prev();break
case 39:this.next();break
default:return}
e.preventDefault()}
Carousel.prototype.cycle=function(e){e||(this.paused=false)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getItemIndex=function(item){this.$items=item.parent().children('.item')
return this.$items.index(item||this.$active)}
Carousel.prototype.getItemForDirection=function(direction,active){var activeIndex=this.getItemIndex(active)
var willWrap=(direction=='prev'&&activeIndex===0)||(direction=='next'&&activeIndex==(this.$items.length-1))
if(willWrap&&!this.options.wrap)return active
var delta=direction=='prev'?-1:1
var itemIndex=(activeIndex+delta)%this.$items.length
return this.$items.eq(itemIndex)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getItemIndex(this.$active=this.$element.find('.item.active'))
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid.bs.carousel',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',this.$items.eq(pos))}
Carousel.prototype.pause=function(e){e||(this.paused=true)
if(this.$element.find('.next, .prev').length&&$.support.transition){this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||this.getItemForDirection(type,$active)
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var that=this
if($next.hasClass('active'))return(this.sliding=false)
var relatedTarget=$next[0]
var slideEvent=$.Event('slide.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
this.$element.trigger(slideEvent)
if(slideEvent.isDefaultPrevented())return
this.sliding=true
isCycling&&this.pause()
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator&&$nextIndicator.addClass('active')}
var slidEvent=$.Event('slid.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
if($.support.transition&&this.$element.hasClass('slide')){$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one('bsTransitionEnd',function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd(Carousel.TRANSITION_DURATION)}else{$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger(slidEvent)}
isCycling&&this.cycle()
return this}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
var old=$.fn.carousel
$.fn.carousel=Plugin
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
var clickHandler=function(e){var href
var $this=$(this)
var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
if(!$target.hasClass('carousel'))return
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=false
Plugin.call($target,options)
if(slideIndex){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()}
$(document).on('click.bs.carousel.data-api','[data-slide]',clickHandler).on('click.bs.carousel.data-api','[data-slide-to]',clickHandler)
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
Plugin.call($carousel,$carousel.data())})})}(jQuery);+function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.$trigger=$('[data-toggle="collapse"][href="#'+element.id+'"],'+'[data-toggle="collapse"][data-target="#'+element.id+'"]')
this.transitioning=null
if(this.options.parent){this.$parent=this.getParent()}else{this.addAriaAndCollapsedClass(this.$element,this.$trigger)}
if(this.options.toggle)this.toggle()}
Collapse.VERSION='3.3.7'
Collapse.TRANSITION_DURATION=350
Collapse.DEFAULTS={toggle:true}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var activesData
var actives=this.$parent&&this.$parent.children('.panel').children('.in, .collapsing')
if(actives&&actives.length){activesData=actives.data('bs.collapse')
if(activesData&&activesData.transitioning)return}
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
if(actives&&actives.length){Plugin.call(actives,'hide')
activesData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded',true)
this.$trigger.removeClass('collapsed').attr('aria-expanded',true)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded',false)
this.$trigger.addClass('collapsed').attr('aria-expanded',false)
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0).one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
Collapse.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element)
this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()}
Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=$element.hasClass('in')
$element.attr('aria-expanded',isOpen)
$trigger.toggleClass('collapsed',!isOpen).attr('aria-expanded',isOpen)}
function getTargetFromTrigger($trigger){var href
var target=$trigger.attr('data-target')||(href=$trigger.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
return $(target)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&/show|hide/.test(option))options.toggle=false
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.collapse
$.fn.collapse=Plugin
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle="collapse"]',function(e){var $this=$(this)
if(!$this.attr('data-target'))e.preventDefault()
var $target=getTargetFromTrigger($this)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
Plugin.call($target,option)})}(jQuery);+function($){'use strict';var backdrop='.dropdown-backdrop'
var toggle='[data-toggle="dropdown"]'
var Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.VERSION='3.3.7'
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
function clearMenus(e){if(e&&e.which===3)return
$(backdrop).remove()
$(toggle).each(function(){var $this=$(this)
var $parent=getParent($this)
var relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
if(e&&e.type=='click'&&/input|textarea/i.test(e.target.tagName)&&$.contains($parent[0],e.target))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.attr('aria-expanded','false')
$parent.removeClass('open').trigger($.Event('hidden.bs.dropdown',relatedTarget))})}
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement&&!$parent.closest('.navbar-nav').length){$(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.trigger('focus').attr('aria-expanded','true')
$parent.toggleClass('open').trigger($.Event('shown.bs.dropdown',relatedTarget))}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27|32)/.test(e.which)||/input|textarea/i.test(e.target.tagName))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if(!isActive&&e.which!=27||isActive&&e.which==27){if(e.which==27)$parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc=' li:not(.disabled):visible a'
var $items=$parent.find('.dropdown-menu'+desc)
if(!$items.length)return
var index=$items.index(e.target)
if(e.which==38&&index>0)index--
if(e.which==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).trigger('focus')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.dropdown
$.fn.dropdown=Plugin
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','.dropdown-menu',Dropdown.prototype.keydown)}(jQuery);+function($){'use strict';var Modal=function(element,options){this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$dialog=this.$element.find('.modal-dialog')
this.$backdrop=null
this.isShown=null
this.originalBodyPad=null
this.scrollbarWidth=0
this.ignoreBackdropClick=false
if(this.options.remote){this.$element.find('.modal-content').load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.VERSION='3.3.7'
Modal.TRANSITION_DURATION=300
Modal.BACKDROP_TRANSITION_DURATION=150
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.checkScrollbar()
this.setScrollbar()
this.$body.addClass('modal-open')
this.escape()
this.resize()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.$dialog.on('mousedown.dismiss.bs.modal',function(){that.$element.one('mouseup.dismiss.bs.modal',function(e){if($(e.target).is(that.$element))that.ignoreBackdropClick=true})})
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(that.$body)}
that.$element.show().scrollTop(0)
that.adjustDialog()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in')
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$dialog.one('bsTransitionEnd',function(){that.$element.trigger('focus').trigger(e)}).emulateTransitionEnd(Modal.TRANSITION_DURATION):that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
this.resize()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal')
this.$dialog.off('mousedown.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one('bsTransitionEnd',$.proxy(this.hideModal,this)).emulateTransitionEnd(Modal.TRANSITION_DURATION):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(document!==e.target&&this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.trigger('focus')}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keydown.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keydown.dismiss.bs.modal')}}
Modal.prototype.resize=function(){if(this.isShown){$(window).on('resize.bs.modal',$.proxy(this.handleUpdate,this))}else{$(window).off('resize.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.$body.removeClass('modal-open')
that.resetAdjustments()
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$(document.createElement('div')).addClass('modal-backdrop '+animate).appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){if(this.ignoreBackdropClick){this.ignoreBackdropClick=false
return}
if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus():this.hide()},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one('bsTransitionEnd',callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
var callbackRemove=function(){that.removeBackdrop()
callback&&callback()}
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one('bsTransitionEnd',callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove()}else if(callback){callback()}}
Modal.prototype.handleUpdate=function(){this.adjustDialog()}
Modal.prototype.adjustDialog=function(){var modalIsOverflowing=this.$element[0].scrollHeight>document.documentElement.clientHeight
this.$element.css({paddingLeft:!this.bodyIsOverflowing&&modalIsOverflowing?this.scrollbarWidth:'',paddingRight:this.bodyIsOverflowing&&!modalIsOverflowing?this.scrollbarWidth:''})}
Modal.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:'',paddingRight:''})}
Modal.prototype.checkScrollbar=function(){var fullWindowWidth=window.innerWidth
if(!fullWindowWidth){var documentElementRect=document.documentElement.getBoundingClientRect()
fullWindowWidth=documentElementRect.right-Math.abs(documentElementRect.left)}
this.bodyIsOverflowing=document.body.clientWidth<fullWindowWidth
this.scrollbarWidth=this.measureScrollbar()}
Modal.prototype.setScrollbar=function(){var bodyPad=parseInt((this.$body.css('padding-right')||0),10)
this.originalBodyPad=document.body.style.paddingRight||''
if(this.bodyIsOverflowing)this.$body.css('padding-right',bodyPad+this.scrollbarWidth)}
Modal.prototype.resetScrollbar=function(){this.$body.css('padding-right',this.originalBodyPad)}
Modal.prototype.measureScrollbar=function(){var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target.one('show.bs.modal',function(showEvent){if(showEvent.isDefaultPrevented())return
$target.one('hidden.bs.modal',function(){$this.is(':visible')&&$this.trigger('focus')})})
Plugin.call($target,option,this)})}(jQuery);+function($){'use strict';var Tab=function(element){this.element=$(element)}
Tab.VERSION='3.3.7'
Tab.TRANSITION_DURATION=150
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var $previous=$ul.find('.active:last a')
var hideEvent=$.Event('hide.bs.tab',{relatedTarget:$this[0]})
var showEvent=$.Event('show.bs.tab',{relatedTarget:$previous[0]})
$previous.trigger(hideEvent)
$this.trigger(showEvent)
if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$previous.trigger({type:'hidden.bs.tab',relatedTarget:$this[0]})
$this.trigger({type:'shown.bs.tab',relatedTarget:$previous[0]})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&($active.length&&$active.hasClass('fade')||!!container.find('> .fade').length)
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',false)
element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded',true)
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu').length){element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',true)}
callback&&callback()}
$active.length&&transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(Tab.TRANSITION_DURATION):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tab
$.fn.tab=Plugin
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
var clickHandler=function(e){e.preventDefault()
Plugin.call($(this),'show')}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"]',clickHandler).on('click.bs.tab.data-api','[data-toggle="pill"]',clickHandler)}(jQuery);+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}
return false}
$.fn.emulateTransitionEnd=function(duration){var called=false
var $el=this
$(this).one('bsTransitionEnd',function(){called=true})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()
if(!$.support.transition)return
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);+function($){'use strict';var Tooltip=function(element,options){this.type=null
this.options=null
this.enabled=null
this.timeout=null
this.hoverState=null
this.$element=null
this.inState=null
this.init('tooltip',element,options)}
Tooltip.VERSION='3.3.7'
Tooltip.TRANSITION_DURATION=150
Tooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false,viewport:{selector:'body',padding:0}}
Tooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.$viewport=this.options.viewport&&$($.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):(this.options.viewport.selector||this.options.viewport))
this.inState={click:false,hover:false,focus:false}
if(this.$element[0]instanceof document.constructor&&!this.options.selector){throw new Error('`selector` option must be specified when initializing '+this.type+' on the window.document object!')}
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
if(obj instanceof $.Event){self.inState[obj.type=='focusin'?'focus':'hover']=true}
if(self.tip().hasClass('in')||self.hoverState=='in'){self.hoverState='in'
return}
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.isInStateTrue=function(){for(var key in this.inState){if(this.inState[key])return true}
return false}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
if(obj instanceof $.Event){self.inState[obj.type=='focusout'?'focus':'hover']=false}
if(self.isInStateTrue())return
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
var inDom=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0])
if(e.isDefaultPrevented()||!inDom)return
var that=this
var $tip=this.tip()
var tipId=this.getUID(this.type)
this.setContent()
$tip.attr('id',tipId)
this.$element.attr('aria-describedby',tipId)
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement).data('bs.'+this.type,this)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
this.$element.trigger('inserted.bs.'+this.type)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var orgPlacement=placement
var viewportDim=this.getPosition(this.$viewport)
placement=placement=='bottom'&&pos.bottom+actualHeight>viewportDim.bottom?'top':placement=='top'&&pos.top-actualHeight<viewportDim.top?'bottom':placement=='right'&&pos.right+actualWidth>viewportDim.width?'left':placement=='left'&&pos.left-actualWidth<viewportDim.left?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
var complete=function(){var prevHoverState=that.hoverState
that.$element.trigger('shown.bs.'+that.type)
that.hoverState=null
if(prevHoverState=='out')that.leave(that)}
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()}}
Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top+=marginTop
offset.left+=marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight}
var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight)
if(delta.left)offset.left+=delta.left
else offset.top+=delta.top
var isVertical=/top|bottom/.test(placement)
var arrowDelta=isVertical?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight
var arrowOffsetPosition=isVertical?'offsetWidth':'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],isVertical)}
Tooltip.prototype.replaceArrow=function(delta,dimension,isVertical){this.arrow().css(isVertical?'left':'top',50*(1-delta/dimension)+'%').css(isVertical?'top':'left','')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(callback){var that=this
var $tip=$(this.$tip)
var e=$.Event('hide.bs.'+this.type)
function complete(){if(that.hoverState!='in')$tip.detach()
if(that.$element){that.$element.removeAttr('aria-describedby').trigger('hidden.bs.'+that.type)}
callback&&callback()}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()
this.hoverState=null
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof $e.attr('data-original-title')!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function($element){$element=$element||this.$element
var el=$element[0]
var isBody=el.tagName=='BODY'
var elRect=el.getBoundingClientRect()
if(elRect.width==null){elRect=$.extend({},elRect,{width:elRect.right-elRect.left,height:elRect.bottom-elRect.top})}
var isSvg=window.SVGElement&&el instanceof window.SVGElement
var elOffset=isBody?{top:0,left:0}:(isSvg?null:$element.offset())
var scroll={scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop()}
var outerDims=isBody?{width:$(window).width(),height:$(window).height()}:null
return $.extend({},elRect,scroll,outerDims,elOffset)}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0}
if(!this.$viewport)return delta
var viewportPadding=this.options.viewport&&this.options.viewport.padding||0
var viewportDimensions=this.getPosition(this.$viewport)
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll
var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight
if(topEdgeOffset<viewportDimensions.top){delta.top=viewportDimensions.top-topEdgeOffset}else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height){delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}}else{var leftEdgeOffset=pos.left-viewportPadding
var rightEdgeOffset=pos.left+viewportPadding+actualWidth
if(leftEdgeOffset<viewportDimensions.left){delta.left=viewportDimensions.left-leftEdgeOffset}else if(rightEdgeOffset>viewportDimensions.right){delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}}
return delta}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*1000000)
while(document.getElementById(prefix))
return prefix}
Tooltip.prototype.tip=function(){if(!this.$tip){this.$tip=$(this.options.template)
if(this.$tip.length!=1){throw new Error(this.type+' `template` option must consist of exactly 1 top-level element!')}}
return this.$tip}
Tooltip.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow'))}
Tooltip.prototype.enable=function(){this.enabled=true}
Tooltip.prototype.disable=function(){this.enabled=false}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=this
if(e){self=$(e.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions())
$(e.currentTarget).data('bs.'+this.type,self)}}
if(e){self.inState.click=!self.inState.click
if(self.isInStateTrue())self.enter(self)
else self.leave(self)}else{self.tip().hasClass('in')?self.leave(self):self.enter(self)}}
Tooltip.prototype.destroy=function(){var that=this
clearTimeout(this.timeout)
this.hide(function(){that.$element.off('.'+that.type).removeData('bs.'+that.type)
if(that.$tip){that.$tip.detach()}
that.$tip=null
that.$arrow=null
that.$viewport=null
that.$element=null})}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tooltip
$.fn.tooltip=Plugin
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQuery);+function($){'use strict';var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.VERSION='3.3.7'
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content').children().detach().end()[this.options.html?(typeof content=='string'?'html':'append'):'text'](content)
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.arrow'))}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.popover
$.fn.popover=Plugin
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(jQuery);/*! Raven.js 1.2.0 (17e3431) | github.com/getsentry/raven-js */!function(a,b){"use strict";function c(){return"undefined"==typeof document?"":document.location.href}function d(a,b){var c,d;if(Q){b=b||{},a="raven"+a.substr(0,1).toUpperCase()+a.substr(1),document.createEvent?(c=document.createEvent("HTMLEvents"),c.initEvent(a,!0,!0)):(c=document.createEventObject(),c.eventType=a);for(d in b)m(b,d)&&(c[d]=b[d]);if(document.createEvent)document.dispatchEvent(c);else try{document.fireEvent("on"+c.eventType.toLowerCase(),c)}catch(e){}}}function e(a){this.name="RavenConfigError",this.message=a}function f(a){var b=aa.exec(a),c={},d=7;try{for(;d--;)c[_[d]]=b[d]||""}catch(f){throw new e("Invalid DSN: "+a)}if(c.pass)throw new e("Do not specify your private key in the DSN!");return c}function g(a){return void 0===a}function h(a){return"function"==typeof a}function i(a){return"[object String]"===U.toString.call(a)}function j(a){return"object"==typeof a&&null!==a}function k(a){for(var b in a)return!1;return!0}function l(a){return j(a)&&"[object Error]"===U.toString.call(a)||a instanceof Error}function m(a,b){return U.hasOwnProperty.call(a,b)}function n(a,b){var c,d;if(g(a.length))for(c in a)m(a,c)&&b.call(null,c,a[c]);else if(d=a.length)for(c=0;d>c;c++)b.call(null,c,a[c])}function o(a,b){var c=[];a.stack&&a.stack.length&&n(a.stack,function(a,b){var d=p(b);d&&c.push(d)}),d("handle",{stackInfo:a,options:b}),r(a.name,a.message,a.url,a.lineno,c,b)}function p(a){if(a.url){var b,c={filename:a.url,lineno:a.line,colno:a.column,"function":a.func||"?"},d=q(a);if(d){var e=["pre_context","context_line","post_context"];for(b=3;b--;)c[e[b]]=d[b]}return c.in_app=!(S.includePaths.test&&!S.includePaths.test(c.filename)||/(Raven|TraceKit)\./.test(c["function"])||/raven\.(min\.)?js$/.test(c.filename)),c}}function q(a){if(a.context&&S.fetchContext){for(var b=a.context,c=~~(b.length/2),d=b.length,e=!1;d--;)if(b[d].length>300){e=!0;break}if(e){if(g(a.column))return;return[[],b[c].substr(a.column,50),[]]}return[b.slice(0,c),b[c],b.slice(c+1)]}}function r(a,b,c,d,e,f){var g,h;S.ignoreErrors.test&&S.ignoreErrors.test(b)||(b+="",b=t(b,S.maxMessageLength),h=a+": "+b,h=t(h,S.maxMessageLength),e&&e.length?(c=e[0].filename||c,e.reverse(),g={frames:e}):c&&(g={frames:[{filename:c,lineno:d,in_app:!0}]}),S.ignoreUrls.test&&S.ignoreUrls.test(c)||(!S.whitelistUrls.test||S.whitelistUrls.test(c))&&w(s({exception:{type:a,value:b},stacktrace:g,culprit:c,message:h},f)))}function s(a,b){return b?(n(b,function(b,c){a[b]=c}),a):a}function t(a,b){return a.length<=b?a:a.substr(0,b)+"…"}function u(){return+new Date}function v(){if(Q&&document.location&&document.location.href){var a={headers:{"User-Agent":navigator.userAgent}};return a.url=document.location.href,document.referrer&&(a.headers.Referer=document.referrer),a}}function w(a){var b={project:N,logger:S.logger,platform:"javascript"},c=v();c&&(b.request=c),a=s(b,a),a.tags=s(s({},R.tags),a.tags),a.extra=s(s({},R.extra),a.extra),a.extra=s({"session:duration":u()-Y},a.extra),k(a.tags)&&delete a.tags,R.user&&(a.user=R.user),S.release&&(a.release=S.release),h(S.dataCallback)&&(a=S.dataCallback(a)||a),a&&!k(a)&&(!h(S.shouldSendCallback)||S.shouldSendCallback(a))&&(K=a.event_id||(a.event_id=B()),C("debug","Raven about to send:",a),z()&&(S.transport||x)({url:L,auth:{sentry_version:"4",sentry_client:"raven-js/"+$.VERSION,sentry_key:M},data:a,options:S,onSuccess:function(){d("success",{data:a,src:L})},onError:function(){d("failure",{data:a,src:L})}}))}function x(a){a.auth.sentry_data=JSON.stringify(a.data);var b=y(),c=a.url+"?"+E(a.auth);(a.options.crossOrigin||""===a.options.crossOrigin)&&(b.crossOrigin=a.options.crossOrigin),b.onload=a.onSuccess,b.onerror=b.onabort=a.onError,b.src=c}function y(){return document.createElement("img")}function z(){return P?L?!0:(ba||C("error","Error: Raven has not been configured."),ba=!0,!1):!1}function A(a){for(var b,c=[],d=0,e=a.length;e>d;d++)b=a[d],i(b)?c.push(b.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")):b&&b.source&&c.push(b.source);return new RegExp(c.join("|"),"i")}function B(){var b=a.crypto||a.msCrypto;if(!g(b)&&b.getRandomValues){var c=new Uint16Array(8);b.getRandomValues(c),c[3]=4095&c[3]|16384,c[4]=16383&c[4]|32768;var d=function(a){for(var b=a.toString(16);b.length<4;)b="0"+b;return b};return d(c[0])+d(c[1])+d(c[2])+d(c[3])+d(c[4])+d(c[5])+d(c[6])+d(c[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})}function C(a){W[a]&&$.debug&&W[a].apply(V,H.call(arguments,1))}function D(){var b=a.RavenConfig;b&&$.config(b.dsn,b.config).install()}function E(a){var b=[];return n(a,function(a,c){b.push(encodeURIComponent(a)+"="+encodeURIComponent(c))}),b.join("&")}function F(a,b){g(b)?delete R[a]:R[a]=s(R[a]||{},b)}var G={remoteFetching:!1,collectWindowErrors:!0,linesOfContext:7,debug:!1},H=[].slice,I="?";G.wrap=function(a){function b(){try{return a.apply(this,arguments)}catch(b){throw G.report(b),b}}return b},G.report=function(){function d(a){i(),p.push(a)}function e(a){for(var b=p.length-1;b>=0;--b)p[b]===a&&p.splice(b,1)}function f(){j(),p=[]}function g(a,b){var c=null;if(!b||G.collectWindowErrors){for(var d in p)if(m(p,d))try{p[d].apply(null,[a].concat(H.call(arguments,2)))}catch(e){c=e}if(c)throw c}}function h(a,b,d,e,f){var h=null;if(s)G.computeStackTrace.augmentStackTraceWithInitialElement(s,b,d,a),k();else if(f)h=G.computeStackTrace(f),g(h,!0);else{var i={url:b,line:d,column:e};i.func=G.computeStackTrace.guessFunctionName(i.url,i.line),i.context=G.computeStackTrace.gatherContext(i.url,i.line),h={message:a,url:c(),stack:[i]},g(h,!0)}return n?n.apply(this,arguments):!1}function i(){o||(n=a.onerror,a.onerror=h,o=!0)}function j(){o&&(a.onerror=n,o=!1,n=b)}function k(){var a=s,b=q;q=null,s=null,r=null,g.apply(null,[a,!1].concat(b))}function l(b,c){var d=H.call(arguments,1);if(s){if(r===b)return;k()}var e=G.computeStackTrace(b);if(s=e,r=b,q=d,a.setTimeout(function(){r===b&&k()},e.incomplete?2e3:0),c!==!1)throw b}var n,o,p=[],q=null,r=null,s=null;return l.subscribe=d,l.unsubscribe=e,l.uninstall=f,l}(),G.computeStackTrace=function(){function b(b){if(!G.remoteFetching)return"";try{var c=function(){try{return new a.XMLHttpRequest}catch(b){return new a.ActiveXObject("Microsoft.XMLHTTP")}},d=c();return d.open("GET",b,!1),d.send(""),d.responseText}catch(e){return""}}function d(a){if(!i(a))return[];if(!m(u,a)){var c="",d="";try{d=document.domain}catch(e){}-1!==a.indexOf(d)&&(c=b(a)),u[a]=c?c.split("\n"):[]}return u[a]}function e(a,b){var c,e=/function ([^(]*)\(([^)]*)\)/,f=/['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,h="",i=10,j=d(a);if(!j.length)return I;for(var k=0;i>k;++k)if(h=j[b-k]+h,!g(h)){if(c=f.exec(h))return c[1];if(c=e.exec(h))return c[1]}return I}function f(a,b){var c=d(a);if(!c.length)return null;var e=[],f=Math.floor(G.linesOfContext/2),h=f+G.linesOfContext%2,i=Math.max(0,b-f-1),j=Math.min(c.length,b+h-1);b-=1;for(var k=i;j>k;++k)g(c[k])||e.push(c[k]);return e.length>0?e:null}function h(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g,"\\$&")}function j(a){return h(a).replace("<","(?:<|&lt;)").replace(">","(?:>|&gt;)").replace("&","(?:&|&amp;)").replace('"','(?:"|&quot;)').replace(/\s+/g,"\\s+")}function k(a,b){for(var c,e,f=0,g=b.length;g>f;++f)if((c=d(b[f])).length&&(c=c.join("\n"),e=a.exec(c)))return{url:b[f],line:c.substring(0,e.index).split("\n").length,column:e.index-c.lastIndexOf("\n",e.index)-1};return null}function l(a,b,c){var e,f=d(b),g=new RegExp("\\b"+h(a)+"\\b");return c-=1,f&&f.length>c&&(e=g.exec(f[c]))?e.index:null}function n(b){if("undefined"!=typeof document){for(var c,d,e,f,g=[a.location.href],i=document.getElementsByTagName("script"),l=""+b,m=/^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,n=/^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,o=0;o<i.length;++o){var p=i[o];p.src&&g.push(p.src)}if(e=m.exec(l)){var q=e[1]?"\\s+"+e[1]:"",r=e[2].split(",").join("\\s*,\\s*");c=h(e[3]).replace(/;$/,";?"),d=new RegExp("function"+q+"\\s*\\(\\s*"+r+"\\s*\\)\\s*{\\s*"+c+"\\s*}")}else d=new RegExp(h(l).replace(/\s+/g,"\\s+"));if(f=k(d,g))return f;if(e=n.exec(l)){var s=e[1];if(c=j(e[2]),d=new RegExp("on"+s+"=[\\'\"]\\s*"+c+"\\s*[\\'\"]","i"),f=k(d,g[0]))return f;if(d=new RegExp(c),f=k(d,g))return f}return null}}function o(a){if(!g(a.stack)&&a.stack){for(var b,d,h=/^\s*at (.*?) ?\(?((?:(?:file|https?|chrome-extension):.*?)|<anonymous>):(\d+)(?::(\d+))?\)?\s*$/i,i=/^\s*(.*?)(?:\((.*?)\))?@((?:file|https?|chrome).*?):(\d+)(?::(\d+))?\s*$/i,j=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:ms-appx|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,k=a.stack.split("\n"),m=[],n=/^(.*) is undefined$/.exec(a.message),o=0,p=k.length;p>o;++o){if(b=i.exec(k[o]))d={url:b[3],func:b[1]||I,args:b[2]?b[2].split(","):"",line:+b[4],column:b[5]?+b[5]:null};else if(b=h.exec(k[o]))d={url:b[2],func:b[1]||I,line:+b[3],column:b[4]?+b[4]:null};else{if(!(b=j.exec(k[o])))continue;d={url:b[2],func:b[1]||I,line:+b[3],column:b[4]?+b[4]:null}}!d.func&&d.line&&(d.func=e(d.url,d.line)),d.line&&(d.context=f(d.url,d.line)),m.push(d)}return m.length?(m[0].line&&!m[0].column&&n?m[0].column=l(n[1],m[0].url,m[0].line):m[0].column||g(a.columnNumber)||(m[0].column=a.columnNumber+1),{name:a.name,message:a.message,url:c(),stack:m}):null}}function p(a){var b=a.stacktrace;if(!g(a.stacktrace)&&a.stacktrace){for(var d,h=/ line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i,i=b.split("\n"),j=[],k=0,l=i.length;l>k;k+=2)if(d=h.exec(i[k])){var m={line:+d[1],column:+d[2],func:d[3]||d[4],args:d[5]?d[5].split(","):[],url:d[6]};if(!m.func&&m.line&&(m.func=e(m.url,m.line)),m.line)try{m.context=f(m.url,m.line)}catch(n){}m.context||(m.context=[i[k+1]]),j.push(m)}return j.length?{name:a.name,message:a.message,url:c(),stack:j}:null}}function q(b){var g=b.message.split("\n");if(g.length<4)return null;var h,i,l,n,o=/^\s*Line (\d+) of linked script ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,p=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,q=/^\s*Line (\d+) of function script\s*$/i,r=[],s=document.getElementsByTagName("script"),t=[];for(i in s)m(s,i)&&!s[i].src&&t.push(s[i]);for(i=2,l=g.length;l>i;i+=2){var u=null;if(h=o.exec(g[i]))u={url:h[2],func:h[3],line:+h[1]};else if(h=p.exec(g[i])){u={url:h[3],func:h[4]};var v=+h[1],w=t[h[2]-1];if(w&&(n=d(u.url))){n=n.join("\n");var x=n.indexOf(w.innerText);x>=0&&(u.line=v+n.substring(0,x).split("\n").length)}}else if(h=q.exec(g[i])){var y=a.location.href.replace(/#.*$/,""),z=h[1],A=new RegExp(j(g[i+1]));n=k(A,[y]),u={url:y,line:n?n.line:z,func:""}}if(u){u.func||(u.func=e(u.url,u.line));var B=f(u.url,u.line),C=B?B[Math.floor(B.length/2)]:null;B&&C.replace(/^\s*/,"")===g[i+1].replace(/^\s*/,"")?u.context=B:u.context=[g[i+1]],r.push(u)}}return r.length?{name:b.name,message:g[0],url:c(),stack:r}:null}function r(a,b,c,d){var g={url:b,line:c};if(g.url&&g.line){a.incomplete=!1,g.func||(g.func=e(g.url,g.line)),g.context||(g.context=f(g.url,g.line));var h=/ '([^']+)' /.exec(d);if(h&&(g.column=l(h[1],g.url,g.line)),a.stack.length>0&&a.stack[0].url===g.url){if(a.stack[0].line===g.line)return!1;if(!a.stack[0].line&&a.stack[0].func===g.func)return a.stack[0].line=g.line,a.stack[0].context=g.context,!1}return a.stack.unshift(g),a.partial=!0,!0}return a.incomplete=!0,!1}function s(a,b){for(var d,f,g,h=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,i=[],j={},k=!1,m=s.caller;m&&!k;m=m.caller)if(m!==t&&m!==G.report){if(f={url:null,func:I,line:null,column:null},m.name?f.func=m.name:(d=h.exec(m.toString()))&&(f.func=d[1]),"undefined"==typeof f.func)try{f.func=d.input.substring(0,d.input.indexOf("{"))}catch(o){}if(g=n(m)){f.url=g.url,f.line=g.line,f.func===I&&(f.func=e(f.url,f.line));var p=/ '([^']+)' /.exec(a.message||a.description);p&&(f.column=l(p[1],g.url,g.line))}j[""+m]?k=!0:j[""+m]=!0,i.push(f)}b&&i.splice(0,b);var q={name:a.name,message:a.message,url:c(),stack:i};return r(q,a.sourceURL||a.fileName,a.line||a.lineNumber,a.message||a.description),q}function t(a,b){var d=null;b=null==b?0:+b;try{if(d=p(a))return d}catch(e){if(G.debug)throw e}try{if(d=o(a))return d}catch(e){if(G.debug)throw e}try{if(d=q(a))return d}catch(e){if(G.debug)throw e}try{if(d=s(a,b+1))return d}catch(e){if(G.debug)throw e}return{name:a.name,message:a.message,url:c()}}var u={};return t.augmentStackTraceWithInitialElement=r,t.computeStackTraceFromStackProp=o,t.guessFunctionName=e,t.gatherContext=f,t}();var J,K,L,M,N,O=a.Raven,P=!("object"!=typeof JSON||!JSON.stringify),Q="undefined"!=typeof document,R={},S={logger:"javascript",ignoreErrors:[],ignoreUrls:[],whitelistUrls:[],includePaths:[],crossOrigin:"anonymous",collectWindowErrors:!0,maxMessageLength:100},T=!1,U=Object.prototype,V=a.console||{},W={},X=[],Y=u();for(var Z in V)W[Z]=V[Z];var $={VERSION:"1.2.0",debug:!0,noConflict:function(){return a.Raven=O,$},config:function(a,b){if(L)return C("error","Error: Raven has already been configured"),$;if(!a)return $;var c=f(a),d=c.path.lastIndexOf("/"),e=c.path.substr(1,d);return b&&n(b,function(a,b){"tags"==a||"extra"==a?R[a]=b:S[a]=b}),S.ignoreErrors.push(/^Script error\.?$/),S.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),S.ignoreErrors=A(S.ignoreErrors),S.ignoreUrls=S.ignoreUrls.length?A(S.ignoreUrls):!1,S.whitelistUrls=S.whitelistUrls.length?A(S.whitelistUrls):!1,S.includePaths=A(S.includePaths),M=c.user,N=c.path.substr(d+1),L="//"+c.host+(c.port?":"+c.port:"")+"/"+e+"api/"+N+"/store/",c.protocol&&(L=c.protocol+":"+L),S.fetchContext&&(G.remoteFetching=!0),S.linesOfContext&&(G.linesOfContext=S.linesOfContext),G.collectWindowErrors=!!S.collectWindowErrors,$},install:function(){return z()&&!T&&(G.report.subscribe(o),n(X,function(a,b){b()}),T=!0),$},context:function(a,c,d){return h(a)&&(d=c||[],c=a,a=b),$.wrap(a,c).apply(this,d)},wrap:function(a,c){function d(){for(var b=[],d=arguments.length,e=!a||a&&a.deep!==!1;d--;)b[d]=e?$.wrap(a,arguments[d]):arguments[d];try{return c.apply(this,b)}catch(f){throw $.captureException(f,a),f}}if(g(c)&&!h(a))return a;if(h(a)&&(c=a,a=b),!h(c))return c;if(c.__raven__)return c;for(var e in c)m(c,e)&&(d[e]=c[e]);return d.__raven__=!0,d.__inner__=c,d},uninstall:function(){return G.report.uninstall(),T=!1,$},captureException:function(a,b){if(!l(a))return $.captureMessage(a,b);J=a;try{var c=G.computeStackTrace(a);o(c,b)}catch(d){if(a!==d)throw d}return $},captureMessage:function(a,b){return S.ignoreErrors.test&&S.ignoreErrors.test(a)?void 0:(w(s({message:a+""},b)),$)},addPlugin:function(a){return X.push(a),T&&a(),$},setUserContext:function(a){return R.user=a,$},setExtraContext:function(a){return F("extra",a),$},setTagsContext:function(a){return F("tags",a),$},clearContext:function(){return R={},$},getContext:function(){return JSON.parse(JSON.stringify(R))},setRelease:function(a){return S.release=a,$},setDataCallback:function(a){return S.dataCallback=a,$},setShouldSendCallback:function(a){return S.shouldSendCallback=a,$},setTransport:function(a){return S.transport=a,$},lastException:function(){return J},lastEventId:function(){return K},isSetup:function(){return z()}};$.setUser=$.setUserContext,$.setReleaseContext=$.setRelease;var _="source protocol user pass host port path".split(" "),aa=/^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;e.prototype=new Error,e.prototype.constructor=e;var ba;D(),a.Raven=$,"function"==typeof define&&define.amd?define("raven",[],function(){return $}):"object"==typeof module?module.exports=$:"object"==typeof exports&&(exports=$)}("undefined"!=typeof window?window:this);var __bind=function(fn,me){return function(){return fn.apply(me,arguments);};};$(document).on('ajaxError',function(e,xhr,settings){if(xhr.readyState>0&&xhr.status>0){Raven.captureMessage('AjaxError: Could not fetch '+settings.url+': '+xhr.statusText);}});window.addEventListener('pagehide',function(e){var $body=$(document.body);$body.children().remove();setTimeout(function(){$body.append("<script type='text/javascript'>window.location.reload();<\/script>");});});$(document).on('click','[data-fake-link]',function(e){e.preventDefault();e.stopPropagation();var href=$(e.currentTarget).attr('data-href');window.location=href;});var PageController=(function(){function PageController(){this.configure=__bind(this.configure,this);this.configureCsrf=__bind(this.configureCsrf,this);this.configureDatePickers=__bind(this.configureDatePickers,this);this.autodisableButton=__bind(this.autodisableButton,this);this.autodisableForm=__bind(this.autodisableForm,this);this.getCsrfToken=__bind(this.getCsrfToken,this);this.hijackMethodPostLinks=__bind(this.hijackMethodPostLinks,this);this.configure();this.isTouch=false;this.enableRaven=true;}
PageController.prototype.configure=function(){var _this=this;_this.configureCsrf();$(document).on('click','[data-method=post]',_this.hijackMethodPostLinks);$(document).on('submit','form[data-autodisable]',_this.autodisableForm);$('body').on('click','.btn-autodisable',_this.autodisableButton);$(document).tooltip({selector:'[data-toggle="tooltip"]'});_this.configureDatePickers();_this.isTouch=(('ontouchstart'in window)||window.DocumentTouch&&document instanceof DocumentTouch);Raven.config('//ab8e400093974290a92bde64b4bf5c5b@sentry.funkbit.no/20',{shouldSendCallback:function(data){return _this.enableRaven;}}).install();};PageController.prototype.configureCsrf=function(){var _this=this;function csrfSafeMethod(method){return(/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));}
$(document).ajaxSend(function(event,xhr,settings){if(!csrfSafeMethod(settings.type)&&!this.crossDomain){xhr.setRequestHeader("X-CSRFToken",_this.getCsrfToken());}});};PageController.prototype.hijackMethodPostLinks=function(e){e.preventDefault();var $link=$(e.currentTarget),href=$link.attr('href'),target=$link.attr('target'),metaClick=e.metaKey||e.ctrlKey,$form=$('<form method="post" action="'+href+'"></form>'),csrfTokenInput='<input name="csrfmiddlewaretoken" value="'+this.getCsrfToken()+'" type="hidden" />';if($link.hasClass('autodisabled')){return false;}
$link.addClass('autodisabled');if(target){$form.attr('target',target);}
else if(metaClick){$form.attr('target','_blank');}
$form.hide().append(csrfTokenInput).appendTo('body');$form.submit();};PageController.prototype.configureDatePickers=function(){if(typeof $().datepicker!=='undefined'){$('.datepicker').datepicker({weekStart:1,language:'no',format:'yyyy-mm-dd',autoclose:true,todayHighlight:true});}};PageController.prototype.autodisableForm=function(e){var $form=$(e.currentTarget);if($form.hasClass('autodisabled')){e.preventDefault();return;}
$form.addClass('autodisabled');$form.find(':input').addClass('autodisabled');};PageController.prototype.autodisableButton=function(e){var button=$(e.currentTarget);if(button.hasClass('autodisabled')){e.preventDefault();return false;}
$(e.currentTarget).addClass('autodisabled');$(e.currentTarget).addClass('disabled');};PageController.prototype.getCsrfToken=function(){return $.cookie('csrftoken');};return PageController;})();function parseAmount(str){if(typeof str==='undefined')
return parseFloat('0');return parseFloat(str.replace(',','.'));}
function amountString(amount,num_decimals){if(typeof num_decimals==='undefined')
num_decimals=2;if(isNaN(amount))
return'';if(num_decimals==='auto'){amount=Math.round(amount*100)/100;return amount.toString().replace('.',',');}
else{return amount.toFixed(num_decimals).replace('.',',');}}
function priceMarkup(amount){var priceParts=amountString(amount).split(',');return priceParts[0]+'<span class="decimals">'+priceParts[1]+'</span>';}
function leadingZero(num){if(num<10){res="0"+num;}else{res=""+num;}
return res;}
function dateFormat(date){return date.getFullYear()+'-'+leadingZero(date.getMonth()+1)+'-'+leadingZero(date.getDate());}
function timeFormat(date){return leadingZero(date.getHours())+':'+leadingZero(date.getMinutes())+':'+leadingZero(date.getSeconds());}
function shortTimeFormat(date){return leadingZero(date.getHours())+':'+leadingZero(date.getMinutes());}
function dateTimeFormat(date){return dateFormat(date)+' '+timeFormat(date);}