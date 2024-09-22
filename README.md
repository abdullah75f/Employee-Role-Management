# perago-nestjs-api

Perago Information Systems's NestJS API scaffold clone this repository . execute 'install npm ' then all the required dependence will be installed. create a database named 'orga_structure' execute 'nest start'. access and test your api via swagger http://localhost:3000/api
Requirements
Build web application(API) for registering organization's employee hierarchy or structure
Assume medium level organization management structure with different level of positions/roles Hierarchy. At the top of the Hierarch there is CEO and every position below a given hierarchy will answer/Report to the immediate position in the organization's position structure hierarchy

shall create employee position/role
Build RESTFull API using NestJS (version >= 9) , PostgreSQL or SQL Server database as data store
The position should be hierarchical there is a parent child relationship between the positions e.g. CEO can be root position no parent and CFO is a child of CEO
shall get and list the positions in a tree mode with unlimited n positions e.g.
CEO
├── CTO
│ └── Project Manager
│ └── Product Owner
│ ├── Tech Lead
│ │ ├── Frontend Developer
│ │ ├── Backend Developer
│ │ ├── DevOps Engineer
│ │ └── ..
│ ├── QA Engineer
│ ├── Scrum Master
│ └── ...
├── CFO
│ ├── Chef Accountant
│ │ ├── Financial Analyst
│ │ └── Account and Payable
│ └── Internal Audit
├── COO
│ ├── Product Manager
│ ├── Operation Manager
│ ├── Customer Relation
│ └── ...
└── HR

Model (you can update this model if needed)
Column Type
id GUID
name string
description string
parentId GUID
a. Insert new employe position/role
• Every position/role must contain minimum information like Name, Description and Managing
position/role to whom the position Report To etc.
b. Update previously saved position/role at any time
c. Get single position/role detail  
d. Get all position/role structure according to hierarchy (You can use table or tree)
e. Get all childrens of a specific position/role
f. remove position/role at any time based on the heirarchy

Note:
Every position/role will answer/Report to one position/role except CEO
The client wants to add or Update management structure at any time.
The development should consider separation of concern and maintainability.
The development should include Unit Test for the controller.
To test your API, use Postman or Swagger
Reading Materials
Books
Patterns, Principles and Practices of Domain Driven Design (Scott Millett Nick Tune)
Clean Architecture, A Craftsman’s Guide to Software Structure and Design, (Robert C Martin)
DDD Reference (Domain Driven Design Reference)
DDD Quickly (Domain Driven Design Quickly)
Links
For Backend
Nest (NestJS)
DDD, Hexagonal, Onion, Clean, CQRS, … How I put it all together
Command Query Responsibility Segregation (CQRS) pattern
What is the CQRS pattern?
For Database
PostgreSQL Documentation
SQL Server
