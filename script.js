const conversationHistory = [];

        function appendMessage(sender, message, messageType) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', messageType);
            if (messageType === 'html-code') {
                messageElement.innerHTML = `<pre>${message}</pre>`;
            } else {
                messageElement.textContent = message;
            }
            chatHistory.appendChild(messageElement);
            userMessageInput.value = '';
            chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom
        }

        function callOpenAI(userMessage) {
            const apiKey = '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';
            const apiUrl = 'https://api.openai.com/v1/chat/completions';

            conversationHistory.push({ role: 'user', content: userMessage });

            const requestBody = {
                model: 'gpt-3.5-turbo-1106', messages: conversationHistory, temperature: 0.2 };fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            const assistantMessage = data.choices[0].message.content;
            const messageType = userMessage.toLowerCase().includes('html') ? 'html-code' : 'ai-message';
            appendMessage('AI', assistantMessage, messageType);
            conversationHistory.push({ role: 'assistant', content: assistantMessage });
        })
        .catch(error => console.error('Error calling OpenAI API:', error));
    }

    function sendMessage() {
        const userMessage = userMessageInput.value;
        if (userMessage.trim() === '') return; // Don't send empty messages
        const messageType = userMessage.toLowerCase().includes('html') ? 'html-code' : 'user-message';
        appendMessage('User', userMessage, messageType);
        callOpenAI(userMessage);
    }

    function startNewConversation() {
    const userMessages = Array.from(document.querySelectorAll('.user-message'));
        
        if (userMessages.length > 0) {
            alert('✅ | New Conversation Created');
            conversationHistory.length = 0;
            chatHistory.innerHTML = '<h4>Ask Ai Anything, Ai have everything!</h4>';
        } else {
            alert('❎ | Creating new conversation failed: Chat history is clear, no user message detected.');
        }
    }

    function promptSaveConversation() {
        const name = prompt('Enter a name for the conversation:');
        if (name === null) {
            // User clicked cancel
            return;
        }
        
        const savedConversations = JSON.parse(localStorage.getItem('savedConversations')) || [];
        const existingConversation = savedConversations.find(conv => conv.name === name);

        if (existingConversation) {
            alert('Conversation with this name already exists. Please choose a different name.');
        } else {
            saveConversation(name);
            alert('Conversation saved successfully!');
        }
    }

    function saveConversation(name) {
        if (conversationHistory.length === 0) {
            alert('Cannot save an empty conversation.');
            return;
        }

        const savedConversations = JSON.parse(localStorage.getItem('savedConversations')) || [];
        savedConversations.push({ name, conversation: conversationHistory });
        localStorage.setItem('savedConversations', JSON.stringify(savedConversations));
        loadSavedConversations();
    }

    function loadSavedConversations() {
    const savedConversations = JSON.parse(localStorage.getItem('savedConversations')) || [];
    const savedConversationsDiv = document.getElementById('saved-conversations');
    
    // Display the total number of saved conversations
    const totalConversations = savedConversations.length;
    const savedConversationsTitle = document.createElement('h3');
    savedConversationsTitle.textContent = `Total Saved (${totalConversations})`;
    savedConversationsDiv.appendChild(savedConversationsTitle);

    savedConversations.forEach((item, index) => {
        const saveButton = document.createElement('button');
        saveButton.innerText = `${item.name || 'Conversation'} #${index + 1}`;
        saveButton.onclick = () => loadConversation(item.conversation);

        savedConversationsDiv.appendChild(saveButton);
    });
}

    function loadConversation(conversation) {
        conversationHistory.length = 0;
        conversation.forEach(msg => conversationHistory.push(msg));
        chatHistory.innerHTML = '';
        conversation.forEach(msg => appendMessage(msg.role, msg.content, msg.role === 'user' ? 'user-message' : 'ai-message'));
        closeSavedConversationsModal();
    }

    function openSavedConversations() {
        document.getElementById('saved-conversations-modal').style.display = 'block';
    }

    function closeSavedConversationsModal() {
        document.getElementById('saved-conversations-modal').style.display = 'none';
    }

    const chatHistory = document.getElementById('chat-history');
    const userMessageInput = document.getElementById('user-message');
    
    window.onload = function () {
        loadSavedConversations();
    };
    function createConversationButton(item, index) {
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.alignItems = 'center';

            const saveButton = document.createElement('button');
            saveButton.innerText = `${item.name || 'Conversation'} #${index + 1}`;
            saveButton.onclick = () => loadConversation(item.conversation);

            
            
        }
        console.info("Blake Cyphrus is the creator or Prince? balakajan");
        console.info("Api: GPT-3.5-1106");
        console.info("api from OpenAi 😤");
        console.info("Html, css, JavaScript Only hkakskskskakskksks");
        console.warn("oh bat ka tumingin dito sa console?!?!");
        console.log("created time&date: november 12, 2023 @ time 8am");
