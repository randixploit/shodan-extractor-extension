browser.runtime.onMessage.addListener((request) => {

    if (request.action === "extract") {

        const hostnames = Array.from(
            document.querySelectorAll('li.hostnames.text-secondary')
        ).map(el => el.textContent.trim());

        const ipAddresses = Array.from(
            document.querySelectorAll('a.title.text-dark[href^="/host/"]')
        ).map(el => el.textContent.trim());

        const allValues = [...hostnames, ...ipAddresses];
        const uniqueValues = [...new Set(allValues)];

        return Promise.resolve({
            data: uniqueValues.join('\n')
        });
    }
});