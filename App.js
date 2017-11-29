import React, { Component } from 'react';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

import Selection from './app/screens/Selection';
import Schedule from './app/screens/Schedule';
import Details from './app/screens/Details';

const App = () => (
  <Router backAndroidHandler={() => Actions.pop()}>
    <Stack key="root">
      <Scene
        key="selection"
        component={Selection}
        hideNavBar
      />
      <Scene
        key="schedule"
        component={Schedule}
        hideNavBar
      />
      <Scene
        key="details"
        component={Details}
      />
    </Stack>
  </Router>
);

export default App;
