var SUCCESS_COLOR = "#CCFFCC";
var ERROR_COLOR = "#FDE0E0"; //#c04848 stackoverflow error color
var FORM_ERROR_CLASS = "errorlist";
var FORM_HINT_CLASS = "hintlist";
var TIP_OFFSET_LEFT = 10;
var PASS_THIS = {};

var form_fields = {
    sfzh :{
        hint:'请填写18位身份证号(只能由数字和字母X组成)', 
        validators:[required, regex(/^\d{17}[\dXx]$/)]
    }, 
    email :{
        hint:'请填写常用邮箱, 用于找回密码', 
        validators:[not_required]
    }, 
    password:{
        hint:'请填写6到32位密码, 只能由数字, 英文字母或半角符号@$_!-组成', 
        validators:[required, regex(/^[\da-zA-Z@$_!-]{6,32}$/)]
    },
}

function required(value, name){
    if (value===''){
        return '您还没填写{name}'.replace('{name}',name);
    }
}
function not_required(value, name){
    if (value===''){
        return PASS_THIS;
    }
}
function regex(limit, message){
    return function(value, name){
        message = message || '{name}格式不正确';
        if (!value.match(limit)){
            return message.replace('{name}',name);
        }
    }
}
function min_len(limit, message){
    return function(value, name){
        message = message || '至少{limit}个字, 您输入了{value}个';
        value = value.length;
        if (value < limit){
            return message.replace('{limit}',limit).replace('{value}',value).replace('{name}',name);
        }
    }
}
function max_len(limit, message){
    return function(value, name){
        message = message || '最多{limit}个字, 您输入了{value}个';
        value = value.length;
        if (value > limit){
            return message.replace('{limit}',limit).replace('{value}',value).replace('{name}',name);
        }
    }
}
function min_val(limit, message){
    return function(value, name){
        message = message || '太小, 至少{limit}';
        if (value < limit){
            return message.replace('{limit}',limit).replace('{value}',value).replace('{name}',name);
        }
    }
}
function max_val(limit, message){
    return function(value, name){
        message = message || '太大, 最多{limit}';
        if (value > limit){
            return message.replace('{limit}',limit).replace('{value}',value).replace('{name}',name);
        }
    }
}
function clear_hint(){
    $(this).nextAll('.'+FORM_HINT_CLASS).remove();
}
function make_errorlist(messages, class_name) {
    class_name = class_name || FORM_ERROR_CLASS
    var estr = '';
    $.each(messages, function(i, message) {
        estr += '<li><pre>' + message + '</pre></li>'
    });
    return $('<ul class="'+class_name+'">' + estr + '</ul>');
}
function make_tip(widget, tip){
    tip.insertAfter(widget);
    tip.css({
        top :widget.offset().top,
        left:widget.offset().left + widget.outerWidth() + TIP_OFFSET_LEFT, 
        position:'absolute', 
        display:'block', 
        'min-height': widget.outerHeight()+'px'
    });    
}

function add_validators(validators, show_name){
    return function(){
        var self = $(this);
        var messages = [];
        for (var i = 0; i < validators.length; i++){
            var error_message = validators[i].call(this, self.val(), show_name);
            if (error_message===undefined){
                continue;
            }else if ($.type(error_message)==='string'){
                messages.push(error_message);
                break;
            }else if (error_message===PASS_THIS){
                break;
            }
        }
        self.nextAll('.'+FORM_ERROR_CLASS).remove(); 
        if (messages.length !== 0){
            make_tip(self, make_errorlist(messages));
        }
    }
}
function add_hint(message){
    return function(){
        var self  = $(this);
        if (self.nextAll().length===0){
            make_tip(self, make_errorlist([message], FORM_HINT_CLASS));
        }
    }
}

$(document).ready(function() {
    
    $('input, textarea').each(function(i, input){
        input = $(input);
        var name = input.attr('name');
        if (!name){
            return;
        }
        var field = form_fields[name];
        if (field){
            if (field.validators){
                var show_name = form_fields[name].label || $('label[for="'+input.attr('id')+'"]').html() || '';
                input.blur(add_validators(field.validators, show_name));
            }
            if (field.hint){
                input.focus(add_hint(field.hint));
                input.blur(clear_hint);
            }
        }
    });

})
