declare module 'opentok-react' {

    export interface OTSessionProps {
        children?: any
        apiKey: string
        sessionId: string
        token: string
    }
    export const OTSession: React.ComponentType<OTSessionProps>;

    export interface OTPublisherProps {
        properties: any
        onPublish(): void
        onError(error: string): void
        eventHandlers: {
            accessDenied: () => void
            streamCreated: () => void
            streamDestroyed: (error: {reason: any}) => void
        }

    }

    export const OTPublisher: React.ComponentType<OTPublisherProps>;

    export interface OTStreamsProps {
        children: any
    }

    export const OTStreams: React.ComponentType<OTStreamsProps>
    export interface OTSubscriberProps {
        properties: any
        onSubscribe(): void
        onError(error: string): void
        eventHandlers: {
            videoEnabled: () => void
            videoDisabled: () => void
        }
    }

    export const OTSubscriber: React.ComponentType<OTSubscriberProps>;
}
