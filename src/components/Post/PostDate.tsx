import * as React from 'react';
import Typography from '../Typography/Typography';
import { grayTextColor } from '../../util/theme';

interface Props {
    postDate: number
}
const PostDate: React.SFC<Props> = ({postDate}) => {

    const date = new Date(postDate * 1000);
    const dateString = (((date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()));

    return (
        <Typography variant='body2' style={{color: grayTextColor, flexGrow: 1}}>
        {dateString}
        </Typography>
    );

}
export default PostDate;