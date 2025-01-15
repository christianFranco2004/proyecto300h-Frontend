import { CanActivateFn } from '@angular/router';
import { LoginService} from '../services/login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

const _loginService = inject(LoginService); 
const _router = inject(Router);



if(!_loginService.estaLogeado()){
  _router.navigate(["/usuarios"]);
  return false;
}


if(!_loginService.isAdmin()){
  _router.navigate(["/"]);
  return false;
}





  return true;
};
