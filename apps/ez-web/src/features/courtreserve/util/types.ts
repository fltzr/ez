import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention
const EventType = z.enum([
  'Pickleball Drop-in, Limitations apply',
  'Pickleball League (Adult)',
  'Pickleball Play with the Pro',
  'Pickleball Clinic',
  'Pickleball Drop-In, Weekday, Open-4pm, Unlimited',
  'Pickleball Round Robin',
  'Pickleball Orientation & Skills Assessment',
  'Pickleball  Social',
]);

export const courtreserveEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  reservationId: z.number(),
  number: z.string(),
  uqId: z.string(),
  eventType: EventType,
  eventName: z.string(),
  eventID: z.number(),
  maxMembersOnEvent: z.number(),
  signedMembers: z.number(),
  isFull: z.boolean(),
  allowWaitList: z.boolean(),
  isMemberRegistered: z.boolean(),
  canSignUp: z.boolean(),
  isRegistrationOpen: z.boolean(),
  timeDisplay: z.string(),
});

export type CourtreserveEvent = Partial<z.infer<typeof courtreserveEventSchema>>;

export type EventAPIResponse = {
  events: CourtreserveEvent[];
  total: number;
};
