import { Box, Button, SpaceBetween } from '@cloudscape-design/components';

export const TableEmptyState = ({ resource }: { resource: string }) => (
  <Box margin={{ vertical: 'xs' }} textAlign='center' color='inherit'>
    <SpaceBetween size='xs'>
      <div>
        <b>No {resource.toLowerCase()}s</b>
        <Box variant='p' color='inherit'>
          No {resource.toLowerCase()}s associated with this resource.
        </Box>
      </div>
      <Button>Create {resource.toLowerCase()}</Button>
    </SpaceBetween>
  </Box>
);

export const TableNoMatchState = ({ onClearFilter }: { onClearFilter: () => void }) => (
  <Box margin={{ vertical: 'xs' }} textAlign='center' color='inherit'>
    <SpaceBetween size='xs'>
      <div>
        <b>No matches</b>
        <Box variant='p' color='inherit'>
          No matches found for this filter.
        </Box>
      </div>
      <Button onClick={onClearFilter}>Clear filter</Button>
    </SpaceBetween>
  </Box>
);
