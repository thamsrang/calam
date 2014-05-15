;(function($) {
    "use strict";
    var methods = {
        init: function(options) {
            // Replacing dynamic fragment by regex
            if(options.regex){
                options.hash=options.hash.replace(/%s/g, "([^&]+)");
            }
            var settings = $.extend({
                "hash"     : "",
                "regex"    : false,
                "onSet"    : function(){},
                "onRemove" : function(){}
            }, options);

            if (!settings.hash) {
                return this;
            }
            // bind to hashchange at first time and init global variables
            if (!$.hashchange) {
                $.hashchange = {};
                $.hashchange.regexhash = [];
                $.hashchange.onSet = {};
                $.hashchange.onRemove = {};
                $.hashchange.prevHash = "";

                $.hashchange.listener = function() {
                    // if hash didn't change - do nothing
                    if (window.location.hash === $.hashchange.prevHash) {
                        return;
                    }

                    var onRemove = $.hashchange.onRemove[$.hashchange.prevHash],
                        onSet = $.hashchange.onSet[window.location.hash];
                    if (onRemove) {
                        onRemove();
                    }else{
                        var rmMatcher=methods.regexmatcher($.hashchange.prevHash);
                        if(rmMatcher.matched){
                            onRemove=$.hashchange.onRemove[rmMatcher.regex];
                            onRemove(rmMatcher.values);
                        }
                    }

                    if (onSet) {
                        onSet();
                    }else{
                        var setMatcher=methods.regexmatcher(window.location.hash);
                        if(setMatcher.matched){
                            onSet=$.hashchange.onSet[setMatcher.regex];
                            onSet(setMatcher.values);
                        }
                    }
                    $.hashchange.prevHash = window.location.hash;
                };

                this.bind("hashchange", $.hashchange.listener);
            }
            $.hashchange.onSet[settings.hash] = settings.onSet;
            $.hashchange.onRemove[settings.hash] = settings.onRemove;
            if(settings.regex){
                $.hashchange.regexhash.push(settings.hash);
            }
            return this;
        },
        regexmatcher:function(hash){
            var regArr=$.hashchange.regexhash;
            var values=[];
            var rgx="";
            var matched=false;
            for (var i = 0, len = regArr.length; i < len; i++) {
                var rgxEx=new RegExp(regArr[i]);
                if(rgxEx.test(hash)){
                    rgx = regArr[i];
                    values = hash.match(rgxEx);
                    values=values.slice(1, values.length);
                    matched=true;
                    break;
                }
            }
            return {regex:rgx, values:values, matched:matched};
        }
    };
    $.fn.hashchange = function(options) {

        // options array passed
        if (Object.prototype.toString.call(options) === "[object Array]") {
            for (var i = options.length - 1; i >= 0; i--) {
                methods.init.apply(this, [options[i]]);
            }
            if($.hashchange){
                $.hashchange.listener();
            }
            return this;
        }
        // single option passed
        return methods.init.apply(this, arguments);
    };
}(window.jQuery));