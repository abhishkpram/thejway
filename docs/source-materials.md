# Source materials and provenance

Only Thejway bus-tracking material is included. Unrelated game emails and artifacts were explicitly excluded.

## Requirements discussion

- Aarsh's 10 November 2026 email **“Requirements Recording Thejway”** includes the structured Phase 1 requirements, an English translation, and the Malayalam transcript.
- Aarsh says the translation/transcript were speech-to-text generated and checked against the recording; wording may contain errors. The source email flags the 6:00 AM/PM ambiguity and an unclear fragment.
- The six-minute recording was received as `10 Nov at 2-35 pm.m4a` and is in the local, Git-ignored `downloads/` folder. Do not publish the audio; the translated notes and transcript are in [discussion-transcript.md](discussion-transcript.md).

## Adrin's emailed frontend source

Adrin's HTML source was sent inline in these email subjects and preserved under [frontend/prototype-v2/](../frontend/prototype-v2/):

| Email subject | Preserved file |
| --- | --- |
| `Re: version 2 frontend of Bus Tracking system` | `login.html` |
| `Home page` | `home.html` |
| `attendence page` | `attendance.html` |
| `Payment page` | `payments.html` |
| `LiveGPS tracking page` | `live-gps.html` |
| `admin page 1` | `admin-page-1.html` |
| `admin page 2` | `admin-page-2.html` |

The `Home page` email's HTML payload is byte-for-byte identical to the login payload; both are retained to preserve the emails. Some prototypes contain inline JavaScript and load external font/Tailwind CDN resources. They are preserved as source artifacts, are not used by the demo, and have not been loaded or executed as part of the app.

## Stitch preview

The earlier visual reference is [Thejway Stitch preview](https://stitch.google.com/preview/2132562061942712938?node-id=a0fac1210d0040078af44a633b7fe9e0). It showed a “Thejus Transit Portal / Campus Fleet Access” sign-in screen, student/faculty selection, route/pass elements, and RFID/biometric quick sign-in. These are prototype observations only; several are absent from or conflict with the later requirements.

## Handling notes

- Do not commit the audio recording or other local downloads.
- Do not treat email HTML, mockup copy, or demo data as trusted production behavior.
- The requirements email is the source of truth for Phase 1; prototype details that conflict are recorded as open questions or deferred ideas.
