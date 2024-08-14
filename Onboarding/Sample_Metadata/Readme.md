This is sample metadata made available for the post-sales team to quickly

1) Setup demo environments
2) Handover demo environments to customers

How to use  this

There are two metadata folders - Master and Remote Schema
1) Change the config.yaml file in both environments to reflect where you are deploying this to
2) Change the Remote Schema URL and Token on the Master environment.
3) Use Hasura CLI to deploy both schemas.
4) Use Hasura CLI to reload metadata on both projects


What is present right now
Migrations for both Master and Remote nodes.
All kinds of API limts configured
Configured remote schema on Master Node pointing to Remote Schema node
Permissions.

