import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import PostModel from '../../models/PostModel';
import { Post } from '../../components/Post/Post';
import Grid from '../../components/Grid/Grid';
import { Paper, Divider, Hidden } from '@material-ui/core';
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

    loadData = async() => {

        const { rootStore } = this.injected;
        const { homeCreatorStore } = rootStore;

        try {
            await homeCreatorStore.fetchStar();
            homeCreatorStore.fetchInitialPosts();

        }
        catch {
            throw('loadData error');
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

        return (
            <div style={{ maxWidth: '1008px', margin: 'auto' }}>
                <Grid container spacing={24}>

                    <Hidden mdDown>
                        <Grid item md={3}>
                            <Paper>
                                PROFILE IMAGE
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

            </div>
        );
    }
}