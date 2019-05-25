import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsModalComponent } from './posts/comments-modal/comments-modal.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'posts', component: PostsComponent},
            { path: 'modal', component: CommentsModalComponent}
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
];
