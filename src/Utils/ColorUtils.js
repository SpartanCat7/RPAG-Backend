
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hexToRgbStr(hex) {
    let colorRgbObj = hex ? hexToRgb(hex) : null;
    let colorStr = colorRgbObj ? `rgba(${colorRgbObj.r}, ${colorRgbObj.g}, ${colorRgbObj.b}, 1.0)` : null;
    return colorStr;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export {
    hexToRgb,
    hexToRgbStr
}