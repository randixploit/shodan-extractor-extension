chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "extract") {

        const hostnames = Array.from(
            document.querySelectorAll('li.hostnames.text-secondary')
        ).map(el => el.textContent.trim());

        const ipAddresses = Array.from(
            document.querySelectorAll('a.title.text-dark[href^="/host/"]')
        ).map(el => el.textContent.trim());

        const allValues = [...hostnames, ...ipAddresses];
        const uniqueValues = [...new Set(allValues)];

        sendResponse({
            data: uniqueValues.join('\n')
        });
    }

    return true; // penting di Chrome MV3
});