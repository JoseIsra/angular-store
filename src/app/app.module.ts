import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ApiInterceptor } from './interceptors/api/api.interceptor';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';
import { QuicklinkModule } from 'ngx-quicklink';
// decorador para declarar módulos
@NgModule({
  // para importar cosas declarabales como componentes,
  // directivas y pipes
  declarations: [AppComponent, NotFoundComponent],
  // para traer otro módulos
  // los módulos son como islas, tanto módulos de angualr como personalizados
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    QuicklinkModule,
  ],
  // Viene a ser servicios, pero solo hemos
  // colocado los interceptors porque los servicios
  // teniendo provide in roots son inyectables en toda la app
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeInterceptor,
      multi: true,
    },
  ],
  /* 
    Aquí se colocan las cosas que quiero
    que mi módulo comparta con otro módulo.
    Si quiero que mi módulo comparta algun
    compo o pipe a otro módulo, debe declararse
    aquí!!
   */
  exports: [],
  /* 
  Es el módulo de inicio que solo lo tendrá el módulo
  principal, el AppModule
  */
  bootstrap: [AppComponent],
})
export class AppModule {}
