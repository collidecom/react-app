import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import PostModel from '../../models/PostModel';
import { Post } from '../../components/Post/Post';

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
                {homeSupporterStore.postsArray.map((post: PostModel, index) =>
                    <Post
                        key={post.post_id}
                        post={post}
                    />   
                )}
            </div>
        );
    }
}