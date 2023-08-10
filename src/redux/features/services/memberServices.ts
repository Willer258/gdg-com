import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => "/members",

      providesTags: [{ type: "members", id: "LIST" }],
    }),
    getOneMember: builder.query({
      query: (id:string) =>`/members/${id}`,

      providesTags: [{ type: "events", id: "LIST" }],
    }),
    addMember: builder.mutation({
        query: (initialMember) => ({
          url: "/members",
          method: "POST",
          body: {
            ...initialMember,
          },
        }),
        invalidatesTags: ["members"],
      }),

      editMember: builder.mutation({
        query: (Member: any) => ({
          url: `/members/${Member.id}`,
          method: "PATCH",
          body: {
            ...Member,
          },
        }),
        invalidatesTags: ["members"],
      }),

      deleteMember: builder.mutation({
        query: ({ id }) => ({
          url: `/members/${id}`,
          method: "DELETE",
          body: { id },
        }),
        invalidatesTags: ["members"],
      }),
 
  }),
});

export const {
  useGetMembersQuery,
  useGetOneMemberQuery,
  useAddMemberMutation,
  useEditMemberMutation,
  useDeleteMemberMutation,
 
} = extendedApiSlice;