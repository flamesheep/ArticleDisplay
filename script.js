document.addEventListener('DOMContentLoaded', () => {
  // 共用函式：根據標題打開對應文章
  const openArticle = (title) => {
    const fileName = title.trim() + '.json';
    const templateUrl = `Articles/template.html?file=${encodeURIComponent(fileName)}`;
    window.open(templateUrl, '_blank');
  };

  // 處理頁面中已有的文章標題（若有的話）
  document.querySelectorAll('.article-title').forEach(button => {
    button.addEventListener('click', () => {
      openArticle(button.textContent);
    });
  });

  // 目錄部分：獲取並動態生成文章列表
  const articleContainer = document.querySelector('.article');
  if (articleContainer) {
    articleContainer.innerHTML = '';
    fetch('catalog.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(article => {
          const articleDiv = document.createElement('div');
          articleDiv.classList.add('article-BG');

          // 標題部分
          const titleDiv = document.createElement('div');
          titleDiv.classList.add('article-title');
          titleDiv.textContent = article.title;

          // R18、item、tags 部分
          const additionalInfoDiv = document.createElement('div');
          additionalInfoDiv.classList.add('additional-info');

          // 如果是 R18，顯示 R18 標籤
          if (article.r18) {
            const r18Span = document.createElement('span');
            r18Span.classList.add('r18');
            r18Span.textContent = 'R18';
            additionalInfoDiv.appendChild(r18Span);
            additionalInfoDiv.appendChild(document.createTextNode(' ')); // 保留空格
          }

          const itemSpan = document.createElement('span');
          itemSpan.classList.add('item');
          itemSpan.textContent = article.item;
          additionalInfoDiv.appendChild(itemSpan);
          additionalInfoDiv.appendChild(document.createTextNode(' '));

          // 顯示 tags
          article.tags.forEach((tag, index) => {
            const tagSpan = document.createElement('span');
            tagSpan.classList.add('tag');
            tagSpan.textContent = tag;
            additionalInfoDiv.appendChild(tagSpan);
            if (index < article.tags.length - 1) {
              additionalInfoDiv.appendChild(document.createTextNode(' '));
            }
          });

          // 日期部分
          const dateSpan = document.createElement('span');
          dateSpan.classList.add('date');
          dateSpan.textContent = article.date;

          // 組合各部分
          articleDiv.appendChild(titleDiv);
          articleDiv.appendChild(additionalInfoDiv);
          articleDiv.appendChild(dateSpan);
          articleContainer.appendChild(articleDiv);
        });

        // 為動態生成的標題添加點擊事件（事件委派）
        articleContainer.addEventListener('click', function(event) {
          if (event.target && event.target.classList.contains('article-title')) {
            openArticle(event.target.textContent);
          }
        });
      })
      .catch(error => console.error('Error loading the articles:', error));
  }
});