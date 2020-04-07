# CodeMirror × wasm-cppjieba

CodeMirror 依赖 wasm-cppjieba 提供的中文分词能力，实现编辑操作中的两个分词场景：
- 双击鼠标选词 (已完成)
- option + 左右方向键跳词 (暂未完成)

## 运行代码
```shell
git clone git@github.com:YingshanDeng/CodeMirror.git
npm i
npm run build

# 这个需要安装 emscripten 编译器，参考：https://webassembly.org/getting-started/developers-guide/
emrun --no_browser --port 8081 .
```

在浏览器中打开这个地址： [http://localhost:8081/demo/wasm-cppjieba.html](http://localhost:8081/demo/wasm-cppjieba.html)

## 效果对比
之前:

![](https://raw.githubusercontent.com/YingshanDeng/CodeMirror/master/images/before.gif)

之后：

![](https://raw.githubusercontent.com/YingshanDeng/CodeMirror/master/images/after.gif)

## 关键代码
```JS
findWordRangeAtPos: async function(text, pos) {
  let start = 0, end = 0;
  let cuts = await this.doc.cm.cutSentence(text);

  for(let index = 0; index < cuts.length; index++) {
    end += cuts[index];
    if (start <= pos.ch && pos.ch <= end) {
      if (pos.sticky === "before" && pos.ch === start) {
        // 判断光标处于分词左边界，且是和前一个字符关联，则跳到上一个分词
        end = start;
        start -= cuts[index-1];
      } else if (pos.sticky === "after" && pos.ch === end) {
        // 判断光标处于分词右边界，且是和后一个字符关联，则跳到下一个分词
        start = end;
        end += cuts[index+1];
      }
      break;
    }
    start = end;
  }

  return { start, end }
},
```
