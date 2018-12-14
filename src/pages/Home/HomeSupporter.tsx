import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import PostModel from '../../models/PostModel';
import { Post } from '../../components/Post/Post';
import Grid from '../../components/Grid/Grid';
import { Paper, Divider } from '@material-ui/core';

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
        homeSupporterStore.fetchPosts();

    }

    render() {

        const { rootStore } = this.injected;
        const { homeSupporterStore } = rootStore;

        return (
            <div>
                <Grid container spacing={24}>

                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <Paper>
                            {homeSupporterStore.postsArray.map((post: PostModel, index) =>
                            <div>
                                <Post
                                    key={post.post_id}
                                    post={post}
                                />
                                <Divider key={post.post_id}/>
                            </div>

                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>

            </div>
        );
    }
}