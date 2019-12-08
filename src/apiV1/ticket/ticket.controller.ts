import Ticket, { TicketSchema } from "./ticket.model";
import { TicketType } from "../ticketType/ticketType.typings";

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

export default class TicketController {
  createTicket = async (data: TicketType): Promise<any> => {
    
    const newTicket = new Ticket({
      ticketTypeId: data.ticketTypeId,
      amount: data.amount,
      userId: data.userId
    });
    try {
      const validEvent = await Ticket.exists({ title: data.title });
      console.log(validEvent);
      if (validEvent) {
        return {
          error: true,
          msg: " Event has already been created"
        };
      }
      const event = await newTicket.save();
      return {
        error: false,
        event
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  getAllTickets = async (callback): Promise<any> => {
    await Ticket.find({}, (err: any, res: any) => {
      if (err) {
        return callback(err);
      } else {
        callback(err, res);
      }
    });
  };

  getOneTicketById = async (id, callback): Promise<any> => {
    await Ticket.findOne({ ticketId: id }, (err: any, res: any) => {
      if (err) {
        return callback(err);
      } else {
        callback(err, res);
      }
    });
  };

  updateTicket = async (ticketId, amount, callback): Promise<any> => {
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

  deleteTicket = async (id, callback) => {
    Ticket.findOneAndDelete({ eventId: id }, (err, res: TicketSchema) => {
      if (err) {
        return callback(err);
      }
      return callback(err, res);
    });
  };
}
