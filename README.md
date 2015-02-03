# crystal-modulify


transform html to a js object

``` html
<div data-bind="text: text"></div>
<script>
    module.exports = {
        text: ''
    }
</script>
```

变成

```javascript
var __css="";
var __html="<div data-bind="text: text"></div>";
```
