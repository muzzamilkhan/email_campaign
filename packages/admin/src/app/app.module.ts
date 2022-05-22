import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { UserdetailsComponent } from './pages/dashboard/userdetails/userdetails.component';
import { CampaignsComponent } from './pages/dashboard/campaigns/campaigns.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'logout',
		component: LogoutComponent,
	},
];

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		LogoutComponent,
		DashboardComponent,
		UserdetailsComponent,
		CampaignsComponent,
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		FormsModule,
		BrowserAnimationsModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		LayoutModule,
		MatInputModule,
		MatFormFieldModule,
		MatProgressBarModule,
		MatSidenavModule,
		MatCheckboxModule,
		MatDividerModule,
		MatListModule,
	],
	exports: [RouterModule],
	providers: [AuthGuard, AuthService],
	bootstrap: [AppComponent],
})
export class AppModule {}
