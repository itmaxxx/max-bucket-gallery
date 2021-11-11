import { createHash } from 'crypto';

export const computeSHA256 = (value: string): string => {
  return createHash('sha256').update(value).digest('base64');
}
