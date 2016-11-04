import api from './api';
import stubs from './stubs';
import settingsService from './settingsService';

export default settingsService.USE_STUBS ? stubs : api;