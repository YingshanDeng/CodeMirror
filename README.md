# CodeMirror × wasm-cppjieba

CodeMirror 依赖 wasm-cppjieba 提供的中文分词能力，实现编辑操作中的两个分词场景：
- 双击鼠标选词 (已完成)
- option + 左右方向键跳词 (暂未完成)

## 运行代码
```shell
git clone git@github.com:YingshanDeng/CodeMirror.git
npm i
npm run build

# 这个需要安装 emscripten 环境，参考：https://webassembly.org/getting-started/developers-guide/
emrun --no_browser --port 8081 .
```

在浏览器中打开这个地址： [http://localhost:8081/demo/wasm-cppjieba.html](http://localhost:8081/demo/wasm-cppjieba.html)

## 效果对比
之前:

![](https://raw.githubusercontent.com/YingshanDeng/CodeMirror/master/images/before.gif)

之后：

![](https://raw.githubusercontent.com/YingshanDeng/CodeMirror/master/images/after.gif)
