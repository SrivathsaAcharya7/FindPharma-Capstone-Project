import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { LoginService } from 'src/app/Services/login.service';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;
  isLoginPage: boolean = false;
  isAdminPage: boolean = false;

  constructor(public loginService: LoginService, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartStatus();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url.includes('/user/login') || event.url.includes('/admin/login');
        this.isAdminPage = event.url.includes('/admin/');
      }
    });
  }

  logout() {
    this.loginService.logout();
    window.location.reload();
  }

  home() {
    if (this.loginService.getUserRole() === 'USER') {
      this.router.navigate(['/user-home']);
    } else if (this.loginService.getUserRole() === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    }
  }

  updateCartStatus() {
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
  }

}
