import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule, Injectable, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootstrapService } from './services/bootstrap.service';
import { LoaderComponent } from './loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material';
import { HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';
import { LoaderService } from './loader/loader.service';
import { LoaderHttpInterceptor } from './services/http-interceptor.service'
export function configServiceFactory(config: BootstrapService) {
    return () => config.load();
}

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    declarations: [AppComponent, LoaderComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        OverlayModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        //TransactionsModule,
        //OrdersModule
    ],
    providers: [
        DatePipe,
        BootstrapService,
        {
        provide: APP_INITIALIZER,
        useFactory: configServiceFactory,
        deps: [BootstrapService],
        multi: true
        },
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        LoaderService
    ],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
