# Requirements discussion: translation and transcript

## Provenance and uncertainty

This text is based on the English translation and Malayalam transcript included in Aarsh's 10 November 2026 email, **“Requirements Recording Thejway.”** Aarsh says both were produced by speech-to-text and checked against the recording. Speakers are not labelled, small wording errors are possible, and the transcript marks unclear words with `[?]`. The English bullets below are lightly edited for readability rather than a verbatim copy of the translated attachment.

The structured requirements are summarized separately in [requirements.md](requirements.md). This page preserves the discussion material for future reference; it is not an independently verified translation.

## Appendix A — English translation summary

- This app is a college-based app, mainly for bus tracking. If a student is not coming, they can mark that they are absent.
- On the college bus, students board in the morning when they come, right? In the morning at 7:00 AM it starts from everywhere. For far places it starts around 6:00.
- It comes here. Sometimes there is only one student at a stop. If that student is not there, the route stays the same. Usually the driver waits 2 minutes or phones them, so time gets wasted. If the driver knows in advance, there is no need to stop at that stop.
- The driver drives keeping that display in front. If it shows whether the next student is present or absent, he can drive straight through.
- Students will have this app and so will the drivers. If a student is absent they mark it; if attending, they do not need to mark anything.
- Interface: students can create an account, drivers can create an account, and faculty members as well. Three different roles.
- Faculty have the same attendance function as students. Faculty travel by bus too, but for them there is no fee; the bus is free. Students have fees, so the students' area has an option to pay fees.
- Fee payment is Phase 2; it need not be implemented now, it comes later.
- Users log in with credentials and there is a choice: Student, Faculty, Driver. Each role's details are saved under that role.
- Every user has a role/tag: Student, Faculty, or Driver. Payment gateway is Phase 2, so there is no payment in the Phase 1 release. Student and faculty functions are almost the same. The driver's interface is different because the driver is a viewer of the bus route and location.
- The GPS comes through the driver's app itself; no separate GPS hardware is needed. The driver keeps it on in a phone, so the location is shared live through this app.
- Fee structure by kilometres is shown later in Phase 2. The driver's route can be defined. The map should use the Google Maps API.
- There are currently 10 to 12 buses, with all the buses' details.
- Students could choose which bus they take, but giving them that choice would not work properly. An admin should do it; add an Admin tag. Only the admin can assign students.
- The roles are Admin, Driver, Faculty, and Student.
- Admin access should work when away from a laptop. This is a cloud-based app; the person with the Admin tag can log in and do the admin work. No laptop needs to stay on to run a server.
- Payment is Phase 2. First release the Minimum Viable Product.

## Appendix B — Malayalam transcript (as sent)

Speakers are not labelled.

> ഈ ആപ്പ് എന്ന് വെച്ചാൽ കോളേജ് ബേസ്ഡ് ഒരു ആപ്പാണ്. മെയിൻലി ബസ് ട്രാക്കിങ്ങിനുള്ളത്. ഇപ്പോൾ ഒരു കുട്ടി ഇല്ലെങ്കിൽ, ഇല്ലാ എന്ന് മാർക്ക് ചെയ്യാൻ പറ്റും.
>
> കോളേജ് ബസ്സിൽ രാവിലെ കുട്ടികൾ കയറുമല്ലോ വരുമ്പോ? രാവിലെ 7:00 AM-ന് എല്ലാടത്തു നിന്നും സ്റ്റാർട്ട് ചെയ്യും.
>
> 7:00 AM, ദൂരെയാണെങ്കിൽ 6:00 [PM/AM?] ഒക്കെ സ്റ്റാർട്ട് ചെയ്യും. ഇങ്ങോട്ട് വരും. ചിലപ്പോൾ സ്റ്റോപ്പിൽ നിന്ന് ഒരു കുട്ടിയൊക്കെ ഉണ്ടാവുള്ളൂ. ആ കുട്ടി ഇല്ലെങ്കിൽ റൂട്ട് സെയിം ആവും. ആ കുട്ടി ഇല്ലെങ്കിൽ യൂഷ്വലി എന്താ ചെയ്യാ? ടു മിനിറ്റ്സ് വെയ്റ്റ് ചെയ്യും. അല്ലെങ്കിൽ വന്നില്ലെങ്കിൽ വിളിക്കുകയൊക്കെ ചെയ്യും. സൊ അതുകൊണ്ടൊക്കെ ടൈം പോവുവല്ലേ. അപ്പൊ ഇല്ലാന്ന്... അറിയുകയാണെങ്കിൽ ആ സ്റ്റോപ്പിൽ നിർത്തേണ്ട കാര്യം ഉണ്ടാവില്ല.
>
> ആ ഡിസ്പ്ലേ വെച്ചിട്ടാണ് ഡ്രൈവർ ഓടിക്കുക. അപ്പോ അടുത്ത കുട്ടി ഉണ്ടോ ഇല്ലയോ എന്നുള്ളത് അതിൽ കാണിക്കുകയാണെന്നുണ്ടെങ്കിൽ അവന് നേരെ പറപ്പിച്ചു പോകാം.
>
> അപ്പൊ കുട്ടികളുടെ കയ്യിലും ഈ ആപ്പ് ഉണ്ടാവും, ഇവരുടെ കയ്യിലും ഉണ്ടാവും. അപ്പോ ഇല്ല എന്നുണ്ടെങ്കിൽ കുട്ടികൾ മാർക്ക് ചെയ്യണം. ഉണ്ടെന്നുണ്ടെങ്കിൽ മാർക്ക് ചെയ്യേണ്ട.
>
> അപ്പൊ ഇന്റർഫേസ് എന്താ സെറ്റ് ചെയ്തു വെക്കുക? സ്റ്റുഡന്റ്സിന് ഒരു അക്കൗണ്ട് ക്രിയേറ്റ് ചെയ്യാം. ഡ്രൈവർക്കും അക്കൗണ്ട് ക്രിയേറ്റ് ചെയ്യാം. നടുക്ക് ഫാക്കൽറ്റി മെമ്പേഴ്സിനും അക്കൗണ്ട് ക്രിയേറ്റ് ചെയ്യാം. മൂന്നും മൂന്ന് ഡിഫറെൻറ്...
>
> ഫാക്കൽറ്റി മെമ്പേഴ്സോ? സ്റ്റുഡന്റിന്റെ എനിക്ക് മനസ്സിലായി. അതായത് ഇന്ന് ഉണ്ടോ ഇല്ലയോ എന്ന് മാർക്ക് ചെയ്യാൻ. ബസ്സുകാർക്ക് അക്കൗണ്ട് അത് വ്യൂ ചെയ്യാൻ. പിന്നെ ഇന്ന ഡ്രൈവർ ആണ് ഈ റൂട്ട് വരുന്നത് എന്നുള്ള ഡീറ്റെയിൽസ് ഒക്കെ. അവരുടെ മൊബൈൽ നമ്പർ, മൊബൈൽ ഡീറ്റെയിൽസ് അതൊക്കെ നോക്കാൻ. ഫാക്കൽറ്റി മെമ്പേഴ്സിന് എന്താ പണി?
>
> സ്റ്റുഡന്റിന്റെ സെയിം തന്നെ. ഉണ്ടോ ഇല്ലയോ എന്ന് അറിയാൻ. പ്ലസ് ഫാക്കൽറ്റി മെമ്പേഴ്സിന്... [ഫാക്കൽറ്റി ബസ്സിൽ വരുമോ? ] ആ, വരും വരും. അവർക്ക് എന്താണ്, ഫീസ് ഇല്ലല്ലോ. ഫ്രീ അല്ലേ ബസ്സ്. സ്റ്റുഡന്റ്സിന് ഫീസ് ഉണ്ടല്ലോ. അപ്പൊ സ്റ്റുഡന്റ്സിന്റെ ഏരിയയിൽ ഫീസ് അടയ്ക്കാനുള്ളൊരു ഇതും ഉണ്ട്.
>
> ഓക്കെ. ഫീസ് അടയ്ക്കാനുള്ളതുണ്ട്. അത് ഫേസ് 2. അതിപ്പോ ഇമ്പ്ലിമെൻറ് ചെയ്യണ്ട. അത് വഴിയെ.
>
> അപ്പോ മൂന്ന് സെക്ഷൻ. ഫസ്റ്റ് സെക്ഷൻ എന്താണെന്ന് വെച്ചാൽ നമ്മുടെ ലോഗിൻ ക്രെഡൻഷ്യൽ ആണ്. ലോഗിൻ ചെയ്യണം. ലോഗിൻ ചെയ്യുമ്പോൾ സ്റ്റുഡന്റ്, ഫാക്കൽറ്റി, ഡ്രൈവർ എന്ന ഓപ്ഷൻ ഉണ്ടാവും, പോപ്പ് അപ്പ്. സ്റ്റുഡന്റ് ക്ലിക്ക് ചെയ്താൽ സ്റ്റുഡന്റിന്റെ ഒരു ലോക്കൽ ഹോസ്റ്റിലേക്ക് എല്ലാ സ്റ്റുഡന്റ്സിന്റെയും ഡീറ്റെയിൽസ് സേവ്ഡ് ആവും. ഡ്രൈവർ ആണെങ്കിൽ ഡ്രൈവറുടെ ലോക്കൽ ഹോസ്റ്റ്, ഫാക്കൽറ്റി ഫാക്കൽറ്റിയുടെ.
>
> അതായത് ഇതിൽ കയറുന്ന ഓരോ യൂസേഴ്സിനും ബേസിക്കലി ഒരു റോളുണ്ട്. റോള് അല്ലെങ്കിൽ ഒരു ടാഗ് ഉണ്ട്. മെമ്പർ ടാഗ് അല്ലെങ്കിൽ യൂസർ ടാഗ് എന്ന് പറയാം. അതില് മൂന്ന് ടാഗ്സ് ആണുള്ളത്. ഒന്ന് സ്റ്റുഡന്റ്, ഒന്ന് ഫാക്കൽറ്റി, ഒന്ന് ഡ്രൈവർ. ആസ് ഓഫ് നൗ പേയ്മെൻറ് ഗേറ്റ്‌വേ നമ്മള് ഫേസ് 2-ലല്ലേ ചെയ്യുന്നുള്ളൂ? ഫേസ് വൺ റിലീസില് പേയ്‌മെന്റ് ഇല്ല. സോ ബേസിക്കലി സ്റ്റുഡന്റിന്റേയും ഫാക്കൽറ്റിയുടേയും ഫങ്ക്ഷണാലിറ്റി ഓൾമോസ്റ്റ് സെയിം ആണ്.
>
> ഡ്രൈവറിന്റേത് വേറെയാണ്. കാരണം വ്യൂവർ ആണല്ലോ. ബസ് റൂട്ട്, ബസ് എവിടെയെത്തി... സ്റ്റുഡന്റിന് ഒരു ലൈവ് ട്രാക്കിങ് ഉണ്ടോ?
>
> അപ്പോ ജിപിഎസ് ബേസിക്കലി ഡ്രൈവറുടെ ആപ്പ് വഴി തന്നെ കിട്ടും. കിട്ടും, അല്ലേ? വേറെ ജിപിഎസിന്റെ ആവശ്യമില്ലല്ലോ. ഡ്രൈവർ ഒരു ഫോണിലല്ലേ ഓൺ ആക്കി വെച്ചിട്ടുണ്ടാവുക. അപ്പോ ബേസിക്കലി ഈ ആപ്പ് വഴി തന്നെ ലൊക്കേഷൻ ഷെയർ ആയി വരും. ലൈവ് ആയി കിട്ടും.
>
> പിന്നെ കിലോമീറ്റർ അനുസരിച്ച് ഫീസ് പേയ്മെന്റ് അല്ല, ഫീസ് സ്ട്രക്ച്ചർ കാണിക്കും. ഫീസ് സ്ട്രക്ച്ചർ ഫേസ് 2. ഫീസ് സ്ട്രക്ച്ചറിലേക്ക് ഇപ്പോൾ നോക്കണ്ട. ഫേസ് വൺ മതി ഇപ്പോ. ഡ്രൈവറുടെ റൂട്ടും ഡിഫൈൻ ചെയ്യാം. ഏതു വഴിയാ വരുന്നത് എന്നുള്ളത് റൂട്ട് ഡിഫൈൻ ചെയ്യാം. ഇതിൽ ഗൂഗിൾ മാപ്സ് ആണോ മാപ്പ് ആയിട്ട് യൂസ് ചെയ്യുന്ന എപിഐ? ആ, ഗൂഗിൾ മാപ്സിന്റെ എപിഐ ആണ് യൂസ് ചെയ്യേണ്ടത്.
>
> വേറെ എന്താണെന്ന് വെച്ചാൽ, ലോഗിൻ ചെയ്ത് കയറിയാൽ 10 ബസ്സാണ് ഇപ്പോ നിലവിലുള്ളത്. 10-12 ബസ്സ്. ആ ഫുൾ ബസ്സിന്റെ ഡീറ്റെയിൽസ് ഉണ്ടാവും. ഏത് ബസ്സാണോ പോകുന്നത്... [ബസ്സ് ?] ചൂസ് ചെയ്യാം... അത് പക്ഷേ സ്റ്റുഡന്റ്സിന് കൊടുത്തു കഴിഞ്ഞാൽ ശരിയാവില്ലല്ലോ. അതൊരു അഡ്മിൻ ആരെങ്കിലും ചെയ്യുന്നതാവും കറക്റ്റ്.
>
> ഒരു അഡ്മിൻ ടാഗ് വെക്കാം. അപ്പൊ ഒരു ടാഗ് കൂടെ ആഡ് ചെയ്യാം, അഡ്മിൻ ടാഗ്. അവനാണ് സ്റ്റുഡന്റ്സിനെ അസൈൻ ചെയ്യാൻ പറ്റുക. അല്ലെങ്കിൽ സ്റ്റുഡന്റ്സ് എല്ലാവരും കേറി മാറ്റി കളിച്ചോണ്ടിരിക്കും. അപ്പൊ അഡ്മിൻ ടാഗ് ഉണ്ട്, ഡ്രൈവർ ടാഗ് ഉണ്ട്, ഫാക്കൽറ്റി ടാഗ് ഉണ്ട്, സ്റ്റുഡന്റ് ടാഗ് ഉണ്ട്.
>
> പിന്നെ ഒരു അഡ്മിൻ ഹോസ്റ്റ് വെക്കാം. അഡ്മിൻ ഹോസ്റ്റ് വെക്കുക എന്ന് വെച്ചാൽ ഞാൻ പേര് പറഞ്ഞതാ. ഇപ്പോൾ നമ്മൾ ലാപ്പിലാണ് കൺട്രോൾ ചെയ്തത്. ഫോൺ വെച്ചുള്ള വെബ് ആപ്പിൽ നമുക്കൊന്നും ചെയ്യാൻ പറ്റില്ല. ലാപ്പിലാണ് ഇപ്പോ എല്ലാം സെറ്റ് ചെയ്തു വെച്ചിരിക്കുന്നത്. അപ്പോ ലാപ്പില് ഇപ്പോ ഫുൾ ഒരു സെർവർ പോലെ വെച്ചിട്ട് നമ്മൾ പുറത്തു പോവാ. പുറത്തു പോകുമ്പോൾ എന്തെങ്കിലും ഇഷ്യൂ വന്നോ, ഈ കുട്ടി അസൈൻ ആയിട്ടില്ല എന്ന് വെച്ചിട്ട്, അപ്പോ നമുക്ക് മൊബൈൽ വഴി ആക്സസ് ചെയ്യാൻ പറ്റില്ല.
>
> ഇത് ക്ലൗഡ് ബേസ്ഡ് ആപ്പാണ്. ഇങ്ങനത്തെ പ്രശ്നങ്ങൾ ഒന്നുമില്ല. അല്ല, അഡ്മിൻ ഹോസ്റ്റ് അല്ല, അഡ്മിൻ പോർട്ടൽ.
>
> അപ്പൊ അഡ്മിൻ പോർട്ടൽ ഉണ്ടെങ്കിൽ നമുക്ക് ഒരു പാസ്‌വേർഡ് അറിയാമല്ലോ. അത് വെച്ചിട്ട് അതിന്റെ ഉള്ളിലേക്ക് ലോഗിൻ ചെയ്താൽ... അതിന്റെ ആവശ്യമില്ല. അതിനാണ് അഡ്മിൻ ടാഗ്. അഡ്മിൻ ഉള്ളവൻ കേറി കഴിഞ്ഞാൽ എല്ലാം ചെയ്യാം. ഇത് പിന്നെ ക്ലൗഡിലാണ് ഹോസ്റ്റ് ചെയ്യുന്നത്. അതുകൊണ്ട് സെർവർ ഓടിക്കാൻ ലാപ്പൊന്നും ഓണാക്കി വെക്കണ്ട.
>
> പേയ്‌മെന്റ് ഫേസ് 2 ആണ്. അത് നമുക്ക് പിന്നാലെ ചെയ്യാം. ഫസ്റ്റ് മിനിമം വയബിൾ പ്രോഡക്റ്റ് ഫസ്റ്റ് റിലീസ് ചെയ്യണം. അപ്പൊ ഒക്കെ സെറ്റല്ലേ?

## Additional unclear fragment noted by the sender

The requirements email separately flags an unclear audio fragment resembling “4,000 / 3,000 to 4,000” and “hand is not steady.” It was excluded from the requirements and is not interpreted here.
