import server from "@/plugins/axios";
import { formatDate } from "@/utils";
import { defineStore } from "pinia";

type Venue = {
  id: string;
  name: string;
  contentUrl: string;
  live: true;
  direction: string;
};

type Artist = [
  {
    id: string;
    name: string;
    _id: {
      $oid: string;
    };
  }
];

type Event = {
  _id: string;
  title: string;
  flyerFront: string;
  attending: number;
  date: string;
  startTime: string;
  endTime: string;
  contentUrl: string;
  venue: Venue;
  artists: Artist[];
  city: string;
  country: string;
  private: boolean;
};

type State = {
  cart: Event[];
  events: Event[];
  isLoading: boolean;
  search?: string;
  descending: boolean;
};

export const useEventsStore = defineStore("customers", {
  state: (): State => ({
    cart: [],
    events: [],
    isLoading: false,
    search: undefined,
    descending: false,
  }),
  getters: {
    earliestAndLatestEventDates({ events }) {
      const dates = events.map((e) => new Date(e.date).getTime());

      return `
      ${formatDate(Math.min(...dates), true)} -
      ${formatDate(Math.max(...dates), true)}`;
    },

    eventsGroupedByDate({ events, search }) {
      const groupedEvents = events.reduce(
        (group, event) => {
          if (
            search &&
            !event.title.toLowerCase().includes(search.toLowerCase())
          ) {
            return group;
          }
          const date = event.date;

          if (!group[date]) {
            group[date] = [];
          }
          group[date].push(event);
          return group;
        },
        {} as {
          [date: string | number]: Event[];
        }
      );
      return Object.keys(groupedEvents).map((date) => {
        return {
          date,
          events: groupedEvents[date],
        };
      });
    },
  },
  actions: {
    async fetchEvents(): Promise<void> {
      this.isLoading = true;
      try {
        const fetchRequest = await server.get<Event[]>(
          "/data/london-events.json"
        );

        this.events = fetchRequest.data.map((e) => {
          e.venue.direction = `https://www.google.com/maps/dir/${e.venue.name}`;
          return e;
        });
        this.sortEvents();
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },

    sortEvents() {
      this.events = this.events.sort((a, b) => {
        if (this.descending) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
      });
    },

    addToCart(event: Event) {
      const alreadyInCart = this.cart.some((e) => e._id === event._id);
      if (!alreadyInCart) {
        const eventId = this.events.findIndex((e) => e._id === event._id);
        this.events.splice(eventId, 1);
        this.cart.push(event);
      }
    },
    removeFromCart(event: Event) {
      const eventId = this.cart.findIndex((e) => e._id === event._id);
      this.events.push(event);
      this.cart.splice(eventId, 1);
      this.sortEvents();
    },
    setDescending(descending: boolean) {
      this.descending = descending;
    },
  },
});

export type { Event, Artist, Venue };
