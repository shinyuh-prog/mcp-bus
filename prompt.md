# Project Prompts Log

This document records all user prompts submitted during the development of the SBS Transit NextBus web application and API integration.

---

### Prompt 1: Initial UI & Feature Generation
**Prompt:**
```text
Build a web application that is similar to the image
```
*Note: Attached screenshot of the official SBS Transit NextBus Arrival Timings interface (Service 147 at Hotel Grand Pacific, Stop 01012).*

---

### Prompt 2: GitHub Repository Setup & Push
**Prompt:**
```text
git push https://<GITHUB_PERSONAL_ACCESS_TOKEN>@github.com/shinyuh-prog/mcp-bus.git
```

---

### Prompt 3: Serverless APIs & LTA DataMall Integration
**Prompt:**
```text
1) create a / api folder under the project main to store all apis
2) create a / api/health.js to monitor if the apis are working
3) integrate the LTA bus informationj api endpoint GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04121
Header:  AccountKey: 

#BusStopCode is the only required parameter.
#Add&ServiceNo=7 to ask about one service only.
# Refreshes every 20 seconds. JSON comes back by default
I will add the LTA_ACCOUNT_KEY in vercel environment variables later
```

---

### Prompt 4: Prompts Documentation
**Prompt:**
```text
create a prompt.md containing all my prompts located at main project
```
