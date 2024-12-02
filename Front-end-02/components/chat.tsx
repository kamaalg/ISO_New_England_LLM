'use client';

import { useState} from 'react';

import { ChatHeader } from './chat-header';
import { PreviewMessage, ThinkingMessage } from './message';
import { useScrollToBottom } from './use-scroll-to-bottom';
import { MultimodalInput } from './multimodal-input';
import { Overview } from './overview';

export function Chat() {
  const [messages, setMessages] = useState<
    Array<{ id: string; role: string; content: string; partialContent?: string }>
  >([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = {
      id: `${Date.now()}`, // Generate a simple unique ID
      role: 'user',
      content: input,
    };

    // Append user message
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate a chatbot response with @echo functionality
    //setTimeout(async () => {
    //const botResponse = {
    //  id: `${Date.now() + 1}`,
    //  role: 'bot',
    //  content: `@echo ${await fetchBotResponse(userMessage.content)}`, // Fetch bot response and prepend @echo
    //  partialContent: '', // For gradual appearance
    //};
    //
      // Append bot response with gradual typing effect
    //setMessages((prev) => [...prev, botResponse]);
    //setIsLoading(false);
    //simulateTypingEffect(botResponse.id, botResponse.content);
    //}, 1000); // Simulate a 1-second delay
    setTimeout(async () => {
      const botResponse = {
        id: `${Date.now() + 1}`,
        role: 'bot',
        content: await fetchBotResponse(userMessage.content), // Fetch bot response
        partialContent: '', // For gradual appearance
      };

      // Append bot response with gradual typing effect
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
      simulateTypingEffect(botResponse.id, botResponse.content);
    }, 1000); // Simulate a 1-second delay
  };

  // Function to fetch bot response
  const fetchBotResponse = async (query: string) => {
    const searchURL = `http://localhost:3000/frontend/get_query?query=${encodeURIComponent(query)}`; // Create a new endpoint for fetching bot responses
  
    try {
      const response = await fetch(searchURL);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      return json.message;
    } catch (error) {
      console.error(`Error fetching bot response for query "${query}":`, error);
      throw error;
    }
  };

  // Function to simulate typing effect
  const simulateTypingEffect = (messageId: string, fullContent: string) => {
    let currentIndex = 0;
  
    const typingInterval = setInterval(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === messageId
            ? {
                ...message,
                partialContent: fullContent.slice(0, currentIndex + 3),
              }
            : message,
        ),
      );
  
      currentIndex++;
  
      if (currentIndex === fullContent.length) {
        clearInterval(typingInterval);
      }
    }, 0); // Reduce to 0ms for maximum speed
  };

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <ChatHeader /> {/* Static header */}
      <div
        ref={messagesContainerRef}
        className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
      >
        {messages.length === 0 && <Overview />} {/* Show overview if no messages */}

        {messages.map((message, index) => (
          <PreviewMessage
            key={message.id}
            message={{
              ...message,
              content: message.partialContent ?? message.content,
            }}
            isLoading={isLoading && messages.length - 1 === index}
          />
        ))}

        {isLoading && (
          <ThinkingMessage /> /* Show thinking message while bot is responding */
        )}

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>
      <form
        className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl"
        onSubmit={handleSubmit}
      >
        <MultimodalInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}