import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';
import { disableCommonApi } from '@/interceptors/api/api.interceptor';
import { UploadFileResponse } from '@/types';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  getFile(name: string, url: string, type: string) {
    return this.http
      .get(url, { responseType: 'blob', context: disableCommonApi() })
      .pipe(
        tap((content) => {
          const blob = new Blob([content], { type });
          saveAs(blob, name);
        }),
        map(() => true)
      );
  }

  uploadFile(form: FormData) {
    return this.http.post<UploadFileResponse>(
      'files/upload',
      form
      // {
      //   headers: {
      //     'Content-type': 'multipart/form-data',
      //   },
      // }
    );
  }
}
