import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import { createSession, OTSession, OTPublisher, OTSubscriber, OTStreams } from 'opentok-react';
import '@opentok/client';
import throwError from '../../util/ThrowError';
import COLPrimaryButton from '../../components/Button/COLPrimaryButton';
import { any } from 'prop-types';
import VideoChatModel from '../../models/VideoChatModel';

const APIKEY = '46187952';
const SESSIONID = '2_MX40NjE4Nzk1Mn5-MTU0NTI2NjYxMjkxOH5ZU1AzYXFETTNhTHJzditGN1pSV0tOV3V-fg';
const TOKEN = 'T1==cGFydG5lcl9pZD00NjE4Nzk1MiZzaWc9YmQ0M2EyZDM5NzFjZDQ5NzNkZTdlZDlhNTE1NWEyMmM4OWM3MzQyMTpzZXNzaW9uX2lkPTJfTVg0ME5qRTROemsxTW41LU1UVTBOVEkyTmpZeE1qa3hPSDVaVTFBellYRkVUVE5oVEhKemRpdEdOMXBTVjB0T1YzVi1mZyZjcmVhdGVfdGltZT0xNTQ1MjY2NjUwJm5vbmNlPTAuNjQyNjU0OTkwNzQzMjY2MiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQ1MzUzMDUwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
interface Props {
    chat: VideoChatModel
}
  
interface InjectedProps extends Props {
    rootStore: RootStore
}

interface State {
    error?: string;
    connection: string;
    publishVideo: boolean;
    streams: any[]
}
@inject('rootStore')
@observer
export default class VideoChatPlayer extends React.Component<Props, State> {

    get injected() {
        return this.props as InjectedProps;
    }

    state = {
        error: undefined,
        connection: 'Connecting',
        publishVideo: true,
        streams: []
    };

    sessionHelper: any

    sessionEventHandlers: {
        sessionConnected: () => void
        sessionDisconnected: () => void
        sessionReconnected: () => void
        sessionReconnecting: () => void
        streamCreated: (event: any) => void
        streamDestroyed: (event: any) => void
    }

    publisherEventHandlers: {
        accessDenied: () => void
        streamCreated: (event: any) => void
        streamDestroyed: (event: any) => void
    }

    subscriberEventHandlers: {
        videoEnabled: () => void
        videoDisabled: () => void
    }

    onSessionError = (error: string) => {
        this.setState({ error });
    };

    onPublish = () => {
    console.log('Publish Success');
    };

    onPublishError = (error: string) => {
    this.setState({ error });
    };

    onSubscribe = () => {
    console.log('Subscribe Success');
    };

    onSubscribeError = (error: string) => {
    this.setState({ error });
    };

    toggleVideo = () => {
    this.setState({ publishVideo: !this.state.publishVideo });
    };
    
    constructor(props: Props) {
        super(props);
    
        this.sessionEventHandlers = {
          sessionConnected: () => {
            this.setState({ connection: 'Connected' });
          },
          sessionDisconnected: () => {
            this.setState({ connection: 'Disconnected' });
          },
          sessionReconnected: () => {
            this.setState({ connection: 'Reconnected' });
          },
          sessionReconnecting: () => {
            this.setState({ connection: 'Reconnecting' });
          },
          streamCreated: (event: any) => {
            console.log('yay stream created')
            console.log(event);
            // this.setState({
            //     streams: [event.stream]
            // })
          },
          streamDestroyed: (event: any) => {
            console.log('yay stream destroyed')
            console.log(event);
          }
        };
    
        this.publisherEventHandlers = {
          accessDenied: () => {
            console.log('User denied access to media source');
          },
          streamCreated: (event: any) => {
            console.log('Publisher stream created');
            // this.sessionEventHandlers.streamCreated(event);
            this.setState({
                streams: [event.stream]
            })
          },
          streamDestroyed: (event: any) => {
            console.log('Publisher stream destroyed')
            this.sessionEventHandlers.streamDestroyed(event);
            // console.log(`Publisher stream destroyed because: ${reason}`);
          },
        };
    
        this.subscriberEventHandlers = {
          videoEnabled: () => {
            console.log('Subscriber video enabled');
          },
          videoDisabled: () => {
            console.log('Subscriber video disabled');
          },
        };
    }

    componentWillMount() {

        const { rootStore } = this.injected;
        const { videoChatStore } = rootStore;

        // const { videoChat } = videoChatStore;
        const videoChat = this.props.chat;
        const { session_id, token } = videoChat!;

        console.log('mounted');
        console.log(videoChat);
        this.sessionHelper = createSession({
            apiKey: APIKEY,
            sessionId: session_id,
            token: token,
            onStreamsUpdated: streams => {
                console.log('onstreamsupdated')
                this.setState({ streams });
            },
            eventHandlers: this.sessionEventHandlers
        });
    }

    componentDidMount() {

    }

    render() {

        const { rootStore } = this.injected;
        const { authStore, videoChatStore } = rootStore;
        const { error, connection, publishVideo } = this.state;

        const { videoChat } = videoChatStore;
        if (!videoChat) {
            throwError(`nil video chat`);
            return null;
        }
        const { session_id, token } = videoChat;

        console.log(`connection: ${connection}`)
        return (
            <div>
                VIDEO CHAT
                {this.sessionHelper && 
                <>
                    <COLPrimaryButton
                        onClick={() => videoChatStore.endVideoChat()}
                    >
                    End chat
                    </COLPrimaryButton>

                    <OTPublisher
                        session={this.sessionHelper.session}
                        properties={{ publishVideo, width: 200, height: 200, }}
                        onPublish={this.onPublish}
                        onError={this.onPublishError}
                        eventHandlers={this.publisherEventHandlers}
                    />

                    {this.state.streams.map((stream: any) => {
                        return (
                            <OTSubscriber
                            key={stream.id}
                            session={this.sessionHelper.session}
                            stream={stream}
                            properties={{ publishVideo, width: 400, height: 400, }}
                            onSubscribe={this.onSubscribe}
                            onError={this.onSubscribeError}
                            eventHandlers={this.subscriberEventHandlers}
                            />
                        );
                    })}
                </>
                }                    
            </div>
        );
    }
}