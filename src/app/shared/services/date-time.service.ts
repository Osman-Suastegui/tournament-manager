import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {


  /**
   * Takes a calendar date string (YYYY-MM-DD) and returns an
   * ISO-8601 UTC timestamp that uses the **current local clock time**.
   *
   * Example:  "2025-06-30"  →  "2025-06-30T14:37:22.000Z"
   */
  addCurrentTimeAndToUtc(dateOnly: string | null | undefined): string | null {
    if (!dateOnly) { return null; }

    // Current local time — HH:mm:ss
    const now   = new Date();
    const clock = now.toTimeString().slice(0, 8);        // e.g. "14:37:22"

    // Build local date-time → convert to UTC ISO string
    return new Date(`${dateOnly}T${clock}`).toISOString();
  }
}
