const fs = require('fs');
const path = require('path');

// 1. 定义路径
const txtPath = path.join(__dirname, 'renmin.txt');
const outputDir = path.join(__dirname, 'articles', 'renmin');

// 2. 清空旧文件夹，防止残余重复文件
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
  console.log('🧹 已自动清理旧的 renmin 文件夹');
}
fs.mkdirSync(outputDir, { recursive: true });

// 3. 读取 renmin.txt 内容并统一换行符
if (!fs.existsSync(txtPath)) {
  console.error('❌ 错误：未找到 renmin.txt 文件，请确认文件路径！');
  process.exit(1);
}

// 统一将 \r\n 替换为 \n，避免 Windows 换行符影响
const content = fs.readFileSync(txtPath, 'utf-8').replace(/\r\n/g, '\n');

// 4. 按“第X篇”切分文章（兼容“第 134 篇”等带空格格式）
const articleBlocks = content.split(/(?=第\s*\d+\s*篇)/g).filter(block => block.trim().length > 0);

let successCount = 0;

articleBlocks.forEach((block) => {
  // 匹配篇号（如 189），兼容中英文或无冒号情况
  const numMatch = block.match(/第\s*(\d+)\s*篇/);
  if (!numMatch) return;

  const num = numMatch[1].padStart(3, '0'); // 补齐为 3 位数，如 001, 140, 189

  // 提取关键词作为文章标题/文件名的一部分
  let title = '未命名';
  const keywordMatch = block.match(/关键词[：:]\s*(.+)/);
  if (keywordMatch) {
    // 提取第一个关键词，并剔除 Windows 文件名非法字符及特殊符号
    const rawKeyword = keywordMatch[1].split(/[、,，\s]/)[0];
    title = rawKeyword.replace(/[:：\\/:*?"<>|]/g, '').trim() || '未命名';
  }

  // 构建标准文件名（例：189-白砂糖.md）
  const fileName = `${num}-${title}.md`;
  const filePath = path.join(outputDir, fileName);

  // 格式化 Markdown 模版
  const fileContent = `---
title: "第${parseInt(num, 10)}篇：${title}"
---

${block.trim()}
`;

  // 写入文件
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`✅ 成功生成：${fileName}`);
  successCount++;
});

console.log(`\n🎉 拆分完成！成功重置并处理了 ${successCount} 篇人民日报文章。`);