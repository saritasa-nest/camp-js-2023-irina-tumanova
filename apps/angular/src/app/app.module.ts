import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ApiKeyInterceptor } from '../core/interceptors/api-key.interceptor';
import { HttpErrorInterceptor } from '../core/interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

/** App module. */
@NgModule({
	declarations: [AppComponent, NotFoundComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		HttpClientModule,
	],
	bootstrap: [AppComponent],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
	],
})
export class AppModule {}
