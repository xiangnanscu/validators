var FORM_ERROR_CLASS = "errorlist";
var FORM_HINT_CLASS = "hintlist";
var TIP_OFFSET_LEFT = 10;
var TIP_OFFSET_TOP = 0;

var form_fields = {
    username :{
        hint:'请填写2到10个字', 
        validators:[
            require(), // 这个字段不允许为空
            min_len(2), // 最小长度2
            max_len(10)// 最大长度10
        ]
    }, 
    password:{
        hint:'请填写6到32位密码, 只能由数字, 英文字母或半角符号@$_!-组成', 
        validators:[
            require(), 
            regex(/^[\da-zA-Z@$_!-]{6,32}$/)
        ]
    },
}

function require(message){
    return function(value, name){
        name = name || '';
        message = message || '您还没填写{name}';
        if (value===''){
            return message.replace('{name}',name);
        }
    }
}
function regex(limit, message){
    return function(value, name){
        name = name || '';
        message = message || '{name}格式不正确';
        if (!value.match(limit)){
            return message.replace('{name}',name);
        }
    }
}
function min_len(limit, message){
    return function(value, name){
        name = name || '';
        message = message || '{name}不能少于{limit}个字, 您输入了{value}个';
        value = value.length;
        if (value < limit){
            return message.replace('{limit}',limit).replace('{value}',value).replace('{name}',name);
        }
    }
}
function max_len(limit, message){
    return function(value, name){
        name = name || '';
        message = message || '{name}不能多于{limit}个字, 您输入了{value}个';
        value = value.length;
        if (value > limit){
            return message.replace('{limit}',limit).replace('{value}',value).replace('{name}',name);
        }
    }
}
function min_val(limit, message){
    return function(value, name){
        name = name || '';
        message = message || '{name}值太小, 至少{limit}';
        if (value < limit){
            return message.replace('{limit}',limit).replace('{value}',value).replace('{name}',name);
        }
    }
}
function max_val(limit, message){
    return function(value, name){
        name = name || '';
        message = message || '{name}值太大, 最多{limit}';
        if (value > limit){
            return message.replace('{limit}',limit).replace('{value}',value).replace('{name}',name);
        }
    }
}

function add_validators(validators){
    return function(){
            var self = $(this);
            var value = self.val(); // input value
            var name  = $('label[for="'+self.attr('id')+'"').html() || '';
            var li_string = '';
            for (var i = 0; i < validators.length; i++){
                var error_message = validators[i](value, name);
                if (error_message){
                    li_string += '<li>'+error_message+'</li>';
                    break;
                }
            }
            self.next('.'+FORM_ERROR_CLASS+', .'+FORM_HINT_CLASS).remove(); // remove existing error or hint
            if (li_string.length != 0){
                var ul = $('<ul class="'+FORM_ERROR_CLASS+'">'+li_string+'</ul>');
                ul.insertAfter(self);
                ul.css({
                    top  : self.offset().top + TIP_OFFSET_TOP,
                    left : self.offset().left + self.outerWidth() + TIP_OFFSET_LEFT, 
                    display:'block', 
                    position:'absolute', 
                });
            }
        }
}
function add_hints(hint_message){
    return function(){
            var self  = $(this);
            if (self.next().length===0){
                var ul = $('<ul class="'+FORM_HINT_CLASS+'"><li>'+hint_message+'</li></ul>');
                ul.insertAfter(self);
                ul.css({
                    top :self.offset().top + TIP_OFFSET_TOP,
                    left:self.offset().left + self.outerWidth() + TIP_OFFSET_LEFT, 
                    display:'block', 
                    position:'absolute', 
                });
            }
        }
}

$(document).ready(function() {
    $.each(form_fields, function(key, value){
        if (value.validators){
            $('*[name='+key+']').blur(add_validators(value.validators));
        }
        if (value.hint){
            $('*[name='+key+']').focus(add_hints(value.hint));
        }
    })
})
