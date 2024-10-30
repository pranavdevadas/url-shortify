import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: 'https://urlshortify.site', credentials: "include"})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({})
})