# validators
A very simple yet configurable error/hint message system for form validation.position:absolute so it doesn't affect your html layout.<br/>
![image](http://img2.ph.126.net/i04limKLx8cOLWA8SMimeg==/6631265677794987944.png)<br/>
Curently support validations(for `input` and `textarea`):<br/>
<table>
  <tr>
    <th>Validator</th>
    <th>Effect</th>
  </tr>
  <tr>
    <td>required</td>
    <td>this input can't be ignored</td>
  </tr>
  <tr>
    <td>not_required</td>
    <td>this input can be ignored</td>
  </tr>
  <tr>
    <td>min_len(x)</td>
    <td>the length of input value can't be less than x </td>
  </tr>
  <tr>
    <td>max_len(x)</td>
    <td>the length of input value can't be more than x </td>
  </tr>
  <tr>
    <td>min_val(x)</td>
    <td>the input number can't be less than x </td>
  </tr>
  <tr>
    <td>max_val(x)</td>
    <td>the input number can't be more than x </td>
  </tr>
  <tr>
    <td>regex(REGEX_EXPRESSION)</td>
    <td>the input value must match REGEX_EXPRESSION </td>
  </tr>      
</table>

# requirements:
1.jquery 1.7 (or maybe smaller, you could try)<br/>

# usage:
Is there anything better than an real example? No, so let's start here:<br/>
```
<form enctype="multipart/form-data" method="post">
  <table>
    <tr>
      <td><label for="id_username">账号</label></td>
      <td><input id="id_username" name="username" type="text" /> </td>
    </tr>
    <tr>
      <td><label for="id_password">密码</label></td>
      <td><input id="id_password" name="password" type="password" /> </td>
    </tr>
  </table>
  <input type="submit" value="提交"/>
</form> 
```
1.add jquery, `validators.css` and `validators.js` to your html page (like `home.html`).<br />

2.config `form_fields` object in `validators.js` like this(hint or validators are optional):
```
var form_fields = {
  username :{
    hint       : 'enter your username(2 chars at least, 10 at most)', 
    validators : [required, min_len(2), max_len(10)]
  }, 
  password :{
    validators : [required, regex(/^[\da-zA-Z@$_!-]{6,32}$/)]
  }, 
}
```
Above code means that :<br />
 1)username and password are required. <br />
 2)When you in username, a green hint message `enter your username(2 chars at least, 10 at most)` will show.<br />
 3)There must be 2 characters at least and 10 at most in username. <br />

What if a input is not required, but you still want some validations when user offer value? you need to add `not_required`.like:
<pre>validators : [not_required,  min_len(2), max_len(10)]</pre>
3.enjoy it.
