import l from 'react-loadable';
import Loading from '../common/loading';
const Loadable = (opts: object) =>
    l(
      {
        loading: Loading,
        ...opts
      }
  );
export default Loadable;
