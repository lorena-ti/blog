import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatButtonToggleModule, MatToolbarModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header { }
