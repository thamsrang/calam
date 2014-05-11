JQuery Hashchange
=================

Plugin for dynamic fragment values.

*Call the function `onSet()` and `onRemove()` when the matched hash values sets and removes.

'

 $(window).hashchange([
                {
                    hash: "#company/%s",
                    regex: true,
                    onSet: function(arr) {
                        var compId=arr[0];                      
                        $("#compDetail").show();
                    },
                    onRemove:function(arr){
                        var compId=arr[0];
                        $("#compDetail").hide();
                    }
                },
                {
                    hash: "#company/%s/emp/%s"
                    regex: true,
                    onSet: function(arr) {
                        var compId=arr[0]; 
                        var employeeId=arr[1];
                        $("#compDetail").show();
                    },
                    onRemove:function(arr){
                        var compId=arr[0]; 
                        var employeeId=arr[1];
                        $("#compDetail").hide();
                    }
                }
]);

'


For more details [http://thamsrang.github.io/jquery-hashchange] (http://thamsrang.github.io/jquery-hashchange).
or download and see `index.html` for complete guide.

