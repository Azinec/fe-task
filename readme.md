#Test task: merolt - Azinec 
Title: Imaged-Based filter for search 

User Story:
 
As an interested customer, that is searching for an event package for his/her team, I want to filter all the 
search results via an imaged based filter functionality that uses chosen event categories as the filter parameters. 
 
Acceptance Criteria's
 
- Use of stock images - Showing result in realtime underneath the 
filter - Filtering with the parameter called "tags.label" as in the following 
example https://www.merolt.de/inventory/api/esearch/filter?maxresult=10&type=eventbundle&tags .label=outdoor,teamtag,fun  
Possible tag options are:      "INDOOR",    "BETRIEBSAUSFLUG",    "OUTDOOR",    "TEAMBUILDING",     "TEAMTAG",    "FUN",    "KICK-OFF" 
 

####Steps for runing the project:
```
1) run the command 'npm i' to install all modules;
2) run the command 'gulp build' to build the project;
3) run the command 'gulp' to open the project in browser.
```
