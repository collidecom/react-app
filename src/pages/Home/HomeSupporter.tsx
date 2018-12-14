import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import PostModel from '../../models/PostModel';
import { Post } from '../../components/Post/Post';
import Grid from '../../components/Grid/Grid';
import { Paper, Divider, Hidden } from '@material-ui/core';

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

    }

    render() {

        const { rootStore } = this.injected;
        const { homeSupporterStore, postStore } = rootStore;

        return (
            <div style={{maxWidth: '1200px', margin: 'auto'}}>
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