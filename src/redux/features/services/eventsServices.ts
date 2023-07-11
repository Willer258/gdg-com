import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/events",

      providesTags: [{ type: "events", id: "LIST" }],
    }),
    getOneEvent: builder.query({
      query: (id:string) =>`/events/${id}`,

      providesTags: [{ type: "events", id: "LIST" }],
    }),
    addEvent: builder.mutation({
        query: (initialEvent) => ({
          url: "/events",
          method: "POST",
          body: {
            ...initialEvent,
          },
        }),
        invalidatesTags: ["events"],
      }),

      editEvent: builder.mutation({
        query: (event: any) => ({
          url: `/events/${event.id}`,
          method: "PATCH",
          body: {
            ...event,
          },
        }),
        invalidatesTags: ["events"],
      }),

      deleteEvent: builder.mutation({
        query: ({ id }) => ({ 
          url: `/events/${id}`,
          method: "DELETE",
          body: { id },
        }),
        invalidatesTags: ["events"],
      }),
 
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useEditEventMutation,
  useDeleteEventMutation,
  useGetOneEventQuery,
 
} = extendedApiSlice;