var buildTagReg = function(tag) {
    return new RegExp('<' + tag + '(?:[^>]*)>([\\s\\S]*?)<\\/' + tag + '>', 'ig');
};

var REG_SCRIPT_TAG = buildTagReg('script');
var REG_STYLE_TAG = buildTagReg('style');

module.exports = function(html, type) {
    var src = '';

    // extract script
    var scriptText = '';
    html = html.replace(REG_SCRIPT_TAG, function(a, b) {
        scriptText += '\n' + b.trim();
        return '';
    });

    if (scriptText) {
        // strip indent
        src += scriptText.replace(/\n    /g, '\n');
    }

    // extract style
    // var cssText = '';
    // html = html.replace(REG_STYLE_TAG, function(a, b) {
    //     cssText += '\n' + b.trim();
    //     return '';
    // });

    // if (cssText) {
    //     src += '\nexports.style = ' + JSON.stringify(cssText);
    // }

    // extract html
    html = html.trim().replace(/(>)\s+(<)/g, '$1$2');

    src += ';if (!Array.isArray(module.exports)) { module.exports = [module.exports] }';

    if (html) {
        src += 'module.exports.push({__view:' + JSON.stringify('<!-- ' + type + ' Begin -->' + html + '<!-- ' + type + ' End -->') + '});';
    }

    return src;
}