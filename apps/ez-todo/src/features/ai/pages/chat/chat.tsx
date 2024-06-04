import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  ColumnLayout,
  Header,
  Select,
  SpaceBetween,
  StatusIndicator,
} from '@cloudscape-design/components';
import { useEffectOnce } from 'react-use';

import { useAppLayoutStore } from '@ez/web-state-management';
import styles from './styles.module.scss';
import { ChatTextarea } from '../../components/chat-textarea/chat-textarea';
import { Message } from '../../components/message/message';

type Messages = {
  from: 'user' | 'ai';
  content: string;
}[];

const FakeMessageHistory: Messages = [];
//   {
//     from: 'user',
//     content: 'Hello, Ai!',
//   },
//   {
//     from: 'ai',
//     content: 'Hi there! How can I assist you today?',
//   },
//   {
//     from: 'user',
//     content: 'How are you?',
//   },
//   {
//     from: 'ai',
//     content: 'I am doing well, thank you for asking!',
//   },
//   {
//     from: 'user',
//     content: 'Hello, Ai!',
//   },
//   {
//     from: 'ai',
//     content: 'Hi there! How can I assist you today?',
//   },
//   {
//     from: 'user',
//     content: 'How are you?',
//   },
//   {
//     from: 'ai',
//     content: 'I am doing well, thank you for asking!',
//   },
//   {
//     from: 'user',
//     content: 'Hello, Ai!',
//   },
//   {
//     from: 'ai',
//     content: 'Hi there! How can I assist you today?',
//   },
//   {
//     from: 'user',
//     content: 'How are you?',
//   },
//   {
//     from: 'ai',
//     content: 'I am doing well, thank you for asking!',
//   },
//   {
//     from: 'user',
//     content: 'Hello, Ai!',
//   },
//   {
//     from: 'ai',
//     content: 'Hi there! How can I assist you today?',
//   },
//   {
//     from: 'user',
//     content: 'How are you?',
//   },
//   {
//     from: 'ai',
//     content: 'I am doing well, thank you for asking!',
//   },
//   {
//     from: 'user',
//     content: 'Hello, Ai!',
//   },
//   {
//     from: 'ai',
//     content: 'Hi there! How can I assist you today?',
//   },
//   {
//     from: 'user',
//     content: 'How are you?',
//   },
//   {
//     from: 'ai',
//     content: 'I am doing well, thank you for asking!',
//   },
//   {
//     from: 'user',
//     content: 'Hello, Ai!',
//   },
//   {
//     from: 'ai',
//     content: 'Hi there! How can I assist you today?',
//   },
//   {
//     from: 'user',
//     content: 'How are you?',
//   },
//   {
//     from: 'ai',
//     content: 'I am doing well, thank you for asking!',
//   },
// ];

const Chat = () => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const bottomChatWindowRef = useRef<HTMLDivElement>(null);
  const { setContentLayout } = useAppLayoutStore();
  const [messages, setMessages] = useState(FakeMessageHistory);

  const handleSendMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        from: 'user',
        content: message,
      },
    ]);
  };

  useEffectOnce(() => {
    setContentLayout(undefined);

    return () => {
      setContentLayout('default');
    };
  });

  useEffect(() => {
    if (bottomChatWindowRef.current) {
      bottomChatWindowRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <Header variant='h2'>Open LLM Chat</Header>
      <div role='presentation' className={styles['chat-container']}>
        <div className={styles['chat-window']} ref={chatWindowRef}>
          {messages.length > 0 ? (
            <ColumnLayout>
              {messages.map((message, index) => (
                <Message key={index} from={message.from} content={message.content} />
              ))}
              <div ref={bottomChatWindowRef} />
            </ColumnLayout>
          ) : (
            <div className={styles['chat-welcome-message']}>
              <Box variant='awsui-value-large'>Open LLM Chat</Box>
            </div>
          )}
        </div>
        <div className={styles['chat-input']}>
          <SpaceBetween direction='vertical' size='m'>
            <ChatTextarea onSend={handleSendMessage} />
            <Box margin={{ bottom: 'xl' }}>
              <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Select
                  selectedOption={{ value: 'open-ai_chat-gpt-3.5', label: 'OpenAI GPT-3.5' }}
                  options={[
                    {
                      label: 'OpenAI Family',
                      options: [
                        {
                          value: 'open-ai_chat-gpt-3.5',
                          label: 'OpenAI GPT-3.5',
                        },
                        {
                          value: 'open-ai_chat-gpt-4',
                          label: 'OpenAI GPT-4',
                        },
                        {
                          value: 'open-ai_chat-gpt-5',
                          label: 'OpenAI GPT-5',
                        },
                        {
                          value: 'open-ai_chat-gpt-6',
                          label: 'OpenAI GPT-6',
                        },
                        {
                          value: 'open-ai_chat-gpt-7',
                          label: 'OpenAI GPT-7',
                        },
                      ],
                    },
                  ]}
                />

                <SpaceBetween size='xs' direction='horizontal'>
                  <Button variant='inline-icon' iconName='settings' />
                  <StatusIndicator type='success'>Connected</StatusIndicator>
                </SpaceBetween>
              </div>
            </Box>
          </SpaceBetween>
        </div>
      </div>
    </>
  );
};

export const Component = Chat;
