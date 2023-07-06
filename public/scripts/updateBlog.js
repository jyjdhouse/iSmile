

window.addEventListener('load', () => {
    const textArea = document.querySelector('.form-update-textarea')

    const turndownService = new Turndown();
    const markdown = turndownService.turndown(textArea);
    textArea.textContent = markdown;

})