import { Component } from '@angular/core';
import { NavBarComponent } from '../../componentes/nav-bar/nav-bar.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [NavBarComponent, FooterComponent,RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
