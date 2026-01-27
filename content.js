const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function nextPage() {
    var nextPageButton = document.querySelector('.andes-pagination__button--next')

    if (nextPageButton.classList.contains("andes-pagination__button--disabled")) {
        chrome.runtime.sendMessage({
            action: "SHOW_NOTIFICATION",
            title: "Mercado Libre | Cupones",
            message: "Ya no hay más cupones por aplicar. ¡Disfruta de tu compra!"
        });

        return;
    }
    nextPageButton.querySelector('a').href = nextPageButton.querySelector('a').href + "&autoclick=true";
    nextPageButton.querySelector('a').click();
}

async function clickAllWithDelay() {
    const timeout = 1000;
    const startTime = Date.now();

    while (document.querySelectorAll('.andes-button--loud').length === 0) {
        if (Date.now() - startTime > timeout) {
            nextPage()
            return;
        }
        await delay(500);
    }

    while (true) {
        const elements = document.querySelectorAll('.andes-button--loud');
        if (elements.length === 0) break;

        for (const el of elements) {
            el.click();
            await delay(50);
        }

        await delay(500);
    }
    nextPage()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', clickAllWithDelay);
} else {
    clickAllWithDelay();
}