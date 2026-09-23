import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 按照文件名中的数字进行精准排序
function sortByNumber(a: string, b: string) {
  const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10)
  const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10)
  return numA - numB
}

// 通用侧边栏生成函数
function getSidebarItems(dirRelativePath: string) {
  const dirPath = path.resolve(process.cwd(), dirRelativePath)
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)
  return files
    .filter(file => file.endsWith('.md') && !file.startsWith('.'))
    .sort(sortByNumber)
    .map(file => {
      const fileNameWithoutExt = file.replace(/\.md$/, '')
      return {
        text: fileNameWithoutExt,
        link: `/${dirRelativePath}/${fileNameWithoutExt}`
      }
    })
}

// 提前预加载各个目录的文件列表
const xinhuaItems = getSidebarItems('articles/xinhua')
const renminItems = getSidebarItems('articles/renmin')
const reportsItems = getSidebarItems('reports')

// 确定每个板块的入口链接，如果没有文章则回退到根目录
const firstXinhua = xinhuaItems[0]?.link || '/'
const firstRenmin = renminItems[0]?.link || '/'
const firstReport = reportsItems[0]?.link || '/'

export default defineConfig({
  title: "健康资讯与分析数据库",
  description: "个人健康数据与文章知识库",
  
  // 核心：遇到失效链接时不崩溃
  ignoreDeadLinks: true,

  themeConfig: {
    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '综合分析报告', link: firstReport },
      { text: '新华社文章', link: firstXinhua },
      { text: '人民日报文章', link: firstRenmin }
    ],

    // 侧边栏：精准独立配置
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