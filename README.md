# validators
A very simple yet configurable error/hint message system for form validation.

# requirements:
1.jquery 1.7 (or maybe smaller, you could try)<br/>

# usage:
1.you must set your form input widget with a unique 'name' attribute, say 'username'.<br/>
2.config it in form_fields like this(hint or validators are optional):
<pre>var form_fields = {
  username :{
    hint:'enter your username(2 chars at least, 10 at most)', 
    validators:[require(), min_len(2), max_len(10)]
  }, 
  password :{
    validators:[require(), regex(/^[\da-zA-Z@$_!-]{6,32}$/)]
  }, 
}</pre>
3.enjoy it.
