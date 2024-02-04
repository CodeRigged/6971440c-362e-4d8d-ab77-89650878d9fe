import server from "@/plugins/axios";
import { defineStore } from "pinia";

type Venue = {
  id: String;
  name: String;
  contentUrl: String;
  live: true;
  direction: String;
};

type Artist = [
  {
    id: String;
    name: String;
    _id: {
      $oid: String;
    };
  }
];

type Event = {
  _id: String;
  title: String;
  flyerFront: String;
  attending: Number;
  date: String;
  startTime: String;
  endTime: String;
  contentUrl: String;
  venue: Venue;
  artists: Artist[];
  city: String;
  country: String;
  private: Boolean;
};

type State = {
  events: Event[];
  isLoading: Boolean;
};

export const useEventsStore = defineStore("customers", {
  state: (): State => ({
    events: [],
    isLoading: false,
  }),
  actions: {
    async fetchEvents(): Promise<void> {
      this.isLoading = true;
      try {
        const fetchRequest: Promise<Event[]> = server.get(
          "/data/london-events.json"
        );

        this.events = await fetchRequest;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },
});
