import { useState } from 'react';
import { Box, Button, Container } from '@cloudscape-design/components';
import Textarea from 'react-textarea-autosize';

import styles from './styles.module.scss';

type ChatTextareaProps = {
  onSend: (message: string) => void;
};

export const ChatTextarea = ({ onSend }: ChatTextareaProps) => {
  const [message, setMessage] = useState('');

  return (
    <Container disableContentPaddings>
      <Box margin={{ horizontal: 'l', vertical: 'm' }}>
        <div className={styles['chat-textarea-container']}>
          <Button disabled iconName='upload' />
          <div className={styles['chat-textarea-outter']}>
            <Textarea
              className={styles['chat-textarea-inner']}
              placeholder='Type a message...'
              minRows={1}
              maxRows={13}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  onSend(message);
                  setMessage('');
                }
              }}
              value={message}
            />
          </div>
          <Button
            iconName='angle-up'
            variant='primary'
            iconAlign='right'
            disabled={!message}
            onClick={(event) => {
              event.preventDefault();
              onSend(message);
              setMessage('');
            }}
          />
        </div>
      </Box>
    </Container>
  );
};
