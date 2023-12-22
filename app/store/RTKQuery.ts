import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import axios, { AxiosHeaders } from "axios";
import { Server_Url } from "../constants";
import KeyChain from 'react-native-keychain';


const getHeadersCookie = async () => {
    const token = await AsyncStorage.getItem('token')
    return { 'Content-Type': 'application/json', 'Cookie': token as string }
}
const headers = { 'Content-Type': 'application/json' }

const responseHandler = (response: any) => {
    AsyncStorage.setItem('token', response.headers.map['set-cookie'])
    return response.json()
}

const fileResponseHandler = (response: Response) => {
    return response.json()
}

export const apiOne = createApi({
    reducerPath: 'apiOne',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.8:12000', credentials: 'include',
        prepareHeaders: async (headers) => {
            const token: string = await AsyncStorage.getItem('token') as string
            const creds = await KeyChain.getGenericPassword()
            if (creds) {
                headers.set('Cookie', creds.password)
            }
            if (!headers.has("Content-Type")) {
                headers.set('Content-Type', 'application/json')
            }
            return headers;
        },
        responseHandler: (response: Response) => {
            const cookie = response.headers.get('Set-Cookie')
            if (cookie) {
                AsyncStorage.setItem('token', cookie)
                try {
                    KeyChain.setGenericPassword('token', cookie)
                } catch (error) {
                }
            }
            return response.json()
        },
    }),
    endpoints: (builder) => ({
        test: builder.mutation({
            query: (payload) => ({
                url: 'test',
                body: payload,
                method: 'POST',
                credentials: 'include',
            })
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: '/api/v1/register',
                body: payload,
                method: 'POST',
                credentials: 'include',

            })
        }),
        login: builder.mutation({
            query: (payload) => ({
                url: '/api/v1/login',
                body: payload,
                method: 'POST',
                credentials: 'include',
            })
        }),
        getAllUsers: builder.mutation({
            query: (payload) => ({
                url: '/api/v1/getAllUsers',
                body: payload,
                method: 'POST',
                credentials: 'include',
            })
        }),
        uploadFile: builder.mutation({
            query: (payload) => {
                return {
                    url: '/api/v1/updateProfilePic',
                    body: payload,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // 'enctype': 'multipart/form-data',
                        // "accept": "*/*",
                    },

                }
            }
        }),
        uploadFile2: builder.mutation({
            queryFn: async ({ url, data, setProgress }) => {
                try {
                    let formData = new FormData();
                    formData.append('files[]', data)
                    let headers: any = {}
                    headers['Content-Type'] = 'multipart/form-data'
                    const token: string = await AsyncStorage.getItem('token') as string
                    if (token) {
                        headers['Cookie'] = token
                    }
                    const resp = await axios.post(Server_Url + '/api/v1/uploadFile', formData, {
                        headers,
                        onUploadProgress: (upload) => {
                            let total = upload.total as number
                            let progress = Math.floor((upload.loaded / total))
                            setProgress(progress);
                        }
                    })
                    return { data: resp };
                } catch (error) {
                    return {
                        error: {
                            status: 201,
                            data: "Some Error Message"
                        }
                    }
                }
            }
        }),
        getProfilePic: builder.mutation({
            query: (payload) => {
                return {
                    url: '/api/v1/getProfilePic',
                    body: payload,
                    method: 'POST',
                    credentials: 'include'
                }
            }
        }),
        getProfileImage: builder.query({
            query: (payload) => {
                if (payload == "") {
                    return  '/api/v1/getProfileImage'
                } else {
                    return '/api/v1/getProfileImage?userId=' + payload
                }
            }
        }),
        getMyDetails: builder.mutation({
            query: () => {
                return {
                    url: '/api/v1/getMyDetails',
                    body: {},
                    method: 'POST'
                }
            }
        }),
        createOrg: builder.mutation({
            query: (payload) => {
                return {
                    url: '/api/v1/createOrg',
                    body: payload,
                    method: 'POST'
                }
            }
        }),
        getOrgList: builder.query({
            query: () => {
                return '/api/v1/getOrgList'
            }
        }),
        getImage: builder.query({
            query: (payload) => {
                return '/api/v1/getImage?fileId=' + payload
            }
        }),
        getOrgDetails: builder.query({
            query: (payload) => {
                return '/api/v1/getOrgDetails?orgId=' + payload
            }
        }),
        getMessages: builder.query({
            query: (payload) => {
                return '/api/v1/getMessages?groupId=' + payload
            }
        }),
        sendMessage: builder.mutation({
            query: (payload) => ({
                url: '/api/v1/sendMessage',
                body: payload,
                method: 'POST'
            })
        }),
        getAllOrgs: builder.query({
            query: (payload) => {
                return '/api/v1/getAllOrgs'
            }
        }),
        addRequestToJoinOrg: builder.mutation({
            query: (payload) => ({
                url: '/api/v1/addRequestToJoinOrg',
                body: payload,
                method: 'POST'
            })
        }),
        getRequestDetails: builder.query({
            query: (payload) => {
                return '/api/v1/getRequestDetails?requestId='+payload
            }
        }),
        getAllRequests: builder.query({
            query: () => {
                return '/api/v1/getAllRequests'
            }
        }),
        getRequestChat: builder.query({
            query: (payload) => {
                return '/api/v1/getRequestChat?requestId='+payload
            }
        })
    }),
})

export const { useLazyGetRequestChatQuery, useLazyGetAllRequestsQuery, useLazyGetRequestDetailsQuery, useAddRequestToJoinOrgMutation, useLazyGetAllOrgsQuery, useGetAllOrgsQuery, useGetProfileImageQuery, useSendMessageMutation, useGetMessagesQuery, useLazyGetMessagesQuery, useLazyGetOrgDetailsQuery, useGetOrgDetailsQuery, useGetImageQuery, useGetOrgListQuery, useUploadFile2Mutation, useCreateOrgMutation, useGetMyDetailsMutation, useGetProfilePicMutation, useGetAllUsersMutation, useTestMutation, useRegisterMutation, useLoginMutation, useUploadFileMutation } = apiOne