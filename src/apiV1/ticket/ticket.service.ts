import Ticket, { TicketSchema } from "./ticket.model";
import TicketType from "../ticketType/ticketType.model";
import PagaBusiness from "../transaction/pagaBuildRequest";

// const model = {
//   title,
//   description,
//   location,
//   category,
//   startDate,
//   endDate,
//   time,
//   noOfAttendees,
//   eventUrl,
//   imageUrl,
//   authorId
// };

export default class TicketService {
  createTicket = async (data: TicketSchema): Promise<any> => {
    // Variable inputs
    const { ticketTypeId, userId, numberOfTickets } = data;

    try {
      // Check if the ticketType exist
      const validTicketType = await TicketType.findOne({
        _id: ticketTypeId
      });

      console.log(`The valid ticket ${validTicketType}`);

      // Response when the ticketType does not exist
      if (validTicketType === null) {
        return {
          error: true,
          msg: " Ticket type does not exist"
        };
      }

      // Destructuring the result from validTicketTypes
      const { price, eventId, numberOfTicketsAvailable } = validTicketType;

      // Create new ticket
      const newTicket = new Ticket({
        ticketTypeId,
        price,
        userId,
        eventId,
        numberOfTickets
      });

      console.log(`The ticket ordering ${numberOfTicketsAvailable}`);

      // Check the number of tickets available
      if (numberOfTicketsAvailable < newTicket.numberOfTickets) {
        return {
          error: true,
          msg: `The number of tickets available is ${numberOfTicketsAvailable}`
        };
      }

      // Creates ticket
      const event = await newTicket.save();

      return {
        error: false,
        event
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  getAllTickets = async (callback: any): Promise<any> => {
    await Ticket.find({}, (err: any, res: any) => {
      if (err) {
        return callback(err);
      } else {
        callback(err, res);
      }
    });
  };

  getOneTicketById = async (id: string, callback: any): Promise<any> => {
    await Ticket.findOne({ ticketId: id }, (err: any, res: any) => {
      if (err) {
        return callback(err);
      } else {
        callback(err, res);
      }
    });
  };

  updateTicket = async (
    ticketId: string,
    amount: number,
    callback: any
  ): Promise<any> => {
    await Ticket.findOneAndUpdate(
      {
        ticketId
      },
      {
        $set: {
          amount
        }
      },
      { upsert: true, new: true },
      (err, res) => {
        if (err) {
          return callback(err);
        }
        callback(err, res);
      }
    );
  };

  deleteTicket = async (id: string, callback: any) => {
    Ticket.findOneAndDelete({ eventId: id }, (err, res) => {
      if (err) {
        return callback(err);
      }
      return callback(err, res);
    });
  };
}
