# Similarity Score Plugin

A browser extension that generates a composite similarity score based on user history and webpage data, using AI to determine how similar the webpage is to the user's interests.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Personalized Score:** Generates a similarity score (0-100) based on user history and webpage content.
- **Privacy-Friendly:** Only processes data locally and does not store any user information.
- **Easy to Use:** Simple popup interface to generate scores for any webpage.
- **AI-Powered:** Utilizes AI to analyze webpage content and user history to provide accurate similarity scores.

## Installation

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/tvenk/similarity-score-plugin.git
   cd similarity-score-plugin
   ```

2. **Set Up the Extension in Your Browser:**
   - **For Chrome:**
     1. Open Chrome.
     2. Go to `chrome://extensions/`.
     3. Enable "Developer mode" by toggling the switch in the top right corner.
     4. Click on "Load unpacked" and select the `similarity-score-plugin` directory.

   - **For Firefox:**
     1. Open Firefox.
     2. Go to `about:debugging#/runtime/this-firefox`.
     3. Click on "Load Temporary Add-on" and select any file in the `similarity-score-plugin` directory (e.g., `manifest.json`).

## Usage

1. **Open the Extension Popup:**
   - Click on the extension icon in your browser's toolbar to open the popup.

2. **Generate a Score:**
   - Click the "Generate Score" button to calculate the similarity score for the current webpage based on your browsing history.

3. **View the Score:**
   - The similarity score will be displayed in the popup.

## Development

1. **Set Up Your Development Environment:**
   - Ensure you have Node.js and npm installed.
   - Install dependencies:
     ```sh
     npm install
     ```

2. **Build and Test:**
   - Run the build script to compile the extension:
     ```sh
     npm run build
     ```
   - Load the built extension into your browser as described in the [Installation](#installation) section.

3. **Contribute:**
   - Fork the repository and create a new branch for your feature or fix.
   - Make your changes and ensure they are well-documented.
   - Submit a pull request for review.

## Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
