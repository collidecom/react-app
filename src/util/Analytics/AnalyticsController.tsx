import { AnalyticsEvent } from "./AnalyticsEvent";
import StarModel from "../../models/StarModel";
import { ISTESTENVIRONMENT } from "../config";
import * as ReactGA from 'react-ga';

const GAKEY = '';
export default class AnalyticsController {

    initializeAnalytics() {

        ReactGA.initialize(GAKEY, {
            testMode: ISTESTENVIRONMENT,
            debug: ISTESTENVIRONMENT
        })

    }

    static logEvent(event: AnalyticsEvent, parameters: {string: any}, star?: StarModel) {
        ReactGA.event({
            category: event.category,
            action: event.action,
            label: star ? star.profile_name : undefined
            // value: event.value
        });
    }
}