import { Routes } from '@angular/router';
import { PostList } from '../app/components/features/post/post-list/post-list';

export const routes: Routes = [
    { path: 'artigos', component: PostList },
    { path: '', redirectTo: 'artigos', pathMatch: 'full' },
];
