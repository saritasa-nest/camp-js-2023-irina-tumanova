import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ApiKeyInterceptor } from '../core/interceptors/api-key.interceptor';
import { AppConfig } from '../core/services/app.config';
import { AppUrlsConfig } from '../core/services/app-urls.config';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** App module. */
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule,
		HttpClientModule,
	],
	bootstrap: [AppComponent],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }, AppUrlsConfig, AppConfig],
})
export class AppModule {}
