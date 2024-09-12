import { Icon, TransparentButton, type TransparentButtonProps } from '../atoms';
import { SyncIcon } from '../icons';

export type ReloadButtonProps = TransparentButtonProps & {
  isLoading?: boolean;
};

export function ReloadButton({ isLoading, ...restProps }: ReloadButtonProps) {
  return (
    <TransparentButton bg="gray.100" {...restProps}>
      <Icon as={SyncIcon} isSpinning={isLoading} mr="2" fontSize="xs" />
      Reload
    </TransparentButton>
  );
}
