import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { User, UserRole } from "../user/user.model";
import { UserService } from "../user/user.service";


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    currentUser$: Observable<User | undefined>;
    constructor(
        private authService: AuthService,
        private router: Router,
        private userService: UserService
        ) {
            this.currentUser$ = this.userService.getCurrentUser();
        }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
          
        return this.userService.getCurrentUser().pipe(
        map(user => !!user && user?.role === UserRole.ADMIN), 
        tap(isAdmin => {
          if (!isAdmin) {
            this.router.navigate(['/auth']); 
          }
        })
      );
    }

}
