import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 动态自动获取人民日报文章列表
function getRenminSidebar() {
  const dirPath = path.resolve(__dirname, '../articles/renmin')
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const name = file.replace('.md', '')
      return {
        text: name,
        link: `/articles/renmin/${name}`
      }
    })
}

// 动态自动获取新华社文章列表
function getXinhuaSidebar() {
  const dirPath = path.resolve(__dirname, '../articles/xinhua')
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const name = file.replace('.md', '')
      return {
        text: name,
        link: `/articles/xinhua/${name}`
      }
    })
}

export default defineConfig({
  title: "健康资讯与分析数据库",
  description: "新华社与人民日报健康文章及分析报告",

  themeConfig: {
    // 开启本地全文搜索
    search: {
      provider: 'local'
    },

    // 顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '宏观分析报告', link: '/reports/01-人民日报分类分析报告' },
      { text: '新华社文章', link: '/articles/xinhua/01-蛋白质没吃够' },
      { text: '人民日报文章', link: '/articles/renmin/001-添加糖' } // 替换为拆分后的第一篇文章文件名
    ],

    // 左侧边栏菜单
    sidebar: {
      // 1. 宏观分析报告侧边栏
      '/reports/': [
        {
          text: '宏观分析报告',
          items: [
            { text: '人民日报分类分析报告', link: '/reports/01-人民日报分类分析报告' },
            { text: '新华社综合分析报告', link: '/reports/02-新华社综合分析报告' }
          ]
        }
      ],

      // 2. 新华社文章侧边栏
      '/articles/xinhua/': [
        {
          text: '新华社健康文章',
          items: getXinhuaSidebar()
        }
      ],

      // 3. 人民日报文章侧边栏（自动列出所有拆分好的文章）
      '/articles/renmin/': [
        {
          text: '人民日报健康文章',
          items: getRenminSidebar()
        }
      ]
    }
  }
})