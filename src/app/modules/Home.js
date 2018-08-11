import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Popup
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import SignIn from 'app/modules/auth/SignIn';
import Register from 'app/modules/auth/Register';

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Imagine-a-Company'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Do whatever you want when you want to.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

const mapStateToProps = state => {
  const { auth } = state;

  return {
    authenticated: auth,
    displayName: auth.user.displayName
  }
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {
    isLoginPopupOpen: false,
    isRegisterPopupOpen: false
  }

  hideFixedMenu = () => {
    this.setState({ fixed: false });
  }

  showFixedMenu = () => {
    this.setState({ fixed: true });
  }

  onOpenRegisterPopup = () => {
    this.setState({ isRegisterPopupOpen: true })

    if (this.state.isLoginPopupOpen) {
      this.setState({ isLoginPopupOpen: false })
    }
  }

  onOpenLoginPopup = () => {
    this.setState({ isLoginPopupOpen: true });

    if (this.state.isRegisterPopupOpen) {
      this.setState({ isRegisterPopupOpen: false })
    }
  }

  onCloseLoginPopup = () => {
    this.setState({ isLoginPopupOpen: false })
  }

  onCloseRegisterPopup = () => {
    this.setState({ isRegisterPopupOpen: false })
  }

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>Work</Menu.Item>
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                <Menu.Item position='right'>
                  {
                    this.props.authenticated ?
                      <Header as='h3' inverted>Hi {this.props.displayName}!</Header> :
                      <div>
                        <Popup
                          trigger={
                            <Button as='a' inverted={!fixed} inverted>
                              Sign Up
                          </Button>
                          }
                          open={this.state.isRegisterPopupOpen}
                          onOpen={this.onOpenRegisterPopup}
                          onClose={this.onCloseRegisterPopup}
                          wide='very'
                          size='huge'
                          content={<Register />}
                          on='focus'
                          position='bottom right'
                        />
                        <Popup
                          trigger={
                            <Button as='a' inverted={!fixed} style={{ marginLeft: '0.5em' }}>
                              Log in
                            </Button>
                          }
                          open={this.state.isLoginPopupOpen}
                          onOpen={this.onOpenLoginPopup}
                          onClose={this.onCloseLoginPopup}
                          wide='very'
                          content={<SignIn />}
                          on='focus'
                          position='bottom right'
                        />
                      </div>
                  }
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

DesktopContainer = connect(mapStateToProps)(DesktopContainer);

class MobileContainer extends Component {
  state = {
    isLoginPopupOpen: false,
    isRegisterPopupOpen: false
  }

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  onOpenRegisterPopup = () => {
    this.setState({ isRegisterPopupOpen: true })

    if (this.state.isLoginPopupOpen) {
      this.setState({ isLoginPopupOpen: false })
    }
  }

  onOpenLoginPopup = () => {
    this.setState({ isLoginPopupOpen: true });

    if (this.state.isRegisterPopupOpen) {
      this.setState({ isRegisterPopupOpen: false })
    }
  }

  onCloseLoginPopup = () => {
    this.setState({ isLoginPopupOpen: false })
  }

  onCloseRegisterPopup = () => {
    this.setState({ isRegisterPopupOpen: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'>Work</Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    {
                      this.props.authenticated ?
                        <Header as='h3' inverted>Hi {this.props.displayName}!</Header> :
                        <div>
                          <Popup
                            trigger={
                              <Button as='a' inverted>
                                Sign Up
                              </Button>
                            }
                            open={this.state.isRegisterPopupOpen}
                            onOpen={this.onOpenRegisterPopup}
                            onClose={this.onCloseRegisterPopup}
                            wide='very'
                            size='huge'
                            content={<Register />}
                            on='focus'
                            position='bottom right'
                          />
                          <Popup
                            trigger={
                              <Button as='a' style={{ marginLeft: '0.5em' }}>
                                Log in
                              </Button>
                            }
                            open={this.state.isLoginPopupOpen}
                            onOpen={this.onOpenLoginPopup}
                            onClose={this.onCloseLoginPopup}
                            wide='very'
                            content={<SignIn />}
                            on='focus'
                            position='bottom right'
                          />
                        </div>
                    }
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

MobileContainer = connect(mapStateToProps)(MobileContainer)

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>

    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout;