import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './modulos/auth/auth.module';
import { HomeModule } from './modulos/home/home.module';
import { ArbitrosModule } from './modulos/arbitros/arbitros.module';
import { AdminLigasModule } from './modulos/admin-ligas/admin-ligas.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    ArbitrosModule,
    AdminLigasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
