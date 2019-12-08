import TicketType, { TicketTypeSchema } from "./ticketType.model";
import Event, { EventSchema } from "../event/event.model";
export default class TicketTypeService {
  public createTicketType = async (data: TicketTypeSchema): Promise<any> => {
    console.log("We are here o ");
    const newTicketType = new TicketType({
      eventId: data.eventId,
      ticketType: data.ticketType,
      numberOfTickets: data.numberOfTickets,
      price: data.price
    });

    try {
      const registeredEvent = await Event.exists({
        eventId: data.eventId
      });
      if (!registeredEvent) {
        return {
          error: true,
          msg: "Event has not been created"
        };
      }
      const ticketType = await newTicketType.save();
      return {
        error: false,
        ticketType
      };
    } catch (error) {
      throw new Error(error);
    }
  };
}
