import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Formatter {
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
}
