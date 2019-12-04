import Event, { EventSchema } from "./event.model";

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

export default class EventController {
  createEvent = async (data: EventSchema): Promise<any> => {
    const newEvent = new Event({
      title: data.title,
      description: data.description,
      location: data.location,
      category: data.category,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      time: data.time,
      noOfAttendees: data.noOfAttendees,
      eventUrl: data.eventUrl,
      imageUrl: data.imageUrl,
      authorId: data.authorId
    });
    try {
      const validEvent = await Event.exists({ title: data.title });
      console.log(validEvent);
      if (validEvent) {
        return {
          error: true,
          msg: " Event has already been created"
        };
      }
      const event = await newEvent.save();
      return {
        error: false,
        event
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  getAllEvent = async (callback): Promise<any> => {
    await Event.find({}, (err: any, res: any) => {
      if (err) {
        return callback(err);
      } else {
        callback(err, res);
      }
    });
  };

  getOneEventById = async (id, callback): Promise<any> => {
    await Event.findOne({ eventId: id }, (err: any, res: any) => {
      if (err) {
        return callback(err);
      } else {
        callback(err, res);
      }
    });
  };

  updateEvent = async (
    eventId,
    title,
    description,
    location,
    category,
    startDate,
    endDate,
    time,
    noOfAttendees,
    eventUrl,
    imageUrl,
    authorId,
    status,
    callback
  ): Promise<any> => {
    await Event.findOneAndUpdate(
      {
        eventId
      },
      {
        $set: {
          title,
          description,
          location,
          category,
          startDate,
          endDate,
          time,
          noOfAttendees,
          eventUrl,
          imageUrl,
          authorId,
          status
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

  deleteEvent = async (id, callback) => {
    Event.findOneAndDelete({ eventId: id }, (err, res: EventSchema) => {
      console.log("We are here");
      if (err) {
        return callback(err);
      }
      return callback(err, res);
    });
  };
}
