import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Scroller {
  constructor(private route: ActivatedRoute) { }

  scrollToCurrentFragment() {
    let currentFragment: string | null = '';

    // Get the current fragment
    this.route.fragment.subscribe(fragment => {
      currentFragment = fragment;
      this.scrollTo(currentFragment);
    });
  }

  scrollTo(fragment: string | null) {
    const markdown = document.querySelector('.article');

    // Get the heading that has the fragment as the id
    const heading = markdown?.querySelector(`#${fragment}`);

    // Scroll to it
    if (fragment) {
      heading?.scrollIntoView({ block: 'start' });
    }
  }
}
