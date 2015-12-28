# validators
A very simple configurable error/hint message system for form

requirements:
1.jquery 1.7 (or maybe smaller, you could try)

usage:
1.you must set your form input widget with a unique 'name' attribute, say 'username'.
2.config it in form_fields like this(hint or validators are optional):
  var form_fields = {
    username :{
      hint:'enter your username(2 chars at least, 10 at most)', 
      validators:[require(), min_len(2), max_len(10)]
    }, 
  }
3.enjoy it.
