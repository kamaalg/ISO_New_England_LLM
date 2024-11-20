'use client';

import cx from 'classnames';
import { useRef, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner';

import { ArrowUpIcon } from './icons';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

export function MultimodalInput({
  input,
  setInput,
  handleSubmit,
  isLoading,
  className,
}: {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  className?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  return (
    <div className="relative w-full flex flex-col gap-4">
      <Textarea
        ref={textareaRef}
        placeholder="Send a message..."
        value={input}
        onChange={handleInput}
        className={cx(
          'min-h-[24px] max-h-[calc(75vh)] overflow-hidden resize-none rounded-xl text-base bg-muted',
          className,
        )}
        rows={3}
        autoFocus
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            if (isLoading) {
              toast.error('Please wait for the model to finish its response!');
            } else {
              handleSubmit(event);
            }
          }
        }}
      />

      <Button
        className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 border dark:border-zinc-600"
        onClick={(event) => {
          event.preventDefault();
          handleSubmit(event);
        }}
        disabled={input.length === 0 || isLoading}
      >
        <ArrowUpIcon size={14} />
      </Button>
    </div>
  );
}