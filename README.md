# Blocktrend x ether.fi | Spending without Selling

> 支付卡演變史：從「變現消費」到「資產抵押」  
> 解析 Ether.fi 如何在 Scroll 上重塑 DeFi 的最後一哩路

## 📖 關於專案

這是為 XueDAO Meetup（台北，2025年1月17日）準備的簡報網站，由 [Blocktrend](https://blocktrend.substack.com/) 創辦人 Astro Hsu 主講，探討加密貨幣支付卡的演變歷程，以及 Ether.fi Cash 如何透過 Scroll zkEVM 實現新一代的信用消費模式。

## ✨ 主要內容

### 🎯 核心主題
- **Spending without Selling** - 在消費的同時，保留資產的增值潛力
- 支付卡的三個世代演進（Gen 1.0 → Gen 2.0 → Gen 3.0）
- Ether.fi Cash 如何結合 LRT（Liquid Restaking Token）與借貸機制
- Scroll zkEVM 在支付場景中的優勢

### 📊 簡報結構
1. **開場介紹** - Blocktrend x ether.fi 合作
2. **支付卡演變史** - 從 CEX 預付卡到 DeFi 信用卡
3. **Ether.fi Cash 優勢** - 保留收益、借貸機制、稅務效率
4. **Scroll 基礎設施** - 低延遲、低成本結算
5. **實際使用場景** - 從概念到現實生活的無縫支付

## 🛠️ 技術棧

- **框架**: React 18
- **構建工具**: Vite 5
- **樣式**: Tailwind CSS 3
- **圖標**: Lucide React
- **部署**: Vercel

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

訪問 [http://localhost:5173](http://localhost:5173) 查看本地開發版本。

### 構建生產版本

```bash
npm run build
```

構建產物將輸出到 `dist` 目錄。

### 預覽生產構建

```bash
npm run preview
```

## ⌨️ 操作說明

### 鍵盤快捷鍵
- `→` 或 `空格鍵` - 下一頁
- `←` - 上一頁

### 導航控制
- 點擊底部導航箭頭切換頁面
- 支援觸控手勢滑動（移動設備）

## 📁 專案結構

```
xuedao-zkevm-etherfi/
├── src/
│   ├── App.jsx          # 主應用組件
│   ├── main.jsx         # 應用入口
│   └── index.css        # 全局樣式
├── index.html           # HTML 模板
├── package.json         # 專案配置
├── vite.config.js       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
├── postcss.config.js    # PostCSS 配置
├── vercel.json          # Vercel 部署配置
└── README.md           # 專案說明文件
```

## 🌐 部署

專案已配置自動部署到 Vercel：

1. 推送到 GitHub 主分支會自動觸發部署
2. 或訪問 [Vercel Dashboard](https://vercel.com) 手動部署

**生產環境**: [https://xuedao-zkevm-etherfi.vercel.app](https://xuedao-zkevm-etherfi.vercel.app)

## 📚 相關資源

### 文章與資料
- [Blocktrend 專欄](https://blocktrend.substack.com/)
- [Ether.fi 官方網站](https://www.ether.fi/)
- [Scroll 官方網站](https://scroll.io/)

### 區塊鏈資源
- **Scroll**: Ethereum 相容的 zkEVM Layer 2
- **Ether.fi**: 流動性質押協議
- **LRT (Liquid Restaking Token)**: eETH / weETH

## 👤 作者

**Astro Hsu**  
Founder, Blocktrend  
[Blocktrend Substack](https://blocktrend.substack.com/)

## 📄 授權

本專案為 XueDAO Meetup 簡報用途。

---

**© 2025 Blocktrend. Created for XueDAO Meetup.**