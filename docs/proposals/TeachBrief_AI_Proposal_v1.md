# TeachBrief.AI 教學簡報自動化平台 - 專案提案書
## 一、專案簡介
TeachBrief.AI 是一個專為教師設計的開源 AI 應用平台，能夠自動從多份教學文件中提取內容並生成簡報、講稿與配圖。
本專案完全採用免費的大語言模型與圖像生成模型，適合教育單位使用並由單一資深開發者維護與部署。

## 二、主要功能
- 多文件整合與摘要
- 自動產出簡報分頁
- 教學講稿自動生成
- 根據內容自動配圖
- 讀取圖片並生成延伸圖像
- 簡報匯入與修改
- 簡報輸出（PPTX / PDF / Google Slides）

## 三、使用模型與技術
- 語言模型：Mistral 7B Instruct、Phi-2、LLaMA 3 8B、Zephyr 7B
- 圖像生成模型：Stable Diffusion XL (SDXL)
- 圖像理解模型：BLIP-2
- 簡報處理：python-pptx
- 前端：Next.js + Tailwind CSS
- 後端：FastAPI
- 部署：Ollama、ComfyUI、Hugging Face Transformers

## 四、系統架構圖
（請見附圖）

## 五、開發規劃與優先順序
- 第 1 階段：多文件整合 + 簡報產出 + 講稿生成
- 第 2 階段：匯入 PPT 編輯功能 + 圖片生成
- 第 3 階段：圖片延伸與簡報輸出整合

## 六、實施效益
- ✅ 教師備課時間減少 50% 以上
- ✅ 提升教材品質與視覺表現
- ✅ 降低教學資料重工與重複編輯
