import { BoxProps } from '@chakra-ui/react';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Spacer,
  Stack,
  Textarea,
} from '@frontend/shared/design-system';

export type QuackFormProps = Omit<BoxProps, 'onSubmit'> & {
  error?: Error;
  isLoading: boolean;
  text: string;
  setText: (text: string) => void;
  onSubmit: (data: { text: string }) => void;
  maxLength?: number;
};

export function QuackForm({
  error,
  isLoading,
  text,
  setText,
  onSubmit,
  maxLength = 250,
  ...restProps
}: QuackFormProps) {
  const length = !text ? 0 : text.length;
  const isLengthValid = length <= maxLength;

  return (
    <Box
      p="2"
      borderRadius="md"
      bg="gray.100"
      boxShadow="md"
      mb="4"
      {...restProps}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ text });
        }}
      >
        <FormControl isInvalid={!!error}>
          <Textarea
            bg="white"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            name="comment"
            placeholder="Quack something..."
            disabled={isLoading}
            isRequired
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            pt="2"
          >
            <FormErrorMessage
              m="0"
              alignSelf="flex-start"
            >{`${error}`}</FormErrorMessage>
            <Spacer />
            <Box
              as="span"
              fontSize="sm"
              color={isLengthValid ? 'gray.500' : 'red.500'}
            >
              {length}/{maxLength}
            </Box>
            <Button
              type="submit"
              size="md"
              isLoading={isLoading}
              loadingText="Sending"
              colorScheme="green"
            >
              Quack
            </Button>
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
}
