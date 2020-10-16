import React, { useLayoutEffect, useState, useEffect } from 'react';
import '../assets/css/Profile.css';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserInformation from './UserInformation';
import WishList from './WishLIst';
import { Col, Container, Row } from 'reactstrap';
import OrderList from './OrderList';
import { UserContext } from '../Context/context';


function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component="div" paddingLeft={2} paddingTop={2}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: 300,
    minWidth: "inherit",
  },
  rootSmall: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: "column",
    minHeight: 300,
    minWidth: "inherit",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    // maxWidth: "200px",
    // width: "-webkit-fill-available"
  },
  label: {
    fontSize: "small",
    fontWeight: "600",
    alignItems: "flex-start",

  },
  indicator: {
    // backgroundColor: "red"
  },
  tabSelected: {
    backgroundColor: "rgba(136,136,136,.12)",
    border: "none",
    outline: "none"
  },
  tabPanel: {
    width: "-webkit-fill-available"
  }
}));

function Profile() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const userContext = React.useContext(UserContext)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let [width, height] = useWindowSize();
  const [windowStatus, setWindowStatus] = useState(0)

  useEffect(() => {
    if( width < 576) setWindowStatus(1);
    else setWindowStatus(0)

  }, [width])

  return (
    <div className="profile">
      <Container className="profile__container">
        <Row className="profile__row">
          <div className={windowStatus == 0? classes.root: classes.rootSmall}>
      <Tabs
        orientation={windowStatus == 0? "vertical": "horizontal"}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Profile Tabs"
        className={classes.tabs}
        TabIndicatorProps={{ className: classes.indicator }}
      >
        <Tab classes={{ wrapper: classes.label, selected: classes.tabSelected }} label="Profile" {...a11yProps(0)} />
        <Tab classes={{ wrapper: classes.label, selected: classes.tabSelected }} label="Orders" {...a11yProps(1)} />
        <Tab classes={{ wrapper: classes.label, selected: classes.tabSelected }} label="WishList" {...a11yProps(2)} />
      </Tabs>
      <TabPanel className={classes.tabPanel} value={value} index={0}>
        <UserInformation />
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={1}>
        <OrderList />
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={2}>
        <WishList />
      </TabPanel>
    </div>
        </Row>
      </Container>
    </div>
    
  )
}

export default Profile;
