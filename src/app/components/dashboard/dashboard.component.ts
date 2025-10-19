import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [NavbarComponent, RouterModule],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

}
