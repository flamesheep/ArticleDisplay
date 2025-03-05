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


const container = document.querySelector('.container');
const nextBtn = container.querySelector('.containerCtrl.next');
const prevBtn = container.querySelector('.containerCtrl.prev');
const originalItems = container.querySelectorAll('.container-item');

const sliderWrapper = document.createElement('div');
sliderWrapper.className = 'slider-wrapper';
originalItems.forEach(item => sliderWrapper.appendChild(item));
container.insertBefore(sliderWrapper, container.firstChild);

const items = sliderWrapper.querySelectorAll('.container-item');
const totalItems = items.length;
let currentIndex = 0;

// 初始化：複製第一個與最後一個 slide
function setupSlider() {
  const firstClone = items[0].cloneNode(true);
  const lastClone = items[totalItems - 1].cloneNode(true);
  sliderWrapper.appendChild(firstClone);
  sliderWrapper.insertBefore(lastClone, sliderWrapper.firstChild);
  sliderWrapper.style.transform = `translateX(-100%)`;
}

// 處理滑動動畫
function slideTo(index) {
  sliderWrapper.style.transform = `translateX(-${(index + 1) * 100}%)`;
}

// 處理過渡結束事件
function handleTransitionEnd(resetIndex) {
  sliderWrapper.style.transition = 'none';
  currentIndex = resetIndex;
  slideTo(currentIndex);
  sliderWrapper.offsetWidth; // 強制 reflow
  sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
}

// 往下一個
function moveToNext() {
  currentIndex++;
  slideTo(currentIndex);
  if (currentIndex === totalItems) {
    sliderWrapper.addEventListener('transitionend', () => handleTransitionEnd(0), { once: true });
  }
}

// 往上一個
function moveToPrev() {
  currentIndex--;
  slideTo(currentIndex);
  if (currentIndex === -1) {
    sliderWrapper.addEventListener('transitionend', () => handleTransitionEnd(totalItems - 1), { once: true });
  }
}

// 綁定按鈕事件
nextBtn.addEventListener('click', moveToNext);
prevBtn.addEventListener('click', moveToPrev);

// 初始化
setupSlider();