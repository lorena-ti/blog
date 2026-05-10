import { Routes } from '@angular/router';
import { PostList } from '../app/components/features/post/post-list/post-list';
import { Journal } from './pages/journal/journal';
import { PostContent } from './components/features/post/post-content/post-content';
import { About } from './components/features/explorer/about/about';

export const routes: Routes = [
    { path: 'artigos', component: PostList },
    { path: '', redirectTo: 'artigos', pathMatch: 'full' },
    {
        path: 'artigos/:year/:month/:id/:slug', component: Journal, children: [
            { path: '', component: PostContent },
        ]
    },
    { path: 'sobre', component: About },
];
