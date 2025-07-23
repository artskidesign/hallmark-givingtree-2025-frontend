import { compose, setDisplayName, wrapDisplayName, withProps } from 'recompose';

const withConfig = Component => 
  compose(
    setDisplayName(wrapDisplayName(Component, 'withConfig')),
    withProps(() => ({
      config: window.config
    }))
  )(Component);

export default withConfig;