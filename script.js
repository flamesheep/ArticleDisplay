document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.article-title');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const fileName = button.textContent.trim() + '.json';
      const templateUrl = `Articles/template.html?file=${encodeURIComponent(fileName)}`;
      window.open(templateUrl, '_blank');
    });
  });
});

// 目錄
document.addEventListener("DOMContentLoaded", function() {
  const articleContainer = document.querySelector('.article');
  // 清空 .article 容器
  articleContainer.innerHTML = '';
  fetch('catalog.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article-BG');     
        // 標題
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('article-title');
        titleDiv.textContent = article.title;
        // R18、item、tags
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
        // 添加空格
        additionalInfoDiv.appendChild(document.createTextNode(' '));
        // 顯示 tags
        article.tags.forEach((tag, index) => {
          const tagSpan = document.createElement('span');
          tagSpan.classList.add('tag');
          tagSpan.textContent = tag;
          additionalInfoDiv.appendChild(tagSpan);
          // 如果不是最後一個 tag，則添加空格
          if (index < article.tags.length - 1) {
            additionalInfoDiv.appendChild(document.createTextNode(' '));
          }
        });
        // 日期
        const dateSpan = document.createElement('span');
        dateSpan.classList.add('date');
        dateSpan.textContent = article.date;

        // 將所有元素加入到 articleDiv
        articleDiv.appendChild(titleDiv);
        articleDiv.appendChild(additionalInfoDiv);
        articleDiv.appendChild(dateSpan);
        articleContainer.appendChild(articleDiv);
      });
    })
    .catch(error => console.error('Error loading the articles:', error));
});
