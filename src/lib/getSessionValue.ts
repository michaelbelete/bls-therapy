
import { sessionStore } from '../store/session';

let sessionValue;

sessionStore.subscribe(value => {
  sessionValue = value;
});

export default sessionValue;
