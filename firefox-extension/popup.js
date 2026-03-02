document.getElementById("extractBtn").addEventListener("click", async () => {

    const resultArea = document.getElementById("resultArea");
    resultArea.value = "Extracting...";

    try {
        const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

        if (!tab.url || !tab.url.includes("shodan.io")) {
            resultArea.value = "Open a Shodan result page first.";
            return;
        }

        const injection = await browser.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {

                const hostnames = Array.from(
                    document.querySelectorAll('li.hostnames.text-secondary')
                ).map(el => el.textContent.trim());

                const ipAddresses = Array.from(
                    document.querySelectorAll('a.title.text-dark[href^="/host/"]')
                ).map(el => el.textContent.trim());

                const allValues = [...hostnames, ...ipAddresses];
                const uniqueValues = [...new Set(allValues)];

                return uniqueValues.join('\n');
            }
        });

        const output = injection?.[0]?.result;
        resultArea.value = output || "No result found.";

    } catch (err) {
        resultArea.value = "Error: " + err.message;
    }
});


document.getElementById("copyBtn").addEventListener("click", async () => {

    const textarea = document.getElementById("resultArea");

    if (!textarea.value) return;

    try {
        await navigator.clipboard.writeText(textarea.value);
    } catch {
        textarea.select();
        textarea.setSelectionRange(0, 999999);
        document.execCommand("copy");
    }
});