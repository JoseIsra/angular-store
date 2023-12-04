import { Routes } from '@angular/router';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';
import { adminGuard } from '@/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@/website/website.module').then((m) => m.WebsiteModule),
    data: {
      preload: true,
    },
  },
  {
    path: 'cms',
    canActivate: [adminGuard],
    loadChildren: () => import('@/cms/cms.module').then((m) => m.CmsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
