const fs = require('fs');
const path = require('path');

const txtPath = path.join(__dirname, 'xinhua.txt');
const outputDir = path.join(__dirname, 'articles', 'xinhua');

// 1. 安全清空 xinhua 文件夹下的所有旧文件
if (fs.existsSync(outputDir)) {
  const files = fs.readdirSync(outputDir);
  for (const file of files) {
    fs.unlinkSync(path.join(outputDir, file));
  }
  console.log('🧹 已清空旧的 md 文件');
} else {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 2. 读取 xinhua.txt 内容
if (!fs.existsSync(txtPath)) {
  console.error('❌ 错误：未找到 xinhua.txt 文件！');
  process.exit(1);
}

const content = fs.readFileSync(txtPath, 'utf-8').replace(/\r\n/g, '\n');

// 3. 按 "文章 X" 或 "第 X 篇" 切分
const articleBlocks = content
  .split(/(?=(?:文章\s*\d+|第\s*\d+\s*篇))/g)
  .filter(block => block.trim().length > 0);

let successCount = 0;

articleBlocks.forEach((block) => {
  // 匹配篇号（文章 1 或 第 1 篇）
  const numMatch = block.match(/(?:文章\s*(\d+)|第\s*(\d+)\s*篇)/);
  if (!numMatch) return;

  const numStr = numMatch[1] || numMatch[2];
  const num = numStr.padStart(3, '0'); // 补齐为 3 位数：001, 002...

  let title = '';

  // 策略1：优先匹配“关键字/关键词”同一行或下一行的第一个词
  const kwMatch = block.match(/关键[词字][：:\s]*\n?([^\n\r、,，\s]+)/);
  if (kwMatch && kwMatch[1] && kwMatch[1].trim() !== '') {
    title = kwMatch[1].trim();
  }

  // 策略2：如果策略1没拿到，尝试从“主要内容”或“内容分析”提取
  if (!title) {
    const summaryMatch = block.match(/(?:主要内容|内容分析)[：:\s]*\n?([^\n\r、,，\s]{2,10})/);
    if (summaryMatch && summaryMatch[1]) {
      title = summaryMatch[1].trim();
    }
  }

  // 策略3：保底标题
  if (!title) {
    title = `文章${parseInt(num, 10)}`;
  }

  // 过滤非法字符
  title = title.replace(/[:：\\/:*?"<>|]/g, '').trim();

  const fileName = `${num}-${title}.md`;
  const filePath = path.join(outputDir, fileName);

  const fileContent = `---
title: "第${parseInt(num, 10)}篇：${title}"
---

${block.trim()}
`;

  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`✅ 成功生成：${fileName}`);
  successCount++;
});

console.log(`\n🎉 拆分完成！成功重置并处理了 ${successCount} 篇新华社文章。`);