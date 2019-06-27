import { Component } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    public page = {
      title: '',
      name: ''
    };

  constructor(private router: Router) { }

    openDetalis(title, name) {
        this.page = {
          title,
          name
        };
        let navExtras: NavigationExtras = {
            state: {
                page: this.page
            }
        };
        this.router.navigate(['item'], navExtras);
    }

    goToAdd() {
      this.router.navigate(['add-new']);
    }
  

}
