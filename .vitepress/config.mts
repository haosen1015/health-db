import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 按文件名中的数字提取进行排序
function sortByNumber(a: string, b: string) {
  const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10)
  const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10)
  return numA - numB
}

// 动态读取指定目录下的 markdown 文件生成 sidebar 项
function getSidebarItems(dirRelativePath: string) {
  const dirPath = path.resolve(process.cwd(), dirRelativePath)
  if (!fs.existsSync(dirPath)) return []

  return fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.md') && file !== 'index.md' && !file.startsWith('.'))
    .sort(sortByNumber)
    .map(file => {
      const fileNameWithoutExt = file.replace(/\.md$/, '')
      return {
        text: fileNameWithoutExt,
        link: `/${dirRelativePath}/${fileNameWithoutExt}`
      }
    })
}

const xinhuaItems = getSidebarItems('articles/xinhua')
const renminItems = getSidebarItems('articles/renmin')
const reportsItems = getSidebarItems('reports')

export default defineConfig({
  title: "健康资讯与分析数据库",
  description: "个人健康数据与文章知识库",
  
  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '综合分析报告', link: reportsItems[0]?.link || '/reports/01-人民日报分类分析报告' },
      { text: '新华社文章', link: xinhuaItems[0]?.link || '/articles/xinhua/001-优质蛋白质' },
      { text: '人民日报文章', link: renminItems[0]?.link || '/articles/renmin/001-优质蛋白质' }
    ],

    sidebar: {
      '/reports/': [
        {
          text: '宏观分析报告',
          items: reportsItems
        }
      ],
      '/articles/xinhua/': [
        {
          text: '新华社文章列表',
          items: xinhuaItems
        }
      ],
      '/articles/renmin/': [
        {
          text: '人民日报文章列表（共 189 篇）',
          items: renminItems
        }
      ]
    }
  }
})