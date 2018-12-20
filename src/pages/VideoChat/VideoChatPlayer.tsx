import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import { OTSession } from 'opentok-react';

const APIKEY = '46187952';
const SESSIONID = '2_MX40NjE4Nzk1Mn5-MTU0NTI2NjYxMjkxOH5ZU1AzYXFETTNhTHJzditGN1pSV0tOV3V-fg';
const TOKEN = 'T1==cGFydG5lcl9pZD00NjE4Nzk1MiZzaWc9YmQ0M2EyZDM5NzFjZDQ5NzNkZTdlZDlhNTE1NWEyMmM4OWM3MzQyMTpzZXNzaW9uX2lkPTJfTVg0ME5qRTROemsxTW41LU1UVTBOVEkyTmpZeE1qa3hPSDVaVTFBellYRkVUVE5oVEhKemRpdEdOMXBTVjB0T1YzVi1mZyZjcmVhdGVfdGltZT0xNTQ1MjY2NjUwJm5vbmNlPTAuNjQyNjU0OTkwNzQzMjY2MiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQ1MzUzMDUwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
interface Props {

}
  
interface InjectedProps extends Props {
    rootStore: RootStore
}

@inject('rootStore')
@observer
export default class VideoChatPlayer extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    componentDidMount() {
        // (OpenTok as any).
    }

    render() {

        const { rootStore } = this.injected;
        const { authStore, playerStore } = rootStore;
        
        return (
            <div>
                VIDEO CHAT
                <OTSession apiKey={APIKEY} sessionId={SESSIONID} token={TOKEN}>
                    {/* <OTPublisher />
                    <OTStreams>
                    <OTSubscriber />
                    </OTStreams> */}
                </OTSession>
            </div>
        );
    }
}