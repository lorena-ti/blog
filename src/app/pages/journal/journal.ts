import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toc } from '../../components/ui/toc/toc';

@Component({
  selector: 'app-journal',
  imports: [RouterOutlet, Toc],
  templateUrl: './journal.html',
  styleUrl: './journal.scss',
})
export class Journal { }
