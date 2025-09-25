import React, { useState, useRef, useEffect } from 'react';
import { Copy, Download, RotateCcw, Eye, EyeOff } from 'lucide-react';

const FormulaEditor = () => {
  const [latex, setLatex] = useState('E = mc^2');
  const [showPreview, setShowPreview] = useState(true);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  // 常用數學符號和公式模板
  const mathSymbols = [
    { symbol: '\\alpha', display: 'α', category: 'greek' },
    { symbol: '\\beta', display: 'β', category: 'greek' },
    { symbol: '\\gamma', display: 'γ', category: 'greek' },
    { symbol: '\\delta', display: 'δ', category: 'greek' },
    { symbol: '\\epsilon', display: 'ε', category: 'greek' },
    { symbol: '\\pi', display: 'π', category: 'greek' },
    { symbol: '\\sigma', display: 'σ', category: 'greek' },
    { symbol: '\\omega', display: 'ω', category: 'greek' },
    { symbol: '^2', display: 'x²', category: 'power' },
    { symbol: '^3', display: 'x³', category: 'power' },
    { symbol: '^{-1}', display: 'x⁻¹', category: 'power' },
    { symbol: '_{0}', display: 'x₀', category: 'power' },
    { symbol: '\\frac{a}{b}', display: 'a/b', category: 'fraction' },
    { symbol: '\\sqrt{x}', display: '√x', category: 'root' },
    { symbol: '\\sqrt[n]{x}', display: 'ⁿ√x', category: 'root' },
    { symbol: '\\sum_{i=1}^{n}', display: '∑', category: 'operator' },
    { symbol: '\\int_{a}^{b}', display: '∫', category: 'operator' },
    { symbol: '\\lim_{x \\to 0}', display: 'lim', category: 'operator' },
    { symbol: '\\partial', display: '∂', category: 'operator' },
    { symbol: '\\infty', display: '∞', category: 'symbol' },
    { symbol: '\\pm', display: '±', category: 'symbol' },
    { symbol: '\\times', display: '×', category: 'symbol' },
    { symbol: '\\div', display: '÷', category: 'symbol' },
    { symbol: '\\leq', display: '≤', category: 'symbol' },
    { symbol: '\\geq', display: '≥', category: 'symbol' },
    { symbol: '\\neq', display: '≠', category: 'symbol' },
    { symbol: '\\approx', display: '≈', category: 'symbol' }
  ];

  const formulaTemplates = [
    { name: '二次方程式', latex: 'ax^2 + bx + c = 0' },
    { name: '二次公式', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
    { name: '畢氏定理', latex: 'a^2 + b^2 = c^2' },
    { name: '質能方程', latex: 'E = mc^2' },
    { name: '歐拉公式', latex: 'e^{i\\pi} + 1 = 0' },
    { name: '導數定義', latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}' },
    { name: '積分基本定理', latex: '\\int_{a}^{b} f(x)dx = F(b) - F(a)' },
    { name: '標準差', latex: '\\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N}(x_i - \\mu)^2}' }
  ];

  // 簡化的LaTeX渲染 (實際應用中會使用KaTeX)
  const renderFormula = (latexString) => {
    // 這是一個簡化的渲染器，實際項目中應使用 KaTeX 或 MathJax
    let rendered = latexString;
    
    // 基本替換規則
    const replacements = [
      [/\\alpha/g, 'α'],
      [/\\beta/g, 'β'],
      [/\\gamma/g, 'γ'],
      [/\\delta/g, 'δ'],
      [/\\epsilon/g, 'ε'],
      [/\\pi/g, 'π'],
      [/\\sigma/g, 'σ'],
      [/\\omega/g, 'ω'],
      [/\\infty/g, '∞'],
      [/\\pm/g, '±'],
      [/\\times/g, '×'],
      [/\\div/g, '÷'],
      [/\\leq/g, '≤'],
      [/\\geq/g, '≥'],
      [/\\neq/g, '≠'],
      [/\\approx/g, '≈'],
      [/\\partial/g, '∂'],
      [/\\sum/g, '∑'],
      [/\\int/g, '∫'],
      [/\\lim/g, 'lim'],
      [/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)'],
      [/\\sqrt\{([^}]+)\}/g, '√($1)'],
      [/\^([0-9])/g, '⁺$1'],
      [/_([0-9])/g, '₊$1'],
      [/\{([^}]+)\}/g, '$1'],
      [/\\\\/g, '']
    ];

    replacements.forEach(([pattern, replacement]) => {
      rendered = rendered.replace(pattern, replacement);
    });

    return rendered;
  };

  const insertSymbol = (symbol) => {
    const textarea = document.getElementById('latex-input');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = latex.substring(0, start) + symbol + latex.substring(end);
    setLatex(newValue);
    
    // 設置游標位置
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + symbol.length, start + symbol.length);
    }, 0);
  };

  const loadTemplate = (templateLatex) => {
    setLatex(templateLatex);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(latex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('複製失敗:', err);
    }
  };

  const downloadAsSVG = () => {
    // 實際實現中會使用 KaTeX 生成 SVG
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="100" viewBox="0 0 400 100">
        <text x="20" y="50" font-family="Times, serif" font-size="24" fill="black">
          ${renderFormula(latex)}
        </text>
      </svg>
    `;
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formula.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetFormula = () => {
    setLatex('');
  };

  const categories = [...new Set(mathSymbols.map(s => s.category))];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">數學公式編輯器</h2>
        <p className="text-gray-600">輸入 LaTeX 語法來創建數學公式，適用於科學教學簡報</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主要編輯區域 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 工具列 */}
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              {showPreview ? '隱藏預覽' : '顯示預覽'}
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              <Copy size={16} />
              {copied ? '已複製！' : '複製 LaTeX'}
            </button>
            <button
              onClick={downloadAsSVG}
              className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              <Download size={16} />
              下載 SVG
            </button>
            <button
              onClick={resetFormula}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              <RotateCcw size={16} />
              清除
            </button>
          </div>

          {/* LaTeX 輸入框 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">LaTeX 代碼</label>
            <textarea
              id="latex-input"
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="輸入 LaTeX 代碼，例如：E = mc^2"
            />
          </div>

          {/* 預覽區域 */}
          {showPreview && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">公式預覽</label>
              <div className="p-6 border border-gray-300 rounded-lg bg-white min-h-24 flex items-center justify-center">
                <div className="text-2xl font-serif">
                  {latex ? renderFormula(latex) : <span className="text-gray-400">預覽將顯示在此處</span>}
                </div>
              </div>
            </div>
          )}

          {/* 常用公式模板 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">常用公式模板</label>
            <div className="grid grid-cols-2 gap-2">
              {formulaTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => loadTemplate(template.latex)}
                  className="p-2 text-left border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-800">{template.name}</div>
                  <div className="text-xs text-gray-600 font-mono">{template.latex}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 符號面板 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">數學符號</h3>
          
          {categories.map(category => (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 capitalize">
                {category === 'greek' && '希臘字母'}
                {category === 'power' && '指數下標'}
                {category === 'fraction' && '分數'}
                {category === 'root' && '根號'}
                {category === 'operator' && '運算符'}
                {category === 'symbol' && '符號'}
              </h4>
              <div className="grid grid-cols-4 gap-1">
                {mathSymbols
                  .filter(s => s.category === category)
                  .map((symbol, index) => (
                    <button
                      key={index}
                      onClick={() => insertSymbol(symbol.symbol)}
                      className="p-2 text-center border border-gray-200 rounded hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      title={symbol.symbol}
                    >
                      <span className="text-lg">{symbol.display}</span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 使用說明 */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">使用說明</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 點擊符號按鈕可直接插入到游標位置</li>
          <li>• 使用 ^ 表示上標，_ 表示下標，例如：x^2, H_2O</li>
          <li>• 使用 \frac{"{分子}"}{"{分母}"} 來創建分數</li>
          <li>• 使用 \sqrt{"{內容}"} 來創建根號</li>
          <li>• 點擊常用模板可快速插入複雜公式</li>
        </ul>
      </div>
    </div>
  );
};

export default FormulaEditor;