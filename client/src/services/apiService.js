import api from './api';
import stubs from './stubs';

const useStubs = true;

export default useStubs ? stubs : api;