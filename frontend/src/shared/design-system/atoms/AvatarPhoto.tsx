import { Image, type ImageProps } from '@chakra-ui/react';

export type AvatarPhotoProps = ImageProps & {
  size?: string;
};

export function AvatarPhoto({
  src,
  alt,
  size = '16',
  ...restProps
}: AvatarPhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      borderRadius="md"
      border="1px"
      borderColor="gray.100"
      w={size}
      h={size}
      maxW={size}
      {...restProps}
    />
  );
}
