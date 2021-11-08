import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './gaurd/can-activate.guard';
import { RedirectHomeGuard } from './redirect-home.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: './home/home.module#HomePageModule'
		, canActivate: [CanActivateGuard, RedirectHomeGuard ]
	},
	{
		path: 'list',
		loadChildren: './list/list.module#ListPageModule'
	},
	{ path: 'login',        	    loadChildren: './login/login.module#LoginPageModule' },
	{ path: 'register', 		    loadChildren: './register/register.module#RegisterPageModule'  },
	{ path: 'deals', 			    loadChildren: './deals/deals.module#DealsPageModule' , canActivate: [CanActivateGuard] },
	{ path: 'filter', 		        loadChildren: './filter/filter.module#FilterPageModule' , canActivate: [CanActivateGuard]},
	{ path: 'profile', 		        loadChildren: './profile/profile.module#ProfilePageModule' , canActivate: [CanActivateGuard]},
	{ path: 'deal-details', 	    loadChildren: './deal-details/deal-details.module#DealDetailsPageModule' , canActivate: [CanActivateGuard] },
	{ path: 'health-care', 	        loadChildren: './health-care/health-care.module#HealthCarePageModule' , canActivate: [CanActivateGuard]  },
	{ path: 'health-care-details',  loadChildren: './health-care-details/health-care-details.module#HealthCareDetailsPageModule' , canActivate: [CanActivateGuard]  },
	{ path: 'voucher-details',      loadChildren: './voucher-details/voucher-details.module#VoucherDetailsPageModule' , canActivate: [CanActivateGuard]  },
	{ path: 'about',                loadChildren: './about/about.module#AboutPageModule' },
	{ path: 'terms',                loadChildren: './terms/terms.module#TermsPageModule' },
	{ path: 'dashboard', 			loadChildren: './admin/dashboard/dashboard.module#DashboardPageModule'},
	{ path: 'redeem-voucher',       loadChildren: './admin/redeem-voucher/redeem-voucher.module#RedeemVoucherPageModule', canActivate: [CanActivateGuard] },
	{ path: 'voucher-detail',       loadChildren: './admin/voucher-details/voucher-details.module#VoucherDetailsPageModule' , canActivate: [CanActivateGuard] },
	{ path: 'create-voucher',       loadChildren: './admin/create-voucher/create-voucher.module#CreateVoucherPageModule' , canActivate: [CanActivateGuard] },
	{ path: 'list-vouchers',        loadChildren: './admin/list-vouchers/list-vouchers.module#ListVouchersPageModule' , canActivate: [CanActivateGuard] },
	{ path: 'plan',                 loadChildren: './plan/plan.module#PlanPageModule' , canActivate: [CanActivateGuard] },
	{ path: 'voucher-history',      loadChildren: './voucher-history/voucher-history.module#VoucherHistoryPageModule' ,canActivate: [CanActivateGuard] },
	{ path: 'admin/voucher-history',loadChildren: './admin/voucher-history/voucher-history.module#VoucherHistoryPageModule' },
	{ path: 'forget-password', 		loadChildren: './forget-password/forget-password.module#ForgetPasswordPageModule' },
	{ path: 'verify-otp', 			loadChildren: './verify-otp/verify-otp.module#VerifyOtpPageModule' },
	{ path: 'change-password', 		loadChildren: './change-password/change-password.module#ChangePasswordPageModule' },
	{ path: 'premium-details', 		loadChildren: './premium-details/premium-details.module#PremiumDetailsPageModule' },
  { path: 'buy-paid-voucher', loadChildren: './buy-paid-voucher/buy-paid-voucher.module#BuyPaidVoucherPageModule' },
  { path: 'subcategory', loadChildren: './subcategory/subcategory.module#SubcategoryPageModule' },
  { path: 'plan-details', loadChildren: './plan-details/plan-details.module#PlanDetailsPageModule' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
