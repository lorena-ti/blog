import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-back-arrow',
  imports: [MatButtonModule, MatIcon, RouterLink],
  templateUrl: './back-arrow.html',
  styleUrl: './back-arrow.scss',
})
export class BackArrow { }
