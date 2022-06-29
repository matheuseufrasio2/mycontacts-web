import { Switch, Route } from 'react-router-dom';

import { EditContact } from './pages/EditContact';
import { Home } from './pages/Home';
import { NewContact } from './pages/NewContact';

export function Routes() {
  return (
    <Switch>
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
}
