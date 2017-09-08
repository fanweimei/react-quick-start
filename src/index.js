import { AppContainer } from 'react-hot-loader';
import App from '~/container/app';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('~/container/app', () => {
    render(App);
  });
}
