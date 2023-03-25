# Project Structure
This repository contains the source code and documentation for the *"Counter Strike Manager"*.

The project is divided into two main folders: ``/src`` and ``/docs``.

## ``/src``
The src directory contains all the source code of the project and is divided into four main sections: Classes, Services, Repositories, and Database. The first three are responsible for the **Service-Repository-Controller** architecture of the project.

- ### ``/classes``
    This directory contains all the classes that are used in the project. The classes are responsible for defining the objects that are used throughout the code.

- ### ``/services``
    This directory contains all the services that are used in the project. The services are responsible for processing and managing the data before passing it to the repositories.

- ### ``/repositories``
    This directory contains all the repositories that are used in the project. The repositories are responsible for handling the communication between the application and the database.

- ### ``/database``
    This directory contains all the files related to the database. It may include migration files, initialization scripts, and other database-related configurations.

## ``/docs``
The docs directory contains all the files related to the project documentation. The following files are available in this directory:

- ``COMMIT-PATTERN.md`` a guide to the commit message patterns that should be followed when making a commit to the repository.

- ``CONTRIBUTING.md`` a guide for contributors to the project, with information on how to contribute and how to open a pull request.

- ``ISSUE-TEMPLATE.md`` a template to be used when creating new issues for the project.

- ``PULL-REQUEST-TEMPLATE.md`` a template to be used when creating pull requests.

- ``TYPESCRIPT-CODING-GUIDELINES.md`` a guide with the coding guidelines to be followed when writing TypeScript code for the project.

- ``CHANGELOG.md`` a log of all significant changes made to the project, including released versions and bug fixes.

- ``GDD.md`` a Game Design Document that outlines the overall vision for the game, including the objective, mechanics, and features.

- ``STRUCTURE.md`` this file, which describes the structure of the project.