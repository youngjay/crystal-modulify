var buildTagReg = function(tag) {
    return new RegExp('<' + tag + '(?:[^>]*)>([\\s\\S]*?)<\\/' + tag + '>', 'ig');
};

var REG_SCRIPT_TAG = buildTagReg('script');
var REG_STYLE_TAG = buildTagReg('style');

module.exports = function(html, type) {
    var src = '';

    // extract script
    var scriptTexts = [];
    html = html.replace(REG_SCRIPT_TAG, function(a, b) {
        scriptTexts.push(b.trim());
        return '';
    });

    if (scriptTexts) {
        // strip indent
        src += scriptTexts.join('\n');
    }

    // extract style
    var cssTexts = [];
    html = html.replace(REG_STYLE_TAG, function(a, b) {
        cssTexts.push(b.trim());
        return '';
    });

    // extract html
    html = html.trim().replace(/(>)\s+(<)/g, '$1$2');

    if (html) {
        src = 'var __html=' + JSON.stringify(html) + ';\n' + src;
    }

    if (cssTexts.length) {
        src = 'var __css=' + JSON.stringify(cssTexts.join('\n')) + ';\n' + src;
    }

    return src;
}