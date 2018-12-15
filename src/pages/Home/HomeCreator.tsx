import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import PostModel from '../../models/PostModel';
import { Post } from '../../components/Post/Post';
import Grid from '../../components/Grid/Grid';
import { Divider, Hidden } from '@material-ui/core';
import Paper from '../../components/Paper/Paper';
import Link, { UnderlinedLink } from '../../components/Link/Link';
import ProfileImage from '../../components/Image/ProfileImage';
import COLPrimaryButton from '../../components/Button/COLPrimaryButton';
import { charcoalGrayColor, grayBackgroundColor } from '../../util/theme';
import Typography from '../../components/Typography/Typography';
const debounce = require('lodash.debounce');

interface Props {

}

interface InjectedProps extends Props {
    rootStore: RootStore
}

@inject('rootStore')
@observer
export default class HomeCreator extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    componentDidMount() {

        this.loadData();

        window.addEventListener("scroll", this.handleScroll);

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    loadData = async () => {

        const { rootStore } = this.injected;
        const { homeCreatorStore } = rootStore;

        try {
            await homeCreatorStore.fetchStar();
            homeCreatorStore.fetchInitialPosts();

        }
        catch {
            throw ('loadData error');
        }

    }

    handleScroll = debounce(() => {

        const d = document.documentElement;

        const a = d.scrollTop;
        const b = d.scrollHeight - window.innerHeight;
        const scrollPercent = a / b;

        if (scrollPercent > 0.8) {
            const { rootStore } = this.injected;
            const { homeCreatorStore } = rootStore;
            homeCreatorStore.fetchPosts();
        }
    }, 1000)

    render() {

        const { rootStore } = this.injected;
        const { homeCreatorStore, postStore } = rootStore;
        const { star } = homeCreatorStore;
        return (
            <div style={{ maxWidth: '1008px', margin: 'auto' }}>

                {star &&
                    <Grid container spacing={24}>

                        <Hidden mdDown>
                            <Grid item md={3}>
                                <Paper style={{ padding: '16px', textAlign: 'center' }}>
                                    <Link to={star.profile_name_url} style={{ display: 'block' }}>
                                        <ProfileImage src={star.profile_image} width='104px' height='104px' />
                                    </Link>
                                    <Typography variant='h6' style={{fontWeight: 500}}>
                                    {star.profile_name}
                                    </Typography>
                                    <Link to={star.profile_name_url}>                                                                        
                                        <COLPrimaryButton style={{color: charcoalGrayColor, backgroundColor: grayBackgroundColor, margin: '16px 0', display: 'block'}}>
                                        View My page
                                        </COLPrimaryButton>
                                    </Link>

                                    <UnderlinedLink to="https://collide.zendesk.com/hc/en-us/articles/360020839031-Create-a-Site-That-Your-Followers-NEED-to-Subscribe-to">
                                    Success Hacks
                                    </UnderlinedLink>
                                </Paper>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} md={6}>
                            <Paper>
                                {homeCreatorStore.postsArray.map((post: PostModel, index) =>
                                    <div key={post.post_id}>
                                        <Post
                                            post={post}
                                            star={homeCreatorStore.star!}
                                            // creators have access to their own posts. should I just call accessMedia?
                                            access={true}
                                            onLike={() => postStore.likePost(post)}
                                        />
                                        <Divider />
                                    </div>
                                )}
                                {homeCreatorStore.isFetching && <p>FETCHING MORE...</p>}
                            </Paper>
                        </Grid>
                        <Hidden mdDown>
                            <Grid item md={3}>
                                <Paper>
                                    Currently Connecting
                                </Paper>
                            </Grid>
                        </Hidden>

                    </Grid>
                }

            </div>
        );
    }
}