import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { EvenementComponent } from './pages/evenement/evenement.component';
import { AuthComponent } from './pages/auth/auth.component';
import { EvenementDetailComponent } from './pages/evenement-detail/evenement-detail.component';
import { EvenementFormComponent } from './pages/evenement-form/evenement-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminCommentsComponent } from './pages/admin-comments/admin-comments.component';
import { TimelineComponent } from './pages/timeline/timeline.component';

export const routes: Routes = [
    {
        path:'', redirectTo:'login', pathMatch:'full'
    },
    {
        path:'login',
        component:AuthComponent
    },
    {
        path:'accueil',
        component:AccueilComponent
    },
    {
        path:'timeline',
        component:TimelineComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        children: [
            { path: 'evenement', component: EvenementComponent },
            { path: 'admincomment', component: AdminCommentsComponent}]
    },
    {
        path:'evenement',
        component:EvenementComponent
    },
    { path: 'evenement/:id', 
        component: EvenementDetailComponent },
    {
            path:'evenementform',
            component:EvenementFormComponent
        },
];
