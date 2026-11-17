# Save Page HTML

A minimal Manifest V3 Chrome extension that saves the current page's rendered HTML (`document.documentElement.outerHTML`) to a local `.html` file.

## Features

- Captures the current rendered DOM of the active tab.
- Prompts you with a **Save As** dialog using the page title as the filename.
- Supports **English** (default) and **Russian** (`Русский`), with your language preference saved locally.
- Zero telemetry, no external requests, and minimal permissions.

## Installation (Load Unpacked)

1. Clone or download this repository.
2. Open `chrome://extensions/` in Chrome (or any Chromium-based browser).
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the repository folder.

## Usage

1. Navigate to any web page you want to save.
2. Click the **Save Page HTML** extension icon in the browser toolbar.
3. (Optional) Choose your preferred language (`English` or `Русский`) from the selector.
4. Click **Download HTML** and choose where to save the file.

> Note: Browser-restricted pages (such as `chrome://` URLs or the Chrome Web Store) cannot be scripted by extensions.

## Permissions

- `activeTab` — Access the currently active tab only when you click the extension and press download.
- `scripting` — Read `document.documentElement.outerHTML` from the active tab.
- `downloads` — Trigger the browser's file download dialog.
- `storage` — Persist your selected UI language (`chrome.storage.local`).

## License

[MIT](LICENSE)
