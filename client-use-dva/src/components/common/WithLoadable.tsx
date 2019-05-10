import l from 'react-loadable';
import Loading from './loading';
const Loadable = (opts: object) =>
    l(
      {
        loading: Loading,
        ...opts
      }
  );
export default Loadable;
