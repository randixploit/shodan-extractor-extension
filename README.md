# Shodan Extractor Extension
<a href="https://opensource.org/license/MIT"><img src="https://img.shields.io/badge/license-MIT-green.svg"></a><br>
<img src="https://api.visitorbadge.io/api/VisitorHit?user=randixploit&repo=shodan-extractor-extension&countColor=%237B1E7A" />

A lightweight browser extension that extracts visible hostnames and IP addresses from Shodan search result pages — without needing to open the browser console.

Built for researchers, analysts, and security enthusiasts who prefer a cleaner workflow.

---

## ✨ Features

* Extracts:

  * Hostnames
  * IP addresses
* Removes duplicate results automatically
* One-click extraction
* One-click copy to clipboard
* Clean dark cyber-themed UI
* No console usage required

---

## 🧠 How It Works

The extension reads visible elements from the current Shodan search results page and extracts:

* `li.hostnames.text-secondary`
* `a.title.text-dark[href^="/host/"]`

The extracted values are:

1. Combined (hostnames first, then IP addresses)
2. Deduplicated
3. Displayed inside a popup textarea
4. Ready to copy

This extension does **not** bypass server-side limitations.
It only processes data already rendered in the browser.

---

## 📦 Project Structure

```
.
├── chrome/     → Chrome (Manifest V3) version
├── firefox/    → Firefox version
└── README.md
```

---

## 🦊 Firefox Version

### Load Temporary (Development)

1. Open:

   ```
   about:debugging
   ```
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select `manifest.json`

---

## 🌐 Chrome Version

### Load Unpacked

1. Open:

   ```
   chrome://extensions/
   ```
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the `chrome/` folder

---

## 💉 console.log

You can use the following javascript code in the console log as an alternative to the extension.

```javascript
const hostnames = Array.from(document.querySelectorAll('li.hostnames.text-secondary'))
    .map(el => el.textContent.trim());
const ipAddresses = Array.from(document.querySelectorAll('a.title.text-dark[href^="/host/"]'))
    .map(el => el.textContent.trim());
const allValues = [...hostnames, ...ipAddresses];
console.log(allValues.join('\n'));
```

## 🎨 UI Design

The extension uses a dark non-pure-black background with neon cyan accents to create a minimal cyber aesthetic.

Design goals:

* Clean
* Minimal
* Functional
* No clutter

---

## 🚀 Use Cases

* Quickly collecting IP addresses from visible results
* Copying hostnames for further analysis
* Simplifying manual data extraction workflow
* Personal OSINT and research tooling

---

## ⚠️ Disclaimer

This extension:

* Does not modify Shodan
* Does not automate requests
* Does not bypass server-side restrictions
* Only extracts data already visible in the browser

Use responsibly and in accordance with the target platform's terms of service.

---

## 🔧 Version

Current Version: 1.0.0
Manifest Version: 3

---

## 🛠 Author

Maintained by: randixploit

---

## 📜 License

MIT License
