This path is dedicated to the generation, server side, of the positions path
and texture atlas of the world.


*** INPUT ***

input/world.csv :
CSV file where :
- columns are separated by commas ( , )
- rows are separated by carriage returns ( \n )

each row is formatted as this :
siteURL, Lsystem_id, Island_id, X, Y, priority

where :
- siteURL is the URL of the website (string),
- Lsystem_id is an integer, it is the Lsystem id IN THE ISLAND
  (2 Lsystems from 2 different islands can have the same Lsystem_id),
- Island_id is an integer, it is the Island id (an Island can have several Lsystems),
- X,Y are the coordinates of the website FROM THE L-SYSTEM CENTER,
- priority is the priority of the website. 
  Be carefull : The higher the priority is, the higher the site will be small !

example :
google.fr,1,2,100.2223,255.323,1


*** EXAMPLE ***
open http://path_to_chreage/world/buildInputDemo.php in you browser
to build an example of input.


*** BUILD OUTPUT ***
open http://path_to_chreage/world/buildOutput.php in your browser to build 
textures atlas and JSON files from your input file.