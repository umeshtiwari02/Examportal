import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loader = inject(NgxUiLoaderService);
  let activeRequests = 0;

  // Skip loader for specific requests if needed
  if (req.url.includes('exclude-this')) {
    return next(req);
  }

  if (activeRequests === 0) {
    loader.start();
  }

  activeRequests++;

  return next(req).pipe(
    finalize(() => {
      activeRequests--;
      if (activeRequests === 0) {
        loader.stop();
      }
    })
  );
};
