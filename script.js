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
