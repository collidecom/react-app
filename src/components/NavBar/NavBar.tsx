import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';
import { Button, Fab, CircularProgress } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import RootStore from '../../stores/RootStore';
import { inject, observer } from 'mobx-react';
import COLTextButton from '../Button/COLTextButton';
import Typography from '../Typography/Typography';
import COLPrimaryButton from '../Button/COLPrimaryButton';
import VideoChatModel from '../../models/VideoChatModel';
import StarChatRequest from '../../models/StarChatRequest';
import Link from '../Link/Link';
const CreditsIcon = require('../../img/icon-credits.svg') as string;

const LogoButton = styled(Button as React.SFC<ButtonProps>)`
  && {
    &:hover {
      background-color: transparent;
    }
  }
`;
const styles = (theme: any) => createStyles({
  root: {
    width: '100%',
  },
  toolbarRoot: {
    paddingLeft: '0px',
    backgroundColor: 'white'
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

interface Props {
  classes?: any,
  theme?: any,
}

interface InjectedProps extends Props {
  rootStore: RootStore
}

@inject('rootStore')
@observer
class NavBar extends React.Component<Props> {

  get injected() {
    return this.props as InjectedProps;
  }

  componentDidMount() {

    // const { rootStore } = this.injected;
    // const { authStore } = rootStore;
    
  }

  state = {
    vchatAnchorEl: null,
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleClickOpen = () => {
    
    const { rootStore } = this.injected;
    const { authStore } = rootStore;
    authStore.setShowLoginModal(true);

  };

  handleVchatMenuOpen = (event: any) => {
    this.setState({ vchatAnchorEl: event.currentTarget });
  }
  handleProfileMenuOpen = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleVchatMenuClose = () => {
    this.setState({ vchatAnchorEl: null });
    // this.handleMobileMenuClose();
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event: any) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  logout = () => {

    const { rootStore } = this.injected;
    const { authStore } = rootStore;
    authStore.logout();
    this.handleMenuClose();
  }

  render() {

    const { rootStore } = this.injected;
    const { authStore, navBarStore, videoChatRequestStore } = rootStore;
    
    const { vchatAnchorEl, anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isVchatMenuOpen = Boolean(vchatAnchorEl);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderVchatMenu = (
      <Menu
        anchorEl={vchatAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isVchatMenuOpen}
        onClose={this.handleVchatMenuClose}
      >
        {videoChatRequestStore.requests.length === 0 &&
          <MenuItem
          style={{minWidth: '300px'}}
          >
              <Typography variant='body2'>You have no pending requests</Typography>
          </MenuItem>
        }
        {videoChatRequestStore.requests.map((request: StarChatRequest) => 
          <MenuItem
            key={request.video_chat_request_id}
            onClick={() => videoChatRequestStore.creatorStartVideoChat(request)}
            style={{
              minWidth: '300px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}
          >
          
          {request.user.display_name}
          {request.isRequesting &&
            <CircularProgress style={{width: '30px', height: '30px'}}/>
          }
          </MenuItem>
        )}
      </Menu>
    );

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.logout}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div>
        {navBarStore.showNavBar &&
          <div className={classes.root}>
          <AppBar position="static">
            <Toolbar classes={{
              root:  classes.toolbarRoot
            }}>
              <LogoButton
                onClick={() => rootStore.goHome()}
              >
                <img src='https://assets.collide.com/img/betalogo.svg'/>
              </LogoButton>
              <Link to='/creator/onboard/signup'>
              <COLTextButton>
                Creator sign up
              </COLTextButton>
              </Link>
              {/* <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div> */}
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Fab size='small' color='primary' onClick={this.handleVchatMenuOpen}>{videoChatRequestStore.requests.length}</Fab>
                {authStore.isLoggedIn && !authStore.isStar &&
                  <COLTextButton>
                    <img src={CreditsIcon} style={{marginRight: '8px'}}/>
                    <Typography variant='body2'>{authStore.credits()}</Typography>                  
                  </COLTextButton>
                }
  
                {authStore.isLoggedIn &&
                  <COLTextButton
                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                  >
                    {(authStore.user && (authStore.user.display_name || authStore.user!.profile_name))}
                  </COLTextButton>
                }
                {!authStore.isLoggedIn &&
                  <COLTextButton
                    onClick={this.handleClickOpen}
                  >
                    Log in
                  </COLTextButton>
                }
                
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderVchatMenu}
          {renderMenu}
          {renderMobileMenu}
        </div>
        }
      
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);