import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 灵活提取文件名中的数字进行排序（兼容 001-xxx, 01-xxx, 1-xxx）
function sortByNumber(a: string, b: string) {
  const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10)
  const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10)
  return numA - numB
}

// 侧边栏文件读取函数
function getSidebarItems(dirRelativePath: string) {
  const dirPath = path.resolve(process.cwd(), dirRelativePath)
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)
  return files
    .filter(file => file.endsWith('.md') && file !== 'index.md' && !file.startsWith('.'))
    .sort(sortByNumber)
    .map(file => {
      const fileNameWithoutExt = file.replace(/\.md$/, '')
      return {
        text: fileNameWithoutExt, // 显示侧边栏标题
        link: `/${dirRelativePath}/${fileNameWithoutExt}` // 匹配路由
      }
    })
}

// 预获取三个板块列表
const xinhuaItems = getSidebarItems('articles/xinhua')
const renminItems = getSidebarItems('articles/renmin')
const reportsItems = getSidebarItems('reports')

export default defineConfig({
  title: "健康资讯与分析数据库",
  description: "个人健康数据与文章知识库",
  
  // 核心：防止 dead link 阻塞 Cloudflare 打包
  ignoreDeadLinks: true,

  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '综合分析报告', link: reportsItems[0]?.link || '/' },
      { text: '新华社文章', link: xinhuaItems[0]?.link || '/' },
      { text: '人民日报文章', link: renminItems[0]?.link || '/' }
    ],

    // 侧边栏
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
          text: '人民日报文章列表',
          items: renminItems
        }
      ]
    }
  }
})