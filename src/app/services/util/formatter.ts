import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Formatter {
  constructor(private titleCasePipe: TitleCasePipe) { }

  normalize(text: String) {
    return text.toLowerCase()
      // Decompose accents
      .normalize('NFD')
      // Remove accents
      .replaceAll(/[\u0300-\u036f]/g, '')
      // Remove special characters
      .replaceAll(/[^\w\s-]/g, '')
      // Remove extra spaces in the beginning and in the end
      .trim()
      // Replace spaces with hyphens
      .replaceAll(/\s+/g, '-');
  }

  toTitle(text: string) {
    // Normalize text, replace hyphens with spaces and transform it to title case
    return this.titleCasePipe.transform(text.replaceAll('-', ' '))
  }
}
