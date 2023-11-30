import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes/app.routes';
// import { CustomPreloadService } from './services/custom-preload/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';

/* 
La técnica del PreloadAllModules
es recomendable cuando no tienes muchos módulos
en tu app y pueden ser fácilmente precargados.,
sino estarías ocupando el hilo principal de ejecución
*/

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      // preloadingStrategy: CustomPreloadService,
      // preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
