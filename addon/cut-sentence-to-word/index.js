
//

(function (mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("../../lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["../../lib/codemirror"], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function (CodeMirror) {
    // 先判断是否支持
    var supported = (function () {
        try {
            if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
                var module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
                if (module instanceof WebAssembly.Module) {
                    return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
                }
            }
        } catch (e) {
            console.error(e)
        }
        return false;
    })();
    console.log(supported ? "WebAssembly is supported" : "WebAssembly is not supported");

    var isJiebaReady = false;

    function setupJieba() {
        var path = '../addon/cut-sentence-to-word/wasm-cppjieba/index.js';
        createJieba(path, (dictsStatus) => {
            console.log('jieba 词典状态: ', dictsStatus);

            initJieba(() => {
                console.log('jieba 实例化完成！');
                isJiebaReady = true;
            });

        }, (reportMessage) => {
            console.log('耗时->', reportMessage);
        });
    }

    // 是否启用jieba分词
    CodeMirror.defineOption("useJieba", false, function(cm, val) {
        if (val && !isJiebaReady && supported) {
            setupJieba(); // setup jieba
        } else if (!val) { // disable jieba
            isJiebaReady = false;
        }
    });
    // 检查jieba是否ready
    CodeMirror.defineExtension("checkJiebaReady", function() {
        return isJiebaReady;
    });
    // 使用jieba分词
    CodeMirror.defineExtension("cutSentence", function(str) {
        return cutSentencePromise(str);
    });
});