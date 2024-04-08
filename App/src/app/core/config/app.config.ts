import { InjectionToken } from '@angular/core';
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export const APP_DI_CONFIG: AppConfig = {

  ApiEndPoint: 'http://sgsapi.nimad.cloud/discrepancy/', 
  FileManagerEndPoint: 'http://192.168.3.95:8081/FileManager'

};   

export interface AppConfig {
  ApiEndPoint: string;  
  FileManagerEndPoint: string;
};
