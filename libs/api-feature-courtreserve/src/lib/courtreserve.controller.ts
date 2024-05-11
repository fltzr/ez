import { Request, Response, type NextFunction } from 'express';
import { isNativeError } from 'util/types';
import { logger } from '@ez/core';
import { fetchCourtreseveEvents } from './courtreserve.service';
import type { CourtreserveEventType } from './courtreserve.types';

export const eventsController = async (
  request: Request,
  response: Response,
) => {
  try {
    const {
      eventType,
      eventName,
      eventId,
      skillLevel,
      timeDisplay,
      dayOfWeek,
    } = request.query;

    logger.info(
      `Received request to fetch courtreserve events with query params: ${JSON.stringify(
        request.query,
      )}`,
    );

    const events = await fetchCourtreseveEvents({
      eventType: eventType as CourtreserveEventType,
      eventName: eventName as string,
      eventId: eventId as string,
      skillLevel: skillLevel as string,
      timeDisplay: timeDisplay as string,
      dayOfWeek: dayOfWeek as string,
    });
    return response.status(200).json(events);
  } catch (error) {
    if (isNativeError(error)) {
      logger.error(error);
      return response.status(500).json({ error: error.message });
    }

    logger.error(error);
    return response.status(500).json({ error: 'An unexpected error occurred' });
  }
};
