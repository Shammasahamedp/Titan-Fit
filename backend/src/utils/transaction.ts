import { randomUUID } from 'crypto';

export function generateTransactionId(prefix: string = 'TXN'): string {
  const timestamp = Date.now(); // current time in ms
  const randomPart = randomUUID().split('-')[0]; // short random string
  return `${prefix}_${timestamp}_${randomPart}`; // e.g., TXN_1717157200000_a1b2c3d4
}