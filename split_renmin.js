const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'renmin.txt');
const outputDir = path.join(__dirname, 'articles', 'renmin');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

if (!fs.existsSync(inputFile)) {
  console.error('❌ 错误：找不到 renmin.txt 文件！');
  process.exit(1);
}

const content = fs.readFileSync(inputFile, 'utf-8');

// 根据 mp.weixin.qq.com 链接拆分文章块
const blocks = content.split(/(?=https:\/\/mp\.weixin\.qq\.com\/s\/)/).filter(b => b.trim());

let successCount = 0;

blocks.forEach(art => {
  // 匹配文章编号（支持 "文章 183"、"第183篇"、"文章183：" 等多种格式）
  const matchNum = art.match(/(?:文章|第)\s*(\d+)/);
  if (!matchNum) return;
  
  const numInt = parseInt(matchNum[1], 10);
  const num = numInt.toString().padStart(2, '0');
  
  // 提取链接
  const urlMatch = art.match(/https:\/\/mp\.weixin\.qq\.com\/s\/[^\s\n]+/);
  const url = urlMatch ? urlMatch[0] : '';

  // 提取关键词生成文件名
  let titleKeyword = '';
  const kwMatch = art.match(/(?:关键词|关键字)[：:]?\s*([^\n]+)/);
  if (kwMatch) {
    const firstKw = kwMatch[1].split(/[、,，\s]/)[0].replace(/[*#]/g, '').trim();
    if (firstKw) titleKeyword = `-${firstKw}`;
  }

  const fileName = `${num}${titleKeyword}.md`;
  const filePath = path.join(outputDir, fileName);

  const titleStr = `文章${numInt}`;
  
  const mdContent = `---
title: "${titleStr}"
source: "人民日报"
---

# ${titleStr}

${url ? `> **原文链接**：[点击查看微信原文](${url})\n` : ''}
---

## 📌 内容分析

${art.trim()}
`;

  fs.writeFileSync(filePath, mdContent, 'utf-8');
  console.log(`✅ 成功生成: ${fileName}`);
  successCount++;
});

console.log(`\n🎉 拆分完成！共成功处理 ${successCount} 篇人民日报文章。`);