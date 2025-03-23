document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const fileName = urlParams.get('file');

  if (fileName) {
    const jsonUrl = `../Articles/${fileName}`;
    
    try {
      const response = await fetch(jsonUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // 選取需要操作的 DOM 元素
      const header = document.querySelector('.content h1');
      const tag = document.querySelector('.content .tag');
      const contentContainer = document.querySelector('.content');
      const homeButton = document.querySelector('button.home');

      if (header) header.textContent = data.title || '未找到標題';
      document.title = (data.title ? data.title + ' - Flamesheep' : '未找到標題');
      if (tag) tag.textContent = data.tag || '未找到標籤';

      if (contentContainer) {
        const paragraphs = data.content.split('～');
        const htmlContent = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
        contentContainer.innerHTML += htmlContent;
      }

      // JSON 正確載入後，顯示內容
      document.documentElement.style.visibility = 'visible';

      // JSON 載入成功後隱藏 .home 按鈕
      if (homeButton) {
        homeButton.style.display = 'none';
      }
    } catch (error) {
      console.error('Error loading JSON:', error);
      document.body.innerHTML = '<p>無法加載 JSON 文件。</p>';
    }
  }
});