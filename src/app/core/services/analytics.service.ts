import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { OverviewAnalytics } from '../models/analytics.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly http = inject(HttpClient);

  getOverview(storeId: string, date?: string): Observable<OverviewAnalytics> {
    let params = new HttpParams();
    if (date) {
      params = params.set('date', date);
    }

    return this.http
      .get<ApiResponse<OverviewAnalytics>>(
        `${environment.apiBaseUrl}/stores/${storeId}/analytics/overview`,
        { params },
      )
      .pipe(map((response) => response.data));
  }
}
