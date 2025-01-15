import { Component } from '@angular/core';
import { NavBarComponent } from '../../../componentes/nav-bar/nav-bar.component';
import { TarjetaProductoComponent } from '../../../componentes/tarjeta-producto/tarjeta-producto.component';
import { FooterComponent } from '../../../componentes/footer/footer.component';

@Component({
  selector: 'app-adults',
  imports: [NavBarComponent, TarjetaProductoComponent, FooterComponent],
  templateUrl: './adults.component.html',
  styleUrl: './adults.component.css'
})
export class AdultsComponent {

}
