import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
