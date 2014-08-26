var buildTagReg = function(tag) {
    return new RegExp('<' + tag + '(?:[^>]*)>([\\s\\S]*?)<\\/' + tag + '>', 'ig');
};

var REG_SCRIPT_TAG = buildTagReg('script');
var REG_STYLE_TAG = buildTagReg('style');

module.exports = function(html, options) {
    if (!options) {
        options = {};
    }

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
    html = html.trim();

    if (options.stripWhitespace) {
        html = html.replace(/(>)\s+(<)/g, '$1$2');
    }    

    src = 'var __html=' + JSON.stringify(html) + ';\n' + src;
    src = 'var __css=' + JSON.stringify(cssTexts.join('\n')) + ';\n' + src;

    return src;
}