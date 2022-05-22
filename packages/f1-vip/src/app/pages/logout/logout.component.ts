import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'mk-email-campaign-logout',
	template: '',
	styleUrls: [],
})
export class LogoutComponent implements OnInit {
	constructor(private router: Router) {}
    
	ngOnInit(): void {
		localStorage.removeItem('token');
        
		this.router.navigateByUrl('login');
	}
}
