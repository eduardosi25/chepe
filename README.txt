ReservasChepe

This project is the new system for booking of tours on the "Chepe" train.

It uses a Modern API Driven Architecture, so the project is divided in two main subprojects:

restws: This a .Net project, using C# and using the framework NancyFX to expose the REST endpoints.
web: An Angular4 project, it is a well defined app that consumes the restws to present the tours availability and to book a tour foran unauthenticated user.

About the branches:

master: The stable and production level branch, managed by the project leader only. THis branch is the base for all other branch and initially it only contains this README. THe other branches fork from this initial stage and once the product reaches the VERSION goals, the branches are merged in this master branch. This branchs holds the current production and stable version of the product.
release-xxxx : Release branches with production specific configurations applied. This one merges contents FROM the master branch.

web-master: Root for the development of the web application. This branch holds the current stable state of the web development, from this branch, development branches are forked. Managed by the project leader.
web-xxx : Branches for specific development of features. Managed by developers.

restws-master: Root for the development of the restws application. Holds current stable state of restws development, from this branch, development branches are forked. Managed by project leader.
restws-xxx : Branches for specific development of features. Managed by developers.

