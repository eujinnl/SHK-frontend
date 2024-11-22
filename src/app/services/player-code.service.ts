import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { levelInfo } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class PlayerCodeService {
  constructor(private http: HttpClient) {}

  submitCode(code: string, level: levelInfo) {
    // const level = 'PONG-123';
    this.http
      .post<
        | { success: boolean; code: string }
        | { success: false; message: boolean }
      >(`api/player-code/${level.levelInt}/submit`, { code })
      .pipe(
        tap((result) => {
          if (result.success) {
            console.log('submitted successfully!');
            // this.iframe.codeChangedEvent(gameId, client);
          } else {
            console.log('submission failed!', result);
          }
        })
      )
      .subscribe();
  }
}
