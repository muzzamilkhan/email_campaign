import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {  
	public isAuthenticated(): boolean {  
		// const jwtHelper = new JwtHelperService();  
		const token = localStorage.getItem('token');
        
		if (!token) {
			return false;
		}

		return true;
        
		// return jwtHelper.isTokenExpired(token);
	}
}