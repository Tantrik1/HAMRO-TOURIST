export const QUEUES = {
  EMAIL: 'email',
  IMAGE_PROCESSING: 'image-processing',
  DNS_VERIFICATION: 'dns-verification',
  DOMAIN_ACTIVATE: 'domain-activate',
} as const;

export type QueueName = (typeof QUEUES)[keyof typeof QUEUES];
