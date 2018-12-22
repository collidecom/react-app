export default interface StarChatRequest {
    
    video_chat_request_id: number
    created: {
        date: number
    }

    user: {
        id: number
        display_name: string
    }

    duration: number

    // client-side property. not sent down by server
    isRequesting: boolean

}