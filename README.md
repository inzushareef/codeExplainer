# Code Explainer

A powerful web application that uses AI to explain code snippets in plain English. This tool helps developers and students understand complex code by providing detailed, educational explanations.

## Features

- **Multi-language Support**: Supports multiple programming languages including:
  - JavaScript
  - Python
  - Java
  - C++
  - C#
  - PHP
  - Ruby
  - Go
  - Swift
  - And more...

- **AI-Powered Explanations**: Uses advanced AI to provide:
  - Overall purpose of the code
  - Key functions and their roles
  - Important variables and their purposes
  - Notable patterns and techniques
  - Potential improvements and best practices

- **User-Friendly Interface**:
  - Clean, modern design
  - Syntax-highlighted code input
  - Loading animations
  - Copy-to-clipboard functionality
  - Clear input/output options

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Modern web browser

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd code-explainer
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Select the programming language of your code from the dropdown menu
2. Paste your code into the input field
3. Click the "Explain Code" button
4. Wait for the AI to generate the explanation
5. Read the explanation in the output panel
6. Use the "Copy" button to copy the explanation
7. Use the "Clear" button to reset the input and output

## Technical Details

### Frontend
- Pure JavaScript (ES6+)
- Modern CSS with Flexbox and Grid
- Responsive design
- Markdown formatting for explanations

### Backend
- Express.js server
- CORS enabled
- Proxy server for API requests
- Error handling and logging

### API Integration
- Uses Mistral AI model
- Secure API key handling
- Rate limiting and error handling

## Error Handling

The application includes comprehensive error handling for:
- Empty code input
- API connection issues
- Invalid responses
- Network errors
- Server errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Acknowledgments

- Mistral AI for providing the language model
- Font Awesome for icons
- All contributors and users of the application

## Support

If you encounter any issues or have questions, please:
1. Check the console for error messages
2. Ensure the server is running
3. Verify your internet connection
4. Check if the API key is valid

## Future Enhancements

- Add support for more programming languages
- Implement code syntax highlighting
- Add user authentication
- Save explanation history
- Add export options (PDF, Markdown)
- Implement code formatting
- Add dark/light theme toggle 