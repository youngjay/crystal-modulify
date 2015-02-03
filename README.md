# crystal-modulify


transform html to a js object

``` html
<div data-bind="text: text"></div>
<script>
    var a = 1
</script>
```

变成

```javascript
var __css="";
var __html="<div data-bind="text: text"></div>";
var a = 1;
```
