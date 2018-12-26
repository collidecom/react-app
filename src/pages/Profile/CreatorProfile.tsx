import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import Grid from '../../components/Grid/Grid';
import Paper from '../../components/Paper/Paper';
import PostModel from '../../models/PostModel';
import { Post } from '../../components/Post/Post';
import { Divider, Hidden } from '@material-ui/core';

interface Props {

}
  
interface InjectedProps extends Props {
    rootStore: RootStore
}

@inject('rootStore')
@observer
export default class CreatorProfile extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    componentDidMount() {

        const { rootStore } = this.injected;
        const { creatorProfileStore } = rootStore;

        if (window.location.pathname) {

            const path = window.location.pathname.replace('/', '')
            creatorProfileStore.getStar(path);

        }

    }

    render() {

        const { rootStore } = this.injected;
        const { creatorProfileStore, postStore } = rootStore;
        const { star } = creatorProfileStore;

        return (
            <div style={{maxWidth: '1008px', margin: 'auto'}}>
                {star &&
                
                <Grid container spacing={24}>

                    <Grid item xs={12} md={9}>
                        <Paper>
                            {creatorProfileStore.postsArray.map((post: PostModel, index) =>
                            <div key={post.post_id}>
                                <Post
                                    post={post}
                                    star={star}
                                    access={rootStore.accessStore.accessMedia(star, post, post.post_media_content)}
                                    onLike={() => postStore.likePost(post)}
                                />
                                <Divider/>
                            </div>

                            )}
                            {creatorProfileStore.isFetching && <p>FETCHING MORE...</p>}
                        </Paper>
                    </Grid>
                    <Hidden mdDown>
                        <Grid item md={3}>
                            connect services
                        </Grid>
                    </Hidden>

                </Grid>
                }

            </div>
        );
    }
}