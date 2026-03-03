// =============================
// SHODAN EXTRACTOR - POPUP.JS
// Chrome MV3 Version (Stable)
// =============================


// ===== EXTRACT BUTTON =====
document.getElementById("extractBtn").addEventListener("click", async () => {

    const resultArea = document.getElementById("resultArea");
    resultArea.value = "Extracting...";

    try {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        if (!tab || !tab.url || !tab.url.includes("shodan.io")) {
            resultArea.value = "Open a Shodan result page first.";
            return;
        }

        chrome.tabs.sendMessage(tab.id, { action: "extract" }, (response) => {

            if (chrome.runtime.lastError) {
                resultArea.value = "Content script not loaded. Refresh the Shodan page.";
                return;
            }

            if (response && response.data) {
                resultArea.value = response.data;
            } else {
                resultArea.value = "No result found.";
            }
        });

    } catch (err) {
        resultArea.value = "Error extracting data.";
    }
});


// ===== COPY BUTTON (Win+V Friendly Method) =====
document.getElementById("copyBtn").addEventListener("click", () => {

    const textarea = document.getElementById("resultArea");
    if (!textarea.value) return;

    // Gunakan metode klasik supaya lebih sering muncul di Win+V
    const temp = document.createElement("textarea");
    temp.value = textarea.value;

    // Hindari scroll jump
    temp.style.position = "fixed";
    temp.style.opacity = "0";

    document.body.appendChild(temp);
    temp.focus();
    temp.select();

    try {
        document.execCommand("copy");
    } catch (err) {
        console.error("Copy failed:", err);
    }

    document.body.removeChild(temp);
});