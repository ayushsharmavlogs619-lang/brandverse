// AI Receptionist Chat Widget - Real-time booking and inquiry handling
// Connects to the real backend API for appointments and lead capture

class AIReceptionistChat {
    constructor(config = {}) {
        this.config = {
            apiBaseUrl: config.apiBaseUrl || 'https://edge.brandverse.tech/api',
            clientId: config.clientId || 'default',
            position: config.position || 'bottom-right',
            primaryColor: config.primaryColor || '#3498db',
            welcomeMessage: config.welcomeMessage || 'Hello! I\'m here to help you schedule an appointment or answer any questions.',
            ...config
        };
        
        this.isOpen = false;
        this.currentStep = 'welcome';
        this.conversation = [];
        this.userData = {};
        
        this.init();
    }

    init() {
        this.createChatWidget();
        this.attachEventListeners();
    }

    createChatWidget() {
        // Create chat button
        this.chatButton = document.createElement('div');
        this.chatButton.className = 'ai-chat-button';
        this.chatButton.innerHTML = `
            <i class="fas fa-comments"></i>
            <span class="chat-badge">1</span>
        `;
        
        // Create chat container
        this.chatContainer = document.createElement('div');
        this.chatContainer.className = 'ai-chat-container';
        this.chatContainer.innerHTML = `
            <div class="ai-chat-header">
                <div class="ai-chat-header-content">
                    <i class="fas fa-robot"></i>
                    <span>AI Assistant</span>
                </div>
                <button class="ai-chat-close">&times;</button>
            </div>
            <div class="ai-chat-messages"></div>
            <div class="ai-chat-input-container">
                <input type="text" class="ai-chat-input" placeholder="Type your message...">
                <button class="ai-chat-send">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            <div class="ai-chat-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        // Add styles
        this.addStyles();
        
        // Append to body
        document.body.appendChild(this.chatButton);
        document.body.appendChild(this.chatContainer);
    }

    addStyles() {
        const styles = `
            .ai-chat-button {
                position: fixed;
                ${this.config.position === 'bottom-right' ? 'bottom: 30px; right: 30px;' : 'bottom: 30px; left: 30px;'}
                width: 60px;
                height: 60px;
                background: ${this.config.primaryColor};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                z-index: 10000;
            }

            .ai-chat-button:hover {
                transform: scale(1.1);
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            }

            .ai-chat-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #e74c3c;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }

            .ai-chat-container {
                position: fixed;
                ${this.config.position === 'bottom-right' ? 'bottom: 100px; right: 30px;' : 'bottom: 100px; left: 30px;'}
                width: 380px;
                height: 500px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                display: none;
                flex-direction: column;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .ai-chat-container.open {
                display: flex;
            }

            .ai-chat-header {
                background: ${this.config.primaryColor};
                color: white;
                padding: 15px 20px;
                border-radius: 15px 15px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .ai-chat-header-content {
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 600;
            }

            .ai-chat-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s ease;
            }

            .ai-chat-close:hover {
                background: rgba(255,255,255,0.2);
            }

            .ai-chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f8f9fa;
            }

            .ai-chat-message {
                margin-bottom: 15px;
                display: flex;
                animation: messageSlide 0.3s ease;
            }

            @keyframes messageSlide {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .ai-chat-message.user {
                justify-content: flex-end;
            }

            .ai-chat-message.bot {
                justify-content: flex-start;
            }

            .ai-chat-message-content {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 18px;
                word-wrap: break-word;
            }

            .ai-chat-message.user .ai-chat-message-content {
                background: ${this.config.primaryColor};
                color: white;
                border-bottom-right-radius: 4px;
            }

            .ai-chat-message.bot .ai-chat-message-content {
                background: white;
                color: #333;
                border: 1px solid #e0e0e0;
                border-bottom-left-radius: 4px;
            }

            .ai-chat-message-time {
                font-size: 11px;
                color: #999;
                margin-top: 4px;
            }

            .ai-chat-input-container {
                padding: 15px 20px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                gap: 10px;
                background: white;
                border-radius: 0 0 15px 15px;
            }

            .ai-chat-input {
                flex: 1;
                border: 1px solid #e0e0e0;
                border-radius: 25px;
                padding: 10px 15px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.3s ease;
            }

            .ai-chat-input:focus {
                border-color: ${this.config.primaryColor};
            }

            .ai-chat-send {
                background: ${this.config.primaryColor};
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .ai-chat-send:hover {
                background: #2980b9;
                transform: scale(1.05);
            }

            .ai-chat-send:disabled {
                background: #bdc3c7;
                cursor: not-allowed;
                transform: scale(1);
            }

            .ai-chat-typing-indicator {
                display: none;
                padding: 15px 20px;
            }

            .ai-chat-typing-indicator.active {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .ai-chat-typing-indicator span {
                width: 8px;
                height: 8px;
                background: #999;
                border-radius: 50%;
                animation: typing 1.4s infinite;
            }

            .ai-chat-typing-indicator span:nth-child(2) {
                animation-delay: 0.2s;
            }

            .ai-chat-typing-indicator span:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes typing {
                0%, 60%, 100% {
                    transform: translateY(0);
                }
                30% {
                    transform: translateY(-10px);
                }
            }

            .ai-chat-quick-actions {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 10px;
            }

            .ai-chat-quick-action {
                background: white;
                border: 1px solid ${this.config.primaryColor};
                color: ${this.config.primaryColor};
                padding: 8px 12px;
                border-radius: 15px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .ai-chat-quick-action:hover {
                background: ${this.config.primaryColor};
                color: white;
            }

            @media (max-width: 480px) {
                .ai-chat-container {
                    width: calc(100vw - 40px);
                    height: calc(100vh - 120px);
                    ${this.config.position === 'bottom-right' ? 'right: 20px; left: 20px;' : 'left: 20px; right: 20px;'}
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    attachEventListeners() {
        // Chat button click
        this.chatButton.addEventListener('click', () => {
            this.toggleChat();
        });

        // Close button click
        const closeButton = this.chatContainer.querySelector('.ai-chat-close');
        closeButton.addEventListener('click', () => {
            this.closeChat();
        });

        // Send button click
        const sendButton = this.chatContainer.querySelector('.ai-chat-send');
        sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        // Input enter key
        const input = this.chatContainer.querySelector('.ai-chat-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.chatContainer.classList.add('open');
        this.chatButton.querySelector('.chat-badge').style.display = 'none';
        
        if (this.conversation.length === 0) {
            this.addMessage('bot', this.config.welcomeMessage);
            this.showQuickActions();
        }
    }

    closeChat() {
        this.isOpen = false;
        this.chatContainer.classList.remove('open');
    }

    addMessage(sender, content, options = {}) {
        const messagesContainer = this.chatContainer.querySelector('.ai-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-chat-message ${sender}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'ai-chat-message-content';
        messageContent.innerHTML = content;
        
        messageDiv.appendChild(messageContent);
        
        if (options.time) {
            const timeDiv = document.createElement('div');
            timeDiv.className = 'ai-chat-message-time';
            timeDiv.textContent = options.time;
            messageDiv.appendChild(timeDiv);
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.conversation.push({ sender, content, time: options.time || new Date().toLocaleTimeString() });
    }

    showQuickActions() {
        const lastMessage = this.chatContainer.querySelector('.ai-chat-message:last-child .ai-chat-message-content');
        const quickActions = document.createElement('div');
        quickActions.className = 'ai-chat-quick-actions';
        quickActions.innerHTML = `
            <button class="ai-chat-quick-action" data-action="book">Book Appointment</button>
            <button class="ai-chat-quick-action" data-action="services">Services</button>
            <button class="ai-chat-quick-action" data-action="pricing">Pricing</button>
            <button class="ai-chat-quick-action" data-action="contact">Contact</button>
        `;
        
        lastMessage.appendChild(quickActions);
        
        // Add click handlers
        quickActions.querySelectorAll('.ai-chat-quick-action').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleQuickAction(e.target.dataset.action);
            });
        });
    }

    handleQuickAction(action) {
        switch (action) {
            case 'book':
                this.startBookingFlow();
                break;
            case 'services':
                this.showServices();
                break;
            case 'pricing':
                this.showPricing();
                break;
            case 'contact':
                this.showContactInfo();
                break;
        }
    }

    startBookingFlow() {
        this.currentStep = 'booking_name';
        this.addMessage('bot', 'I\'d be happy to help you book an appointment! What\'s your name?');
    }

    showServices() {
        this.addMessage('bot', 'We offer the following services:\n\n• Consultations\n• Surgical Procedures\n• Non-Surgical Treatments\n• Follow-up Appointments\n\nWhich service are you interested in?');
        this.currentStep = 'service_inquiry';
    }

    showPricing() {
        this.addMessage('bot', 'For pricing information, please visit our pricing page or contact us directly. We offer competitive rates and flexible payment options.');
    }

    showContactInfo() {
        this.addMessage('bot', 'You can reach us at:\n\n📞 Phone: +91 88510 05278\n📧 Email: ayush@brandverse.tech\n\nOr book an appointment directly with me!');
    }

    async sendMessage() {
        const input = this.chatContainer.querySelector('.ai-chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage('user', message);
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Process message based on current step
            await this.processMessage(message);
        } catch (error) {
            console.error('Error processing message:', error);
            this.addMessage('bot', 'I apologize, but I encountered an error. Please try again or contact us directly.');
        }
        
        this.hideTypingIndicator();
    }

    async processMessage(message) {
        switch (this.currentStep) {
            case 'welcome':
                await this.handleWelcomeMessage(message);
                break;
            case 'booking_name':
                await this.handleBookingName(message);
                break;
            case 'booking_phone':
                await this.handleBookingPhone(message);
                break;
            case 'booking_service':
                await this.handleBookingService(message);
                break;
            case 'booking_date':
                await this.handleBookingDate(message);
                break;
            case 'service_inquiry':
                await this.handleServiceInquiry(message);
                break;
            default:
                await this.handleGeneralInquiry(message);
        }
    }

    async handleWelcomeMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('book') || lowerMessage.includes('appointment')) {
            this.startBookingFlow();
        } else if (lowerMessage.includes('service') || lowerMessage.includes('procedure')) {
            this.showServices();
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            this.showPricing();
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone')) {
            this.showContactInfo();
        } else {
            this.addMessage('bot', 'I can help you with booking appointments, learning about our services, pricing information, or contact details. What would you like to know?');
        }
    }

    async handleBookingName(message) {
        this.userData.name = message;
        this.currentStep = 'booking_phone';
        this.addMessage('bot', `Nice to meet you, ${message}! What's your phone number?');
    }

    async handleBookingPhone(message) {
        // Basic phone validation
        const phoneRegex: /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(message)) {
            this.addMessage('bot', 'Please provide a valid phone number. Example: +91 88510 05278');
            return;
        }
        
        this.userData.phone = message;
        this.currentStep = 'booking_service';
        this.addMessage('bot', 'Thank you! What type of service are you interested in? (e.g., consultation, cleaning, whitening, etc.)');
    }

    async handleBookingService(message) {
        this.userData.service = message;
        this.currentStep = 'booking_date';
        this.addMessage('bot', `Great! When would you like to schedule your ${message}? Please provide a preferred date and time.`);
    }

    async handleBookingDate(message) {
        this.userData.requestedTime = message;
        
        // Show loading message
        this.addMessage('bot', 'Let me check our availability for you...');
        
        try {
            // Call the real API to check availability
            const response = await fetch(`${this.config.apiBaseUrl}/${this.config.clientId}/availability`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service: this.userData.service,
                    date: message
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.availableSlots && data.availableSlots.length > 0) {
                    this.showAvailableSlots(data.availableSlots);
                } else {
                    this.addMessage('bot', 'I\'m sorry, but there are no available slots for that time. Would you like me to check other dates?');
                }
            } else {
                throw new Error('API call failed');
            }
        } catch (error) {
            console.error('Error checking availability:', error);
            this.addMessage('bot', 'I\'m having trouble checking our availability right now. Please try again or call us directly at +91 88510 05278.');
        }
    }

    showAvailableSlots(slots) {
        const slotsText = slots.slice(0, 3).map((slot, index) => 
            `${index + 1}. ${new Date(slot.start).toLocaleString()}`
        ).join('\n');
        
        this.addMessage('bot', `I found these available times:\n\n${slotsText}\n\nPlease select a number or let me know if you'd like to see other options.`);
        this.currentStep = 'booking_confirm';
        this.availableSlots = slots;
    }

    async handleServiceInquiry(message) {
        // Log the inquiry
        await this.logInteraction({
            type: 'service_inquiry',
            message: message,
            name: this.userData.name || 'Anonymous',
            phone: this.userData.phone || ''
        });
        
        this.addMessage('bot', `Thank you for your interest in ${message}. Our team will be happy to provide more information. Would you like to book a consultation to discuss this further?`);
        this.currentStep = 'welcome';
    }

    async handleGeneralInquiry(message) {
        // Log the general inquiry
        await this.logInteraction({
            type: 'general_inquiry',
            message: message,
            name: this.userData.name || 'Anonymous',
            phone: this.userData.phone || ''
        });
        
        this.addMessage('bot', 'I understand you\'re interested in learning more. For detailed information, I\'d recommend either booking a consultation or calling us directly at +91 88510 05278. Would you like me to help you schedule an appointment?');
    }

    async logInteraction(interactionData) {
        try {
            await fetch(`${this.config.apiBaseUrl}/${this.config.clientId}/log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...interactionData,
                    channel: 'chat',
                    timestamp: new Date().toISOString()
                })
            });
        } catch (error) {
            console.error('Error logging interaction:', error);
        }
    }

    showTypingIndicator() {
        const indicator = this.chatContainer.querySelector('.ai-chat-typing-indicator');
        indicator.classList.add('active');
    }

    hideTypingIndicator() {
        const indicator = this.chatContainer.querySelector('.ai-chat-typing-indicator');
        indicator.classList.remove('active');
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a chat configuration
    const chatConfig = window.AI_RECEPTIONIST_CONFIG || {};
    window.aiReceptionistChat = new AIReceptionistChat(chatConfig);
});

// Export for manual initialization
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIReceptionistChat;
}
