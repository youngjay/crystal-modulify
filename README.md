componentify
============

transform html to a js object

``` html
<div data-bind="text: text"></div>
<script>
    module.exports = {
        text: ''
    }
</script>
```

become

```javascript
module.exports = {
    text: ''
};if (!Array.isArray(module.exports)) { module.exports = [module.exports] }module.exports.push({__view:"<!-- component/control/text.html Begin --><div data-bind=\"text: text\"></div><!-- component/control/text.html End -->"});

```
