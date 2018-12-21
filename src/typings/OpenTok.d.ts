declare module 'opentok-react' {
    export interface OTContext {
        session: any
        stream: any
    }

    export function createSession({ apiKey, sessionId, token, onStreamsUpdated }: {
            apiKey: string,
            sessionId: string,
            token: string,
            onStreamsUpdated: (streams: any) => void
            eventHandlers: {
                streamCreated: (event: any) => void
                streamDestroyed: (event: any) => void
            }
        }
    ): any;

    export interface OTSessionProps {
        children: any
        apiKey: string
        sessionId: string
        token: string
        onError: (error: string) => void
        onStreamsUpdated?: (streams: any) => void
        eventHandlers: {
            sessionConnected: () => void
            sessionDisconnected: () => void
            sessionReconnected: () => void
            sessionReconnecting: () => void
        }
    }

    export class OTSession extends React.Component<OTSessionProps> {
        context: OTContext
    }
    // export const OTSession: React.ComponentType<OTSessionProps>;

    export interface OTPublisherProps {
        session?: any
        properties: any
        onPublish(): void
        onError(error: string): void
        eventHandlers: {
            accessDenied: () => void
            streamCreated: (event: any) => void
            streamDestroyed: (event: any) => void
        }

    }

    export class OTPublisher extends React.Component<OTPublisherProps> {
        context: OTContext
    }

    export interface OTStreamsProps {
        children: any
        session?: any
    }

    export class OTStreams extends React.Component<OTStreamsProps> {
        context: OTContext
    }
    // export const OTStreams: React.ComponentType<OTStreamsProps>
    export interface OTSubscriberProps {
        session?: any
        properties: any
        onSubscribe(): void
        stream: any
        onError(error: string): void
        eventHandlers: {
            videoEnabled: () => void
            videoDisabled: () => void
        }
    }

    export class OTSubscriber extends React.Component<OTSubscriberProps> {
        context: OTContext
    }
    // export const OTSubscriber: React.ComponentType<OTSubscriberProps>;
}
