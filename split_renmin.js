const fs = require('fs');
const path = require('path');

// 1. 读取 renmin.txt 源文件
const txtPath = path.join(__dirname, 'renmin.txt');
const outputDir = path.join(__dirname, 'articles', 'renmin');

if (!fs.existsSync(txtPath)) {
  console.error('❌ 未找到 renmin.txt 文件，请确认根目录下存在该文件！');
  process.exit(1);
}

const content = fs.readFileSync(txtPath, 'utf-8');

// 2. 按 "第 X 篇" 切割文章
const articles = content.split(/(?=第\s*\d+\s*篇)/g).filter(item => item.trim().length > 0);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let count = 0;

articles.forEach((item, index) => {
  const trimContent = item.trim();
  if (!trimContent) return;

  // 提取原文链接
  const urlMatch = trimContent.match(/链接[：:\s]*(https?:\/\/[^\s]+)/i);
  const url = urlMatch ? urlMatch[1] : '';

  // 提取内容分析
  const analysisMatch = trimContent.match(/内容分析[：:\s]*([\s\S]*?)(?=关键|标签|主题|$)/i);
  let analysis = analysisMatch ? analysisMatch[1].trim() : '';

  // 1. 宽松提取关键词（兼容各种空格、冒号格式）
  const keywordMatch = trimContent.match(/(?:关键词|核心词|标签)[：:\s]*([^\n\r]+)/i);
  let keywordStr = keywordMatch ? keywordMatch[1].trim() : '';
  
  let keywords = keywordStr ? keywordStr.split(/[\s,，、；;]+/).filter(k => k && !k.includes('链接')) : [];

  // 2. 智能保底方案：如果没找到关键词，自动从内容分析中提取主题词，避免出现“健康文章”
  let mainKeyword = keywords[0];
  if (!mainKeyword) {
    // 尝试从内容分析提取第一个名词词组
    const topicMatch = analysis.match(/[\u4e00-\u9fa5]{2,6}/);
    mainKeyword = topicMatch ? topicMatch[0] : `文章${index + 1}`;
  }

  // 清理文件名非法字符
  mainKeyword = mainKeyword.replace(/[/\\?%*:|"<>]/g, '');

  const numStr = String(index + 1).padStart(3, '0');
  const fileName = `${numStr}-${mainKeyword}.md`;
  const filePath = path.join(outputDir, fileName);

  // 组合关键词标签
  const tagList = keywords.length > 0 
    ? keywords.map(k => `\`${k}\``).join(' ') 
    : `\`${mainKeyword}\``;

  // 渲染成标准 Markdown 格式
  const mdContent = `---
title: "文章${index + 1}: ${mainKeyword}"
source: "人民日报"
---

# 文章${index + 1}: ${mainKeyword}健康科普

> **原文链接**：[点击查看微信原文](${url || '#'})

---

## 📌 内容分析

${analysis || trimContent}

---

**核心关键词**： ${tagList}
`;

  fs.writeFileSync(filePath, mdContent, 'utf-8');
  count++;
});

console.log(`✅ 修复完成！已成功重新抓取并生成 ${count} 篇包含精准主题词的人民日报文章！`);