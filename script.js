document.addEventListener('DOMContentLoaded', () => {
  // 獲取所有按鈕
  const buttons = document.querySelectorAll('.article-title');

  // 為每個按鈕綁定點擊事件
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const fileName = button.textContent.trim() + '.json';
      openJsonInNewTab(fileName);
    });
  });

  const openJsonInNewTab = (fileName) => {
    const jsonUrl = `Articles/${fileName}`; // JSON路徑
    const newTab = window.open('Articles/template.html', '_blank');

    // 加載JSON
    fetch(jsonUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        newTab.onload = () => {
          // 獲取新頁面的 DOM 元素
          const header = newTab.document.querySelector('.content h1');
          const tag = newTab.document.querySelector('.content .tag');
          const contentContainer = newTab.document.querySelector('.content');

          // 填充 JSON 數據到模板中
          if (header) header.textContent = data.title || '未找到標題';
          if (tag) tag.textContent = data.tag || '未找到標籤';

          // 分段
          if (contentContainer) {
            const paragraphs = data.content.split('～');
            const htmlContent = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
            contentContainer.innerHTML += htmlContent; // 將内容插入 .content 中
          }
        };
      })
      .catch(error => {
        console.error('Error loading JSON:', error);
        newTab.document.write('<p>無法加載 JSON 文件。</p>');
        newTab.document.close();
      });
  };
});