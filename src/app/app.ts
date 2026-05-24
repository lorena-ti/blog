import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './components/ui/header/header';
import { filter } from 'rxjs';
import { Formatter } from './services/util/formatter';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  currentYear = new Date().getFullYear();

  constructor(private router: Router, private formatter: Formatter, private title: Title) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let pageTitle = '';
        const currentUrl = this.router.url;

        // Separate the URL in elements and remove empty strings
        const urlElements = currentUrl.split('/').filter(url => url != '');

        // The current page is the last element of the URL
        let currentPage = urlElements.at(urlElements.length - 1) || '';

        // If the url contains a fragment, don't include it
        if (currentPage.includes('#')) {
          currentPage = currentPage.split('#').at(0) || '';
        }

        // Format and set as title
        currentPage = this.formatter.toTitle(currentPage);
        pageTitle = currentPage + ' | Lorena Medeiros'
        this.title.setTitle(pageTitle);
      })
  }

}
