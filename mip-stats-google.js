/**
 * @file 谷歌统计插件
 *
 * @author houjinlong
 * From: mip-stats-google
 */
define(function (require) {
	var $ = require('zepto');
    var viewer = require('viewer');
    
    var customElement = require('customElement').create();
   
    customElement.prototype.createdCallback = function () {
    	
       var elem = this.element;
       var token = elem.getAttribute('token');
       var setConfig = elem.getAttribute('setconfig');
       var pageClass = elem.getAttribute('pageclass');    
       /**
         * 检测token是否存在
         */
        if (token) {
        	window._gaq = window._gaq || [];
        	
        	_gaq.push([
                '_setAccount',
                token
            ]);     
            
            // 检测setconfig是否存在
            if (setConfig) {         
                var setCustom = buildArry(decodeURIComponent(setConfig));
                setCustom.forEach(function  (val) {
                	_gaq.push(val);
                })             
            }
                        
	 		_gaq.push(['_trackPageview']); 
	 		
        	var ga = document.createElement('script');
            ga.type = 'text/javascript';
    		ga.async = true;
    		ga.src = ('https:' == document.location.protocol ? 'https://ssl': 'http://www') + '.google-analytics.com/ga.js';
            $(elem).append(ga);
            
            ga.onload = function () {
           	 bindEle();
        	};
                     
        }
    };
    
   	 // 绑定事件追踪
    function bindEle() {

        // 获取所有需要触发的dom
        var tagBox = document.querySelectorAll('*[data-stats-google-obj]');

        for (var index = 0; index < tagBox.length; index++) {
            var statusData = tagBox[index].getAttribute('data-stats-google-obj');

            /**
             * 检测statusData是否存在
             */
            if (!statusData) {
                return;
            }

            try {
                statusData = JSON.parse(decodeURIComponent(statusData));
            }
            catch (e) {
//              '事件追踪data-stats-google-obj数据不正确';
                return;
            }

            var eventtype = statusData.type;

            /**
             * 检测传递数据是否存在
             */
            if (!statusData.data) {
                return;
            }

            var data = buildArry(statusData.data);

            if (eventtype !== 'click' && eventtype !== 'mouseup' && eventtype !== 'load') {
                // 事件限制到click,mouseup,load(直接触发)
                return;
            }

            if ($(tagBox[index]).hasClass('mip-stats-eventload')) {
                return;
            }

            $(tagBox[index]).addClass('mip-stats-eventload');

            if (eventtype === 'load') {
                _gaq.push(data);
            }
            else {
                tagBox[index].addEventListener(eventtype, function(event) {
                    var tempData = this.getAttribute('data-stats-google-obj');
                    if (!tempData) {
                        return;
                    }
                    var statusJson;
                    try {
                        statusJson = JSON.parse(decodeURIComponent(tempData));
                    }
                    catch (e) {
//                      '事件追踪data-stats-google-obj数据不正确';
                        return;
                    }
                    if (!statusJson.data) {
                        return;
                    }
                    var attrData = buildArry(statusJson.data);
                    _gaq.push(attrData);
                }, false);
            }
        }
    }

    // 数据换转
    function buildArry(arrayStr) {
        if (!arrayStr) {
            return;
        }
    	var strArr = arrayStr.slice(0, arrayStr.length).split('+');
    	strArr.forEach(function  (val,index) {
    		
    		var arr = val.slice(1, val.length-1).split(',');
    		var newArray = [];
    		
    		arr.forEach(function  (val,index) {      		
    			var item = val.replace(/(^\s*)|(\s*$)/g, '').replace(/\'/g, '');
    			if (index === 1 || index === 4) {
	                item = Number(item);
	            }
    			newArray.push(item);
    		})
    		strArr[index] = newArray;
    	})      	  

        return strArr;
    }

    return customElement;
});