import { Routes } from '@angular/router';
import { PostList } from '../app/components/features/post/post-list/post-list';
import { Journal } from './pages/journal/journal';
import { PostContent } from './components/features/post/post-content/post-content';
import { About } from './components/features/explorer/about/about';
import { LabelList } from './components/features/explorer/label-list/label-list';
import { Explorer } from './pages/explorer/explorer';

export const routes: Routes = [
    {
        path: '', component: Explorer, children: [
            { path: '', redirectTo: 'artigos', pathMatch: 'full' },
            { path: 'artigos', component: PostList },
            { path: 'sobre', component: About },
            { path: 'categorias', component: LabelList, data: { type: 'category' } },
            { path: 'categorias/:category', component: PostList },
            { path: 'tags', component: LabelList, data: { type: 'tag' } },
            { path: 'tags/:tag', component: PostList },
        ]
    },
    {
        path: 'artigos/:year/:month/:id/:slug', component: Journal, children: [
            { path: '', component: PostContent },
        ]
    },
];
