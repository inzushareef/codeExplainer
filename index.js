document.addEventListener('DOMContentLoaded', function() {
    const explainBtn = document.getElementById('explain-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const codeInput = document.getElementById('code-input');
    const outputPlaceholder = document.getElementById('output-placeholder');
    const loading = document.getElementById('loading');
    const outputContent = document.getElementById('output-content');
    const languageSelector = document.getElementById('language-selector');
    
    // Handle code explanation request
    explainBtn.addEventListener('click', async function() {
        const code = codeInput.value.trim();
        const language = languageSelector.value;
        
        if (!code) {
            alert('Please enter some code to explain!');
            return;
        }
        
        // Show loading animation
        outputPlaceholder.style.display = 'none';
        outputContent.style.display = 'none';
        loading.style.display = 'flex';
        
        try {
            // Create the system prompt based on the selected language
            const systemPrompt = `You are an expert code explainer. Explain the following ${language} code in a clear, concise, and educational way. Focus on:
1. The overall purpose of the code
2. Key functions and their roles
3. Important variables and their purposes
4. Any notable patterns or techniques used
5. Potential improvements or best practices

Format your response in a clear, structured way using markdown.`;

            // Make the API call through our proxy
            const response = await fetch('/api/explain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "mistralai/Mistral-7B-Instruct-v0.2",
                    messages: [
                        {
                            role: "system",
                            content: systemPrompt,
                        },
                        {
                            role: "user",
                            content: code,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 1000,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from API');
            }

            const explanation = data.choices[0].message.content;
            
            // Display the explanation
            loading.style.display = 'none';
            outputContent.style.display = 'block';
            outputContent.innerHTML = formatExplanation(explanation);
            outputContent.classList.add('fade-in');
            copyBtn.disabled = false;
            
        } catch (error) {
            console.error('Detailed Error:', error);
            loading.style.display = 'none';
            outputContent.style.display = 'block';
            outputContent.innerHTML = `<div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Sorry, there was an error generating the explanation. Please try again.</p>
                <p class="error-details">Error: ${error.message}</p>
                <p class="error-details">Please check if:</p>
                <ul>
                    <li>You have a stable internet connection</li>
                    <li>The API service is available</li>
                    <li>Your API key is valid</li>
                    <li>The proxy server is running</li>
                </ul>
            </div>`;
            copyBtn.disabled = true;
        }
    });
    
    // Clear the input and output
    clearBtn.addEventListener('click', function() {
        codeInput.value = '';
        outputContent.innerHTML = '';
        outputContent.style.display = 'none';
        outputPlaceholder.style.display = 'flex';
        copyBtn.disabled = true;
    });
    
    // Copy explanation to clipboard
    copyBtn.addEventListener('click', function() {
        const range = document.createRange();
        range.selectNode(outputContent);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        
        setTimeout(function() {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });
    
    // Format the explanation text with Markdown
    function formatExplanation(text) {
        // Basic formatting for headers, bold, code, etc.
        return text
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre><code>$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>');
    }
});