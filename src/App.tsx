import React from 'react';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import styled from 'styled-components'
import background from './assets/img/background.jpg'
import { PokemonPage } from './Components/pages/PokemonPage';
import { PokemonsPage } from './Components/pages/PokemonsPage';

function App() {

  

  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route path="/" component={PokemonsPage} exact/> 
          <Route path="/:id" component={PokemonPage} exact/> 
        </Switch>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
`

export default App;
