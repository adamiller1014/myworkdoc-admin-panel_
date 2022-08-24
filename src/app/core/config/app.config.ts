import { Layout } from 'app/layout/layout.types';
import { environment } from '../../../environments/environment';

// Types
export type Scheme = 'auto' | 'dark' | 'light';
export type Theme = 'default' | string;

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface AppConfig {
  layout: Layout;
  scheme: Scheme;
  theme: Theme;
}

export const appConfig: AppConfig = {
  layout: 'enterprise',
  scheme: 'light',
  theme: 'rose'
};

export const globalConfig = {
  REST_API: environment.restAPI
}
