const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'xinhua.txt');
const outputDir = path.join(__dirname, 'articles', 'xinhua');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

if (!fs.existsSync(inputFile)) {
  console.error('找不到 xinhua.txt 文件！');
  process.exit(1);
}

const content = fs.readFileSync(inputFile, 'utf-8');
// 按第X篇切割
const articles = content.split(/第(?=\d+篇)/).filter(Boolean);

articles.forEach(art => {
  const matchNum = art.match(/^(\d+)篇/);
  if (!matchNum) return;
  
  const num = matchNum[1].padStart(2, '0');
  
  // 提取链接
  const urlMatch = art.match(/https:\/\/mp\.weixin\.qq\.com\/s\/[^\s\n]+/);
  const url = urlMatch ? urlMatch[0] : '';

  // 提取核心关键词/小标题作为文件名补充
  let titleKeyword = '';
  const kwMatch = art.match(/关键词[：:]?\s*([^\n]+)/) || art.match(/核心关键字[：:]?\s*([^\n]+)/);
  if (kwMatch) {
    const firstKw = kwMatch[1].split(/[、,，]/)[0].trim();
    if (firstKw) titleKeyword = `-${firstKw}`;
  }

  const fileName = `${num}${titleKeyword}.md`;
  const filePath = path.join(outputDir, fileName);

  // 提取标题展示
  let titleStr = `文章${parseInt(num, 10)}`;
  
  // 组装 Markdown 内容
  const mdContent = `---
title: "${titleStr}"
source: "新华社"
---

# ${titleStr}

${url ? `> **原文链接**：[点击查看微信原文](${url})\n` : ''}
---

## 📌 内容分析

${art.trim()}
`;

  fs.writeFileSync(filePath, mdContent, 'utf-8');
  console.log(`成功生成: ${fileName}`);
});

console.log('🎉 新华社文章拆分完成！');