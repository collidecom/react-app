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
export default class HomeSupporter extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    componentDidMount() {

        const { rootStore } = this.injected;
        const { homeSupporterStore } = rootStore;
        homeSupporterStore.fetchInitialPosts();

        window.addEventListener("scroll", this.handleScroll);

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    handleScroll = debounce(() => {

        const d = document.documentElement;

        const a = d.scrollTop;
        const b = d.scrollHeight - window.innerHeight;
        const scrollPercent = a / b;

        if (scrollPercent > 0.8) {
            const { rootStore } = this.injected;
            const { homeSupporterStore } = rootStore;
            homeSupporterStore.fetchPosts();
        }
    }, 1000)

    render() {

        const { rootStore } = this.injected;
        const { homeSupporterStore, postStore } = rootStore;

        return (
            <div style={{maxWidth: '1008px', margin: 'auto'}}>
                <Grid container spacing={24}>

                    <Grid item xs={12} md={9}>
                        <Paper>
                            {homeSupporterStore.postsArray.map((post: PostModel, index) =>
                            <div key={post.post_id}>
                                <Post
                                    post={post}
                                    access={rootStore.accessStore.accessMedia(post.star, post, post.post_media_content)}
                                    onLike={() => postStore.likePost(post)}
                                />
                                <Divider/>
                            </div>

                            )}
                            {homeSupporterStore.isFetching && <p>FETCHING MORE...</p>}
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