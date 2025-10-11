import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { map } from 'rxjs';
import Toastify from 'toastify-js';

export const clientGuard: CanActivateFn = (route, state) => {
  const clientService = inject(ClientService);
  const router = inject(Router);

  return clientService.client$.pipe(
    map((client) => {
      if (!client) {
        Toastify({
          text: 'Se necesita configurar la tienda',
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: '#ea5a26ff',
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      }
      return client ? true : router.createUrlTree(['/settings']);
    })
  );
};
