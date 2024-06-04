import { Box, Container, Icon, SpaceBetween } from '@cloudscape-design/components';

import styles from './styles.module.scss';
import { OpenAiSvg } from '../open-ai-svg';

type MessageProps = {
  from: 'user' | 'ai';
  content: string;
};

const UserMessage = ({ content }: { content: string }) => (
  <div className={styles['user-message']}>
    <Box float='right' margin={{ vertical: 's' }}>
      <Container disableContentPaddings>
        <Box padding={{ vertical: 's', horizontal: 'l' }} variant='div'>
          {content}
        </Box>
      </Container>
    </Box>
  </div>
);

const AiMessage = ({ content }: { content: string }) => (
  <div className={styles['ai-message']}>
    <Box float='left' display='inline' margin={{ vertical: 's' }}>
      <SpaceBetween direction='horizontal' size='m'>
        <Icon svg={<OpenAiSvg />} size='medium' variant='disabled' />
        <Box variant='div'>{content}</Box>
      </SpaceBetween>
    </Box>
  </div>
);

export const Message = ({ from, content }: MessageProps) => {
  return from === 'user' ? <UserMessage content={content} /> : <AiMessage content={content} />;
};
