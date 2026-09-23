import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "健康资讯与分析数据库",
  description: "个人健康数据与文章知识库",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '综合分析报告', link: '/reports/01-人民日报分类分析报告' },
      { text: '新华社文章', link: '/articles/xinhua/001-优质蛋白质' },
      { text: '人民日报文章', link: '/articles/renmin/161-微胖有利于长寿' }
    ],
    
    sidebar: {
      // 1. 综合报告板块
      '/reports/': [
        {
          text: '宏观分析报告',
          items: [
            { text: '01-人民日报分类分析报告', link: '/reports/01-人民日报分类分析报告' },
            { text: '02-新华社综合分析报告', link: '/reports/02-新华社综合分析报告' }
          ]
        }
      ],
      
      // 2. 新华社板块 (001-026全部补全)
      '/articles/xinhua/': [
        {
          text: '新华社文章列表',
          items: [
            { text: '001-优质蛋白质', link: '/articles/xinhua/001-优质蛋白质' },
            { text: '002-升糖指数', link: '/articles/xinhua/002-升糖指数' },
            { text: '003-生物年龄', link: '/articles/xinhua/003-生物年龄' },
            { text: '004-控糖黄金期', link: '/articles/xinhua/004-控糖黄金期' },
            { text: '005-烫食', link: '/articles/xinhua/005-烫食' },
            { text: '006-贴秋膘', link: '/articles/xinhua/006-贴秋膘' },
            { text: '007-厨房坏习惯', link: '/articles/xinhua/007-厨房坏习惯' },
            { text: '008-膳食多样性', link: '/articles/xinhua/008-膳食多样性' },
            { text: '009-变质调味品', link: '/articles/xinhua/009-变质调味品' },
            { text: '010-踝泵运动', link: '/articles/xinhua/010-踝泵运动' },
            { text: '011-踝泵运动', link: '/articles/xinhua/011-踝泵运动' },
            { text: '012-睡眠不好', link: '/articles/xinhua/012-睡眠不好' },
            { text: '013-控糖', link: '/articles/xinhua/013-控糖' },
            { text: '014-上班族', link: '/articles/xinhua/014-上班族' },
            { text: '015-贴秋膘', link: '/articles/xinhua/015-贴秋膘' },
            { text: '016-脑出血', link: '/articles/xinhua/016-脑出血' },
            { text: '017-零食运动', link: '/articles/xinhua/017-零食运动' },
            { text: '018-雷海潮', link: '/articles/xinhua/018-雷海潮' },
            { text: '019-速溶咖啡', link: '/articles/xinhua/019-速溶咖啡' },
            { text: '020-脑出血', link: '/articles/xinhua/020-脑出血' },
            { text: '021-低钾血症', link: '/articles/xinhua/021-低钾血症' },
            { text: '022-控糖', link: '/articles/xinhua/022-控糖' },
            { text: '023-慢性压力', link: '/articles/xinhua/023-慢性压力' },
            { text: '024-慢性压力', link: '/articles/xinhua/024-慢性压力' },
            { text: '025-牙齿酸蚀症', link: '/articles/xinhua/025-牙齿酸蚀症' },
            { text: '026-白砂糖', link: '/articles/xinhua/026-白砂糖' }
          ]
        }
      ],

      // 3. 人民日报板块
      '/articles/renmin/': [
        {
          text: '人民日报文章列表',
          items: [
            // 截图左侧折叠了，但我看到你顶部打开了这篇，先放进来，有别的你后续照着加
            { text: '161-微胖有利于长寿', link: '/articles/renmin/161-微胖有利于长寿' }
          ]
        }
      ]
    }
  }
})