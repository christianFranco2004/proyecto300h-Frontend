import { Component } from '@angular/core';
import { NavBarComponent } from '../../../componentes/nav-bar/nav-bar.component';
import { FooterComponent } from "../../../componentes/footer/footer.component";

@Component({
  selector: 'app-child',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {

}
