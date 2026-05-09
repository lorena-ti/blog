import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatListModule } from "@angular/material/list";
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Formatter } from '../../../services/util/formatter';
import { TocItem } from '../../../models/toc/toc-item';

@Component({
  selector: 'app-toc',
  imports: [MatListModule, RouterLink],
  templateUrl: './toc.html',
  styleUrl: './toc.scss',
})
export class Toc implements AfterViewInit {
  private observer: MutationObserver | null = null;
  items: TocItem[] = [];

  constructor(private cdr: ChangeDetectorRef, private router: Router, public formatter: Formatter) { }

  ngAfterViewInit(): void {
    this.cleanTocItems();
    this.setupObserver();
  }

  setupObserver() {
    const markdown = document.querySelector('markdown');
    if (!markdown) return;

    // Observe changes in the headings
    this.observer = new MutationObserver(() => {
      const headings = markdown.querySelectorAll('h2, h3, h4, h5, h6');

      // If there is at least one heading, get it
      if (headings.length > 0) {
        this.getTocItems(headings);
      }
    })

    // Detect changes in the child elements of the markdown content
    this.observer.observe(markdown, {
      childList: true,
      subtree: true
    });
  }

  getTocItems(headings: NodeListOf<Element>) {
    headings.forEach((heading => {
      // Add heading to contents only if it wasn't added yet
      if (!this.items.some(item => item.text == heading.innerHTML)) {
        this.items.push(new TocItem(heading.innerHTML, heading.tagName));
      }
    }));
    this.cdr.detectChanges();
  }

  cleanTocItems() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Current url
        const url = this.router.url;

        // Clean Toc items every time the route changes, except for routes with #
        // Routes with # refer to fragments, therefore aren't new pages
        if (!url.includes('#')) {
          this.items = [];
        }
      })
  }
}
