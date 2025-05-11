import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let token = localStorage.getItem("token");

  // console.log("Inteceptor token  ::  ", token);

  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(clonedRequest); // Send modified request
  }
  return next(req); // Send original request if token is absent
};
