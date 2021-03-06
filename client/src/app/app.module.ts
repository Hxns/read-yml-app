import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

//const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
