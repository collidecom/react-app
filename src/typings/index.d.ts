
declare module 'opentok-react' {
    
    import * as OpenTok from 'opentok-react';

    export class OTSession extends (OpenTok as any).OTSession
    // import { OTSession } from 'opentok-react';
    // class OTSession extends OpenTok._OTSession;
    // class OTSession extends React.Component<any, any> {}
    // class OTPublisher extends React.Component<any, any> {}
    // class OTStreams extends React.Component<any, any> {}
    // class OTSubscriber extends React.Component<any, any> {}

}
