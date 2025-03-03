document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get('file');
  
    if (fileName) {
      const jsonUrl = `${window.location.origin}/Articles/${fileName}`;
  
      fetch(jsonUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const header = document.querySelector('.content h1');
          const tag = document.querySelector('.content .tag');
          const contentContainer = document.querySelector('.content');
          const homeButton = document.querySelector('button.home'); // 獲取按鈕
  
          if (header) header.textContent = data.title || '未找到標題';
          if (tag) tag.textContent = data.tag || '未找到標籤';
  
          if (contentContainer) {
            const paragraphs = data.content.split('～');
            const htmlContent = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
            contentContainer.innerHTML += htmlContent;
          }

          document.documentElement.style.visibility = 'visible'; // 顯示 <html>
  
          // JSON 正確載入後，隱藏 .home 按鈕
          if (homeButton) {
            homeButton.style.display = 'none';
          }
        })
        .catch(error => {
          console.error('Error loading JSON:', error);
          document.body.innerHTML = '<p>無法加載 JSON 文件。</p>';
        });
    }
  });  