Tieba => Markdown
=================
[![Site](https://img.shields.io/badge/Version-v0.2.x-%23FF4D5B.svg?style=flat-square)](https://github.com/uupers/save-tieba)
![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg?style=flat-square)
![LICENSE](https://img.shields.io/badge/license-MPL%202.0-blue.svg?style=flat-square)

保存贴吧的精品文章, 转化为 markdown 格式.

## Tutorial

使用 `npm` 或 `yarn` 安装

```bash
yarn add @vutex/wapp2md
```

然后输入帖子 `id` 就能下载并转换为 `markdown` 文件了.

```typescript
import { writeFileSync } from 'fs'
import { parserPage } from '@vutex/wapp2md'
parserPage(5544838611).then($ => { writeFileSync(`${__dirname}/5544838611.md`, $) })
```

网页: http://tieba.baidu.com/p/5544838611
脚本: https://github.com/uupers/save-tieba/blob/master/projects/wapp2md/test/page.ts
效果: https://github.com/uupers/save-tieba/blob/master/projects/wapp2md/test/5544838611.md

