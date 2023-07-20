import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ApiKeyInterceptor } from '../core/interceptors/api-key.interceptor';
import { AppConfig } from '../core/services/app.config';
import { AppUrlsConfig } from '../core/services/app-urls.config';
import { HttpErrorInterceptor } from '../core/interceptors/http-error.interceptor';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

/** App module. */
@NgModule({
	declarations: [AppComponent, NotFoundComponent],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule,
		RouterModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule,
		HttpClientModule,
	],
	bootstrap: [AppComponent],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
		AppUrlsConfig,
		AppConfig,
	],
})
export class AppModule {}
