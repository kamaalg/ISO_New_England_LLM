'use client';

import { useState } from 'react';

import { PreviewMessage, ThinkingMessage } from './message';
import { useScrollToBottom } from './use-scroll-to-bottom';
import { MultimodalInput } from './multimodal-input';
import { OverviewAnalytics } from './overview-analytics';
import { ChatHeader } from './chat-header';
import { AnalyticsHeader } from './analytics-header';
import { Textarea } from './ui/textarea';

export function ChatAnalytics() {
  const [messages, setMessages] = useState<
    Array<{ id: string; role: string; content: string; type?: string }>
  >([]);
  const [input, setInput] = useState('');
  const [expectedInput, setExpectedInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'manual' | 'fetch'>('manual'); // Mode toggle

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let expectedOutput = expectedInput;

    // if (mode === 'fetch') {
    //   // Fetch the expected output if in fetch mode
    //   expectedOutput = await fetchExpectedOutput(userMessage.content);
    // }
    const botResponses = [
      {
        id: `${Date.now()}-expected`,
        role: 'bot',
        content: expectedOutput,
        type: 'Expected',
      },
      {
        id: `${Date.now() + 1}-actual`,
        role: 'bot',
        content: await fetchBotResponse(input,expectedOutput),
        type: 'Actual',
      },
    ];

    setMessages((prev) => [...prev, ...botResponses]);
    setIsLoading(false);
  };

  const fetchBotResponse = async (userQuery, expectedOutput) => {
    const apiUrl = 'http://localhost:3000/testing/test_model';
    const body = {
      expected_output: expectedOutput,
      user_input: userQuery,
    };
    console.log("Results from testing",userQuery)

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Convert body to JSON
      });

      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();
      return json.message;
    } catch (error) {
      console.error(`Error fetching bot response for query "${userQuery}":`, error);
      return 'Error fetching bot response.';
    }
  };


  const fetchExpectedOutput = async (query: string) => {
    const searchURL = `http://localhost:3000/frontend/get_expected?query=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(searchURL);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      return json.expectedMessage;
    } catch (error) {
      console.error(`Error fetching expected output for query "${query}":`, error);
      return 'Error fetching expected output.';
    }
  };

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background overflow-y-scroll">
      <ChatHeader /> {/* Static header */}
      <div className="flex flex-col border border-gray-300 rounded-lg shadow-lg p-4 bg-card text-card-foreground w-full max-w-4xl mx-auto mt-4 mb-6 h-svh">
        {/* Analytics Header */}
        <AnalyticsHeader mode={mode} setMode={setMode} />
        
        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
        >
          {messages.length === 0 && <OverviewAnalytics />} {/* Show overview if no messages */}

          {messages.map((message, index) => (
            <PreviewMessage
              key={message.id}
              message={{
                ...message,
                content: `[${message.type ?? 'User'}] ${message.content}`,
              }}
              isLoading={isLoading && messages.length - 1 === index}
            />
          ))}

          {isLoading && <ThinkingMessage />}
          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>

      {/* Input Form */}
      <form
        className="sticky bottom-0 flex flex-col gap-4 mx-auto px-4 bg-background pb-4 md:pb-6 w-full md:max-w-3xl"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission behavior

          // Validation logic
          if (!input.trim() || (mode === 'manual' && !expectedInput.trim())) {
            alert("Please fill out all required fields.");
            return;
          }

          // Call handleSubmit if validation passes
          handleSubmit(e);
        }}
      >
        {/* User Input */}
        <MultimodalInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Expected Output Input (Only in Manual Mode) */}
        {mode === 'manual' && (
          <div className="relative flex flex-col gap-4">
            <Textarea
              placeholder="Enter expected output..."
              value={expectedInput}
              onChange={(e) => setExpectedInput(e.target.value)}
              className="min-h-[24px] max-h-[calc(75vh)] overflow-hidden resize-none rounded-xl text-base bg-muted border"
              rows={1}
            />
          </div>
        )}
      </form>
      </div>
      {/* Analytics/Testing Tools */}
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto h-svh">
        <h2 className="text-xl font-bold">Testing Tools & Metrics</h2>
        <div className="p-4 border border-gray-300 rounded-lg bg-card text-card-foreground shadow-sm">
          <p>Tool 1: Placeholder for analytics tool or metric visualization</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-lg bg-card text-card-foreground shadow-sm">
          <p>Tool 2: Placeholder for testing interface or additional metrics</p>
        </div>
      </div>
    </div>
  );
}